"use client";

import Masonry from "./Masonry";

const items = [
  { id: "1", img: "/Gallary/1.jpg", url: "#", height: 500 },
  { id: "2", img: "/Gallary/2.jpg", url: "#", height: 600 },
  { id: "3", img: "/Gallary/3.jpg", url: "#", height: 450 },
  { id: "4", img: "/Gallary/4.jpg", url: "#", height: 700 },
  { id: "5", img: "/Gallary/5.jpg", url: "#", height: 550 },
  { id: "6", img: "/Gallary/6.jpg", url: "#", height: 650 },
  { id: "7", img: "/Gallary/7.jpg", url: "#", height: 500 },
  { id: "8", img: "/Gallary/8.jpg", url: "#", height: 600 },
  { id: "9", img: "/Gallary/9.webp", url: "#", height: 450 },
  { id: "10", img: "/Gallary/10.webp", url: "#", height: 700 },
  { id: "11", img: "/Gallary/11.jpg", url: "#", height: 550 },
  { id: "12", img: "/Gallary/12.webp", url: "#", height: 650 },
];

export default function GallerySection() {
  return (
    <section className="bg-black text-white py-20 px-6">

      {/* HEADER */}
      <div className="text-center mb-16">
        <p className="text-sm tracking-widest text-gray-400 mb-4">
          005 / GLOBAL PROJECTS
        </p>

        <h1 className="text-5xl md:text-7xl font-serif leading-tight">
          TRUSTED BY <br /> ARCHITECTS WORLDWIDE
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          From iconic towers in the Gulf to cultural landmarks across Europe —
          Alubond panels define skylines on every continent.
        </p>
      </div>

      {/* GRID */}
      <div className="relative w-full ">
        <Masonry items={items} />
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-16">
        <button className="border border-white/20 px-8 py-3 rounded-full hover:bg-white/10 transition">
          VIEW PROJECT GALLERY
        </button>
      </div>
    </section>
  );
}