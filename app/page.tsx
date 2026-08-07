import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { CtaBand } from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ValueProps />
      <ServicesPreview />
      <ProjectsPreview />
      <CtaBand />
    </>
  );
}
