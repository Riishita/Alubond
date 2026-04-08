import { useEffect, useRef, useState } from "react";

type MarbleResilienceVideoProps = {
  className?: string;
  srcMp4?: string;
  poster?: string;
};

export default function MarbleResilienceVideo({
  className,
  // Use CDN video by default to avoid increasing repo/build size.
  srcMp4 = "https://res.cloudinary.com/drgg4st9a/video/upload/v1775642751/marble-resilience_hozkf6.mp4",
  poster = "/materials/swatch-marble.jpg",
}: MarbleResilienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => setCanPlay(true);
    const onError = () => setCanPlay(false);

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onError);
    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div
      className={[
        "relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-black/10",
        "bg-gradient-to-br from-black via-[#0b1022] to-[#1b2a4a]",
        "shadow-[0_30px_80px_rgba(15,23,42,0.18)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Poster image (also acts as fallback if mp4 missing) */}
      <div
        className={[
          "absolute inset-0 bg-cover bg-center",
          canPlay ? "opacity-0" : "opacity-100",
          "transition-opacity duration-500",
        ].join(" ")}
        style={{ backgroundImage: `url(${poster})` }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={srcMp4} type="video/mp4" />
      </video>

      {/* Marble panel overlay so the product is always visible */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={[
            "h-[78%] w-[56%] rounded-2xl",
            "bg-[url('/materials/swatch-marble.jpg')] bg-cover bg-center",
            "shadow-[0_35px_90px_rgba(0,0,0,0.35)]",
            "ring-1 ring-white/25",
            "opacity-[0.92]",
          ].join(" ")}
          style={{
            transform: "perspective(900px) rotateY(-14deg) rotateX(3deg)",
          }}
        />
        {/* edge highlight */}
        <div
          className="absolute h-[78%] w-[56%] rounded-2xl"
          style={{
            transform: "perspective(900px) rotateY(-14deg) rotateX(3deg)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 40px rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* Premium overlays to “sell” the resilience story visually (no new text) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-orange-500/18 via-orange-500/0 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sky-300/10 to-transparent" />
    </div>
  );
}

