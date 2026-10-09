import PageHead from "@/components/PageHead";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80svh]">
      <PageHead eyebrow="404" title="This user churned.">The page you’re after doesn’t exist, but the good stuff is one click away.</PageHead>
      <div className="wrap"><Button href="/" variant="primary">Back home</Button></div>
    </div>
  );
}
