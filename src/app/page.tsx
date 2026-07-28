import { prisma } from "@/lib/db";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Certificates from "@/components/portfolio/Certificates";
import ExperienceSection from "@/components/portfolio/Experience";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export const revalidate = 60;

async function getPortfolioData() {
  const [profile, skills, projects, certificates, experiences] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.certificate.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
  ]);

  return { profile, skills, projects, certificates, experiences };
}

export default async function HomePage() {
  const { profile, skills, projects, certificates, experiences } = await getPortfolioData();

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Portfolio is being set up. Run npm run db:setup to seed data.</p>
      </div>
    );
  }

  return (
    <main>
      <Navbar name={profile.name} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Certificates certificates={certificates} />
      <ExperienceSection experiences={experiences} />
      <Contact profile={profile} />
      <Footer name={profile.name} />
    </main>
  );
}
