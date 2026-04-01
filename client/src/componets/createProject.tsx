"use client";

import { useState } from "react";

export default function CreateProject({ onCreated }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify({ title, description }),
    });

    onCreated();
  };

  return (
    <div className="border p-4 rounded mb-6">
      <h2 className="mb-2">Add Project</h2>

      <input
        className="border p-2 mr-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-green-600 text-white px-4 py-2"
      >
        Add
      </button>
    </div>
  );
}