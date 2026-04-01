export const BASE_URL = "http://localhost:5000";

export const getProjects = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();
    console.log("Fetched projects:", data);

    return data.data; // 👈 FIX HERE

  } catch (error) {
    console.error(error);
    return [];
  }
};