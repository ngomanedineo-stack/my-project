import TLink from "@/components/TLink";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[90svh] flex-col justify-center">
      <p className="mono text-muted">404</p>
      <h1 className="display mt-4 text-[clamp(3rem,10vw,10rem)]">This page <em>churned.</em></h1>
      <div className="mt-10"><TLink href="/" label="Home" className="btn btn-primary">Back home</TLink></div>
    </section>
  );
}
