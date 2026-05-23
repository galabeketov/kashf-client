"use client";

import { useState } from "react";
import { seedTours } from "@/lib/seed";

export default function SeedPage() {
  const [status, setStatus] = useState("");

  const handleSeed = async () => {
    setStatus("Seeding...");

    try {
      await seedTours();
      setStatus("Done! Tours seeded to Firestore.");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Seed Tours to Firestore</h1>
      <button
        onClick={handleSeed}
        style={{ padding: "10px 20px", marginTop: 20 }}
      >
        Seed Now
      </button>
      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}
