"use client";

import { motion } from "framer-motion";

export default function ProjectList({ projects }: any) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((p: any, i: number) => (
        <motion.div
          key={p._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
  className="glass glow p-5 rounded-xl transform hover:-translate-y-2 hover:scale-105 transition duration-300">
      
          <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
          <p className="text-gray-400">{p.description}</p>
        </motion.div>
      ))}
    </div>
  );
}