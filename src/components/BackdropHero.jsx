import heroBg from "../assets/homeBg.png";
import taxi from "../assets/taxi.png";
/**
 * BackdropHero
 * ─────────────────────────────────────────────────────────
 * Reusable page backdrop — use on every screen that needs
 * the futuristic dark background.
 *
 * Includes:
 *   1. Dark gradient background
 *   2. Cyan radial glow at top
 *   3. Grid lines overlay
 *
 * Props:
 *   height     number   height of the backdrop in px (default: 280)
 *   glowColor  string   radial glow color (default: rgba(0,212,255,0.12))
 */
export default function BackdropHero({
  height = 280,
  glowColor = "rgba(0,82,201,0.40)",
}) {
  return (
    <div
      className="absolute top-0 left-0 right-0  pointer-events-none"
      style={{ height }}
    >
      {/* 1. Dark gradient background */}
      <div className="absolute inset-0" />

      {/* 2. Cyan radial glow at top center */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* 3. Grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 412 ${height}`}
        style={{ opacity: 0.075 }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Vertical lines */}
        {[0, 60, 120, 180, 240, 300, 360, 412].map((x, i) => (
          <line
            key={`v${i}`}
            x1={x}
            y1="0"
            x2={x}
            y2={height}
            stroke="#00D4FF"
            strokeWidth="0.8"
          />
        ))}
        {/* Horizontal lines */}
        {[0, 60, 120, 180, 240, 300]
          .filter((y) => y <= height)
          .map((y, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={y}
              x2="412"
              y2={y}
              stroke="#00D4FF"
              strokeWidth="0.8"
            />
          ))}
      </svg>

      <img src={heroBg} alt="Dubai" className="object-cover w-full h-auto " />
      <div className="absolute top-28 left-0 w-80 h-auto">
        <img
          src={taxi}
          alt="Air Taxi"
          className="object-cover w-80 h-auto absolute z-30"
        />
        <div className="bg-[rgba(0,82,201,0.30)] blur-3xl  w-80 h-52" />
      </div>
    </div>
  );
}
