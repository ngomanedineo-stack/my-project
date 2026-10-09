"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReduced } from "@/lib/motion";

/**
 * Signature moment: a field of "users" orbiting a centre.
 *  • Retained users (lime) stay in orbit.
 *  • Churning users (grey) drift away and fade, then respawn.
 *  • Your cursor "re-engages" them: churners near it are pulled back into orbit and light up.
 * All motion runs on the GPU in the vertex shader (one draw call, thousands of points).
 * Reduced motion → a single static frame. Rendering pauses when off-screen or tab hidden.
 */
const VERT = /* glsl */ `
attribute vec4 aSeed;
attribute float aKeep;
uniform float uTime, uPx;
uniform vec2 uMouse;
varying float vAlpha;
varying float vHot;
void main(){
  float r = 0.8 + aSeed.x * 2.3;
  float a = aSeed.y * 6.28318 + uTime * (0.2 / (0.5 + r * 0.45));
  vec3 p = vec3(cos(a) * r, sin(a) * r * 0.58, 0.0);
  float tilt = (aSeed.z - 0.5);
  p.z = sin(a) * r * 0.55 * tilt * 1.6 + tilt * 0.9;
  vec3 pos = p;
  float alpha = 0.6 + 0.4 * aKeep;
  float hot = aKeep;
  if (aKeep < 0.5) {
    float life = fract(aSeed.w + uTime * 0.04);
    vec2 dir = normalize(p.xy + 0.0001);
    vec3 drift = vec3(dir * (life * life * 6.0), tilt * life * 3.0);
    float d = distance(p.xy + drift.xy * 0.5, uMouse);
    float pull = smoothstep(2.4, 0.2, d);
    drift *= (1.0 - pull);
    pos += drift;
    hot = pull;
    alpha = mix(0.55 * (1.0 - life), 0.95, pull);
  }
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = (2.2 + aSeed.w * 3.0 + hot * 2.4) * uPx;
  gl_PointSize = size * (6.0 / -mv.z);
  vAlpha = alpha;
  vHot = hot;
}`;
const FRAG = /* glsl */ `
precision mediump float;
varying float vAlpha;
varying float vHot;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.05, d);
  vec3 grey = vec3(0.62, 0.61, 0.58);
  vec3 lime = vec3(0.776, 1.0, 0.239);
  gl_FragColor = vec4(mix(grey, lime, vHot), vAlpha * soft);
}`;

export default function HeroCanvas({ scrollRef }: { scrollRef?: React.RefObject<number> }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL → text-only hero still works
    }
    const reduced = prefersReduced();
    const small = window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4;
    const COUNT = small ? 3200 : 9000;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 7;

    const seed = new Float32Array(COUNT * 4);
    const keep = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      seed.set([Math.random() ** 0.8, Math.random(), Math.random(), Math.random()], i * 4);
      keep[i] = Math.random() < 0.5 ? 1 : 0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4));
    geo.setAttribute("aKeep", new THREE.BufferAttribute(keep, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 12 }, uPx: { value: renderer.getPixelRatio() }, uMouse: { value: new THREE.Vector2(9, 9) } },
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    // pointer → world-space (z = 0 plane), smoothed; idle → gentle autonomous wander (so touch devices get the effect too)
    const target = new THREE.Vector2(9, 9);
    let halfH = 1, aspect = 1, lastPointer = -1e9;
    const resize = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      points.scale.setScalar(aspect < 0.8 ? 0.62 : 1);
      points.position.y = aspect < 0.8 ? 1.5 : 0.2;
      points.position.x = aspect > 1.3 ? 1.5 : 0;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const onPointer = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      target.set(nx * halfH * aspect - points.position.x, ny * halfH - points.position.y);
      lastPointer = performance.now();
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0, visible = true, running = false, last = performance.now(), t = 12;
    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) { running = false; return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      if (now - lastPointer > 2500) target.set(Math.sin(t * 0.5) * 2.4, Math.cos(t * 0.37) * 1.4);
      const u = mat.uniforms;
      u.uTime.value = t;
      u.uMouse.value.lerp(target, 1 - Math.pow(0.001, dt));
      const s = scrollRef?.current ?? 0;
      points.rotation.y = u.uMouse.value.x * 0.04 + s * 0.8;
      points.rotation.x = -u.uMouse.value.y * 0.03 + s * 0.3;
      camera.position.z = 7 + s * 3;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      mat.uniforms.uMouse.value.set(1.2, 0.4);
      renderer.render(scene, camera); // one calm, static frame
    } else start();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0 });
    io.observe(el);
    const vis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", vis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", vis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [scrollRef]);

  return <div ref={host} className="absolute inset-0" aria-hidden="true" />;
}
