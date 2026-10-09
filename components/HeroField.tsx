"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * "The Retention Field": GPU particles that drift outward and fade (churn). The pointer, or a slow
 * wandering well when idle, pulls nearby particles into orbit and lights them ember (retention).
 * All motion is computed in the vertex shader, so the CPU only updates a handful of uniforms.
 */
const vert = /* glsl */ `
  attribute vec4 aSeed;
  uniform float uTime, uAspect, uSize, uPixel, uRadius, uStrength;
  uniform vec2 uWell;
  varying float vCapture, vAlpha;
  void main() {
    vec4 s = aSeed;
    vec2 origin = vec2((s.x * 2.0 - 1.0) * uAspect, s.y * 2.0 - 1.0);
    float life = fract(uTime * (0.025 + 0.05 * s.z) + s.w);
    float ang = s.z * 6.2831;
    vec2 drift = origin + vec2(cos(ang), sin(ang)) * life * (0.35 + s.x * 0.9);
    drift += 0.02 * vec2(sin(uTime * 0.6 + s.w * 20.0), cos(uTime * 0.5 + s.z * 20.0));
    float d = distance(drift, uWell);
    float capture = smoothstep(uRadius, uRadius * 0.35, d) * uStrength;
    float dir = s.w > 0.5 ? 1.0 : -1.0;
    float oa = uTime * (0.35 + s.z * 1.1) * dir + s.w * 40.0;
    float orad = uRadius * (0.12 + 0.88 * s.x);
    vec2 orbit = uWell + vec2(cos(oa), sin(oa) * 0.78) * orad;
    vec2 p = mix(drift, orbit, capture);
    float fade = smoothstep(0.0, 0.08, life) * (1.0 - smoothstep(0.55, 1.0, life));
    vAlpha = mix(fade * 0.38, 1.0, capture);
    vCapture = capture;
    gl_Position = vec4(p.x / uAspect, p.y, 0.0, 1.0);
    gl_PointSize = uSize * uPixel * (0.55 + s.y * 0.9) * (1.0 + capture * 0.7);
  }
`;
const frag = /* glsl */ `
  uniform vec3 uCold, uHot;
  varying float vCapture, vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uCold, uHot, vCapture), a);
  }
`;

const cssColor = (name: string, fallback: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v || fallback);
};

export default function HeroField({ onReady }: { onReady?: () => void }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current!;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 4 || ((navigator as any).deviceMemory ?? 8) <= 4;
    const count = coarse || lowEnd ? 4500 : 18000;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the static fallback stays
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y";
    renderer.domElement.setAttribute("aria-hidden", "true");
    el.appendChild(renderer.domElement);

    const geo = new THREE.BufferGeometry();
    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < seeds.length; i++) seeds[i] = Math.random();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5); // positions are computed on the GPU

    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 }, uAspect: { value: 1 }, uSize: { value: coarse ? 2.6 : 2.2 }, uPixel: { value: renderer.getPixelRatio() },
        uRadius: { value: 0.34 }, uStrength: { value: 0.7 }, uWell: { value: new THREE.Vector2() },
        uCold: { value: cssColor("--muted", "#a39d92") }, uHot: { value: cssColor("--signal", "#ff5a1f") },
      },
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    const scene = new THREE.Scene();
    scene.add(points);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h, false);
      mat.uniforms.uAspect.value = w / Math.max(h, 1);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Pointer → world space. Listens on window so overlaid text never blocks it.
    const target = new THREE.Vector2();
    let pointerActive = false;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      pointerActive = inside;
      if (inside) {
        const aspect = r.width / r.height;
        target.set(((e.clientX - r.left) / r.width * 2 - 1) * aspect, -((e.clientY - r.top) / r.height * 2 - 1));
      }
    };
    const onLeave = () => (pointerActive = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const onTheme = () => {
      mat.uniforms.uCold.value = cssColor("--muted", "#a39d92");
      mat.uniforms.uHot.value = cssColor("--signal", "#ff5a1f");
    };
    window.addEventListener("themechange", onTheme);

    // Only render while visible and the tab is active
    let visible = true, raf = 0, last = performance.now(), t = 0, strength = 0.7;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(el);

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      const aspect = mat.uniforms.uAspect.value as number;
      // Idle: the well wanders on its own so the piece demos itself
      const idle = new THREE.Vector2(Math.sin(t * 0.31) * aspect * 0.45, Math.sin(t * 0.47 + 1.3) * 0.35);
      const goal = pointerActive ? target : idle;
      const well = mat.uniforms.uWell.value as THREE.Vector2;
      well.lerp(goal, 1 - Math.pow(0.001, dt));
      const goalStrength = pointerActive ? 1 : 0.6;
      strength += (goalStrength - strength) * (1 - Math.pow(0.01, dt));
      mat.uniforms.uStrength.value = strength;
      mat.uniforms.uRadius.value = pointerActive ? 0.38 : 0.28;
      mat.uniforms.uTime.value = t;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);
    // First frame drawn → let the parent fade the static fallback out
    requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("themechange", onTheme);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={host} className="absolute inset-0" />;
}
