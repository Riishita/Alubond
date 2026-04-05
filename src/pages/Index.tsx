import { Component, lazy, Suspense, type ReactNode, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import LandingHero from "@/components/LandingHero";
const GlobeSection = lazy(() => import("@/components/GlobeSection"));
import ThirdSection from "@/components/ThirdSection";
import FourthSection from "@/components/FourthSection";
import FifthSection from "@/components/FifthSection";
import SixthSection from "@/components/SixthSection";
import Applications from "@/components/Applications";
import Gallary from "@/components/Gallary";
import Footer from "@/components/Footer";

const FALLBACK_LOCATIONS = {
  Manufacturing: ["UAE", "India", "Europe"],
  Offices: ["USA", "Canada", "Egypt", "Turkey", "Vietnam"],
};

const GlobeSectionFallback = () => {
  const [activeGroup, setActiveGroup] = useState<keyof typeof FALLBACK_LOCATIONS>("Manufacturing");
  const [activeLocation, setActiveLocation] = useState(FALLBACK_LOCATIONS.Manufacturing[0]);

  const details = useMemo(
    () =>
      ({
        UAE: "Dubai manufacturing and regional specification support.",
        India: "High-volume ACP production and coating lines.",
        Europe: "European finishing and logistics network.",
        USA: "North America project advisory and technical sales.",
        Canada: "Architect and consultant engagement office.",
        Egypt: "MENA project coordination and support.",
        Turkey: "Façade engineering and regional operations.",
        Vietnam: "APAC commercial and technical office.",
      })[activeLocation],
    [activeLocation]
  );

  return (
    <section className="bg-[#f3f4f6] px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="mb-3 text-xs tracking-[0.28em] text-slate-500 uppercase">Global Presence</p>
        <h2 className="text-3xl text-slate-900 md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Our Global Presence Powers Local Delivery
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
          Interactive globe is loading. You can still explore Alubond locations below.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="relative h-64 w-64 rounded-full bg-white shadow-[inset_0_0_45px_rgba(15,23,42,0.12),0_18px_36px_rgba(15,23,42,0.12)] md:h-72 md:w-72">
            <motion.div
              className="absolute inset-0 rounded-full bg-[url('//unpkg.com/three-globe/example/img/earth-topology.png')] bg-cover bg-center opacity-70"
              animate={{ rotate: 360 }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),transparent_55%)]" />
            <div className="absolute -left-3 top-[46%] h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.18)]" />
            <div className="absolute right-8 top-[38%] h-2 w-2 rounded-full bg-slate-400 shadow-[0_0_0_6px_rgba(148,163,184,0.16)]" />
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {Object.entries(FALLBACK_LOCATIONS).map(([group, locations]) => (
            <div key={group} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <button
                onClick={() => {
                  setActiveGroup(group as keyof typeof FALLBACK_LOCATIONS);
                  setActiveLocation(locations[0]);
                }}
                className={`mb-3 text-[11px] tracking-[0.3em] uppercase ${
                  activeGroup === group ? "text-amber-700" : "text-slate-500"
                }`}
              >
                {group}
              </button>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setActiveGroup(group as keyof typeof FALLBACK_LOCATIONS);
                      setActiveLocation(location);
                    }}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      activeLocation === location
                        ? "border-amber-300 bg-amber-50 text-amber-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-md rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">{activeGroup}</p>
          <h3 className="mt-1 text-xl text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            {activeLocation}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{details}</p>
        </div>
      </div>
    </section>
  );
};

class GlobeSectionBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // keep landing hero visible even if globe section fails
  }

  render() {
    if (this.state.hasError) {
      return <GlobeSectionFallback />;
    }
    return this.props.children;
  }
}

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader onComplete={handleComplete} />
      ) : (
        <>
          <LandingHero />
          <GlobeSectionBoundary>
            <Suspense fallback={<GlobeSectionFallback />}>
              <GlobeSection />
              {/* Fire & certifications: placed here so it appears right after the globe scroll, not below Philosophy */}
              
              <ThirdSection />
              <FourthSection />
              <FifthSection />
              <SixthSection />
              <Applications />
              <Gallary />
              <Footer />

            </Suspense>
          </GlobeSectionBoundary>
          
        </>
      )}
    </>
  );
};

export default Index;
