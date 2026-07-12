import HeaderMesh from "@/components/fx/HeaderMesh";
import { Eyebrow } from "@/components/ui/atoms";
import { Reveal } from "@/components/ui/Reveal";

/** Standard top-of-page header for sub-pages (clears the fixed nav). */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <header className="section-light relative overflow-hidden px-5 pb-8 pt-40 sm:px-8 sm:pt-48">
      <HeaderMesh />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="display-xl mt-5 max-w-3xl text-5xl text-balance text-[#0a0f0d] sm:text-7xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-xl text-lg text-pretty text-[#41504a]">{intro}</p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
