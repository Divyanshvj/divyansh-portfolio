import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

/**
 * Final homepage flow. Navbar and Footer live in the root layout so the
 * case-study routes share them.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <WhatIBuild />
      <Projects />
      <Contact />
    </>
  );
}
