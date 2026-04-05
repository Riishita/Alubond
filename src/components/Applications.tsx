"use client";

import ChromaGrid from "./ChromaGrid";

const items = [
  {
    image: "/facade.jpg",
    title: "Building Facades",
    subtitle: "Curtain walls & cladding systems",
    handle: "01",
    borderColor: "#E1654A",
  },
  {
    image: "/auto.jpg",
    title: "Automobile Industry",
    subtitle: "Lightweight vehicle panels",
    handle: "02",
    borderColor: "#3B82F6",
  },
  {
    image: "/corporate.jpg",
    title: "Corporate Identity",
    subtitle: "Signage & branding systems",
    handle: "03",
    borderColor: "#10B981",
  },
  {
    image: "/machine.jpg",
    title: "Machine Covers",
    subtitle: "Industrial enclosures",
    handle: "04",
    borderColor: "#6366F1",
  },
  {
    image: "/elevator.jpg",
    title: "Elevators & Interiors",
    subtitle: "Interior panels",
    handle: "05",
    borderColor: "#F59E0B",
  },
  {
    image: "/marine.jpg",
    title: "Marine & Offshore",
    subtitle: "Corrosion resistant panels",
    handle: "06",
    borderColor: "#06B6D4",
  },
  {
    image: "/train.jpg",
    title: "Trains & Coaches",
    subtitle: "Rail interiors",
    handle: "07",
    borderColor: "#8B5CF6",
  },
];

export default function ApplicationsChroma() {
  return (
    <section className="relative py-32 bg-[#f7f7f5] overflow-hidden">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-10 mb-20 flex justify-between">

        <div>
          <p className="text-xs tracking-[0.3em] text-black/40 mb-6">
            004 / APPLICATIONS
          </p>

          <h2 className="text-6xl font-bold leading-[0.95] text-[#1A1A1A]">
            WHERE ALUBOND <br />
            PERFORMS
          </h2>
        </div>

        <p className="text-[#6B6B6B] max-w-sm text-lg">
          Seven industries. One material. <br />
          Endless architectural possibility.
        </p>
      </div>

      {/* GRID */}
      <div className="h-[700px] relative">
        <ChromaGrid items={items} radius={260} damping={0.3} />
      </div>

    </section>
  );
}