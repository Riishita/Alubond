import { useEffect, useState, type RefObject } from "react";

const GRID_SIZE = 80;
const FADE_TIME = 1000;

type TrailItem = {
  x: number;
  y: number;
  id: number;
  createdAt: number;
  color: string;
};

const getColor = (x: number, y: number) => {
  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;

  // 🎨 Change colors here
  if (x > midX && y < midY) return "rgba(96, 154, 229, 0.17)"; // top-right
  if (x > midX && y > midY) return "rgba(26, 61, 100, 0.17)"; // bottom-right
  if (x < midX && y < midY) return "rgba(19, 107, 194, 0.13)"; // top-left
  return "rgba(32, 96, 180, 0.2)"; // bottom-left
};

type CursorGridTrailProps = {
  /** Skip drawing the trail when the cursor is in this top strip (e.g. fixed navbar height). */
  excludeTopPx?: number;
  /** Restrict trail to this section's visible bounds. */
  sectionRef?: RefObject<HTMLElement>;
};

const CursorGridTrail = ({ excludeTopPx = 0, sectionRef }: CursorGridTrailProps) => {
  const [trail, setTrail] = useState<TrailItem[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (sectionRef?.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isWithinSection =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!isWithinSection) {
          return;
        }
      }

      if (excludeTopPx > 0 && e.clientY < excludeTopPx) {
        return;
      }

      const x = Math.floor(e.clientX / GRID_SIZE) * GRID_SIZE;
      const y = Math.floor(e.clientY / GRID_SIZE) * GRID_SIZE;

      const newItem: TrailItem = {
        x,
        y,
        id: Date.now(),
        createdAt: Date.now(),
        color: getColor(e.clientX, e.clientY),
      };

      setTrail((prev) => {
        if (prev[0]?.x === x && prev[0]?.y === y) return prev;
        return [newItem, ...prev];
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [excludeTopPx, sectionRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrail((prev) =>
        prev.filter((item) => now - item.createdAt < FADE_TIME)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {trail.map((item) => {
        const age = Date.now() - item.createdAt;
        const opacity = 1 - age / FADE_TIME;

        return (
          <div
            key={item.id}
            style={{
              position: "fixed",
              left: item.x,
              top: item.y,
              width: GRID_SIZE,
              height: GRID_SIZE,
              background: item.color,
              border: `1px solid ${item.color.replace("0.2", "0.5")}`,
              pointerEvents: "none",
              zIndex: 5,
              opacity: opacity < 0 ? 0 : opacity,
              transition: "opacity 0.1s linear",
            }}
          />
        );
      })}
    </>
  );
};

export default CursorGridTrail;