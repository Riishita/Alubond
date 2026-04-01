import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";
import LandingHero from "@/components/LandingHero";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <Preloader onComplete={handleComplete} /> : <LandingHero />}
    </>
  );
};

export default Index;
