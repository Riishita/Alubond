import ChromaGrid from "@/components/ChromaGrid";

const items = [
  {
    image: "/images/BUILDINGFACADES.png",
    title: "BUILDING FACADES",
    subtitle:
      "Curtain walls, rainscreen cladding, and architectural envelope systems.",
    index: "01",
  },
  {
    image: "/images/trailer.jpeg",
    title: "AUTOMOBILE INDUSTRY",
    subtitle: "Lightweight panels for vehicle bodies and trailers.",
    index: "02",
  },
  {
    image: "/images/coporate identity.png",
    title: "CORPORATE IDENTITY",
    subtitle: "Signage and branded installations.",
    index: "03",
  },
  {
    image: "/images/machine covers.jpg",
    title: "MACHINE COVERS",
    subtitle: "Industrial enclosures and housings.",
    index: "04",
  },
  {
    image: "/images/elevators .avif",
    title: "ELEVATORS & INTERIORS",
    subtitle: "Interior panels and partitions.",
    index: "05",
  },
  {
    image: "/images/marine .jpg",
    title: "MARINE & OFFSHORE",
    subtitle: "Corrosion-resistant panels.",
    index: "06",
  },
  {
    image: "/images/bullet train.png",
    title: "TRAINS & COACHES",
    subtitle: "Fire-rated lightweight panels.",
    index: "07",
  },
];

export default function Section() {
  return (
    <section
      style={{
        background:
          "radial-gradient(circle at center, #3B4D8F 0%, #1E2A5A 45%, #273054 100%)",
        padding: "100px 40px",
      }}
    >
      {/* TOP HEADER */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "50px",
        }}
      >
        {/* small label */}
        <p
          style={{
            color: "#777",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        >
          004 / Applications
        </p>

        {/* heading + right text */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "900",
              lineHeight: "1.1",
              maxWidth: "600px",
            }}
          >
            WHERE ALUBOND PERFORMS
          </h1>

          <p
            style={{
              maxWidth: "300px",
              color: "#777",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            Seven industries. One material.
            <br />
            Endless architectural possibility.
          </p>
        </div>
      </div>

      {/* GRID */}
      <ChromaGrid items={items} />
    </section>
  );
}