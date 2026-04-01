"use client";

import Particles from "react-tsparticles";

export default function ParticlesBackground() {
  return (
    <Particles
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 40 },
          size: { value: 2 },
          move: { enable: true, speed: 0.5 },
          opacity: { value: 0.3 },
        },
      }}
      className="fixed inset-0 -z-10"
    />
  );
}