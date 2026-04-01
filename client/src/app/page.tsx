import { getProjects } from "@/lib/api"; 
export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">My Projects</h1>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((p: any) => (
          <div key={p._id} className="p-4 border rounded-xl">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}