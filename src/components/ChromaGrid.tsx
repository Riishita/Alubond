// components/ChromaGrid.tsx

"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";

interface Item {
  image: string;
  title: string;
  subtitle: string;
  index: string;
}

export default function ChromaGrid({
  items,
  radius = 250,
}: {
  items: Item[];
  radius?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const setX = gsap.quickSetter(el, "--x", "px");
    const setY = gsap.quickSetter(el, "--y", "px");

    const move = (x: number, y: number) => {
      gsap.to(el, {
        "--x": `${x}px`,
        "--y": `${y}px`,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      move(e.clientX - rect.left, e.clientY - rect.top);
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(fadeRef.current, { opacity: 1, duration: 0.5 });
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="chroma-grid"
      style={{ "--r": `${radius}px` } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <div key={i} className="chroma-card">
          <div className="chroma-img-wrapper">
            <img src={item.image} />
          </div>

          <div className="chroma-info">
            <span className="index">{item.index}</span>
            <h3 className="title">{item.title}</h3>
            <p className="desc">{item.subtitle}</p>
          </div>
        </div>
      ))}

      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
}