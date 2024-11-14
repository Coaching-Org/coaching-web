import { createFileRoute, Link } from "@tanstack/react-router";
import HyperText from "@/components/ui/hyper-text";
import ShinyButton from "@/components/ui/shiny-button";
import { useLanguage } from "@/components/language.provider";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { translations } = useLanguage();
  return (
    <div className="grid min-h-screen w-full place-items-center md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col items-center gap-9 mb-4 col-span-full">
        <HyperText
          className="text-4xl font-bold text-black dark:text-white"
          text="Coaching"
        />

        <Link
          to="/login"
          className="text-blue-500 hover:opacity-75 col-span-full"
        >
          <ShinyButton>
            {translations.description.gotoLoginDescription}
          </ShinyButton>
        </Link>
      </div>
    </div>
  );
}
