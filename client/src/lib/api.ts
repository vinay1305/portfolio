export const BASE_URL = "http://localhost:5000";

// Fetch all projects
export const getProjects = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      cache: "no-store", // important for fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};