import ContactForm from "@/componets/ContactForm";
import Hero from "@/componets/Hero";
import ProjectList from "@/componets/ProjectList";
import { getProjects } from "@/lib/api";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="p-24 p-10">
      <Hero />

      <h2 className="text-3xl mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Projects
      </h2>
      <section id="projects">
        <ProjectList projects={projects} />

      </section>
      <section id="contact">
        <ContactForm />
      </section>
    </main>
  );
}