import { statement } from "@/content/site";

export default function Statement() {
  return (
    <section aria-label="Statement" className="py-28 md:py-44">
      <div className="wrap">
        <p className="display h-lg max-w-[22ch] md:max-w-[26ch]" data-words>{statement}</p>
      </div>
    </section>
  );
}
