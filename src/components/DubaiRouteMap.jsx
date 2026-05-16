import { motion } from "framer-motion";
import { MdFlightTakeoff } from "react-icons/md";

/**
 * DubaiRouteMap
 * ─────────────────────────────────────────────────────────
 * Reusable SVG map showing From → To route.
 * Used on: FindRideScreen, LiveTrackingScreen
 *
 * Props:
 *   from   location object  { id, name, zone }
 *   to     location object  { id, name, zone }
 */

// x,y coordinates for each Dubai location on the 412x220 SVG canvas
const MAP_COORDS = {
  1: { x: 75, y: 175 }, // Dubai Marina
  2: { x: 210, y: 128 }, // Downtown Dubai
  3: { x: 358, y: 78 }, // DXB Airport
  4: { x: 55, y: 138 }, // Palm Jumeirah
  5: { x: 228, y: 142 }, // Business Bay
  6: { x: 68, y: 162 }, // JBR
  7: { x: 238, y: 118 }, // DIFC
  8: { x: 188, y: 192 }, // Dubai Hills
  9: { x: 108, y: 158 }, // Jumeirah Beach
  10: { x: 308, y: 108 }, // Creek Harbour
};

const DEFAULT_FROM = { x: 75, y: 175 };
const DEFAULT_TO = { x: 308, y: 108 };

export default function DubaiRouteMap({ from, to }) {
  const fromCoord = MAP_COORDS[from?.id] || DEFAULT_FROM;
  const toCoord = MAP_COORDS[to?.id] || DEFAULT_TO;

  // Arc control point — curves upward between the two points
  const midX = (fromCoord.x + toCoord.x) / 2;
  const midY = Math.min(fromCoord.y, toCoord.y) - 42;

  const routePath = `M ${fromCoord.x} ${fromCoord.y} Q ${midX} ${midY} ${toCoord.x} ${toCoord.y}`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl  border border-solid border-sky-border bg-sky-bg"
      style={{
        height: "220px",
      }}
    >
      <svg
        width="100%"
        height="220"
        viewBox="0 0 412 220"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid */}
        <g opacity="0.05">
          {[0, 55, 110, 165, 220].map((y, i) => (
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
          {[0, 60, 120, 180, 240, 300, 360, 412].map((x, i) => (
            <line
              key={`v${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2="220"
              stroke="#00D4FF"
              strokeWidth="0.8"
            />
          ))}
        </g>

        {/* Dubai roads — simplified */}
        <g opacity="0.1" stroke="#4A6FA5" strokeWidth="1.5" fill="none">
          <line x1="0" y1="155" x2="412" y2="155" /> {/* Sheikh Zayed Road */}
          <line x1="0" y1="220" x2="412" y2="58" /> {/* Emirates Road */}
          <line x1="178" y1="0" x2="258" y2="220" /> {/* Al Khail Road */}
          <line x1="338" y1="0" x2="378" y2="220" /> {/* Airport Road */}
          <line x1="0" y1="138" x2="118" y2="220" /> {/* Marina road */}
        </g>

        {/* Water — sea / creek hint */}
        <path
          d="M 0 200 Q 80 182 160 196 Q 240 210 320 192 Q 380 178 412 188 L 412 220 L 0 220 Z"
          fill="rgba(0,80,180,0.07)"
        />

        {/* Route glow */}
        <motion.path
          d={routePath}
          stroke="rgba(0,212,255,0.12)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Route dashed line */}
        <motion.path
          d={routePath}
          stroke="#00D4FF"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
        />

        {/* FROM — cyan dot with pulse */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ transformOrigin: `${fromCoord.x}px ${fromCoord.y}px` }}
        >
          <motion.circle
            cx={fromCoord.x}
            cy={fromCoord.y}
            r="12"
            fill="none"
            stroke="rgba(0,212,255,0.25)"
            strokeWidth="1"
            animate={{ r: [10, 18, 10], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle
            cx={fromCoord.x}
            cy={fromCoord.y}
            r="7"
            fill="rgba(0,212,255,0.2)"
            stroke="#00D4FF"
            strokeWidth="1.5"
          />
          <circle cx={fromCoord.x} cy={fromCoord.y} r="3" fill="#00D4FF" />
        </motion.g>

        {/* FROM label */}
        <text
          x={fromCoord.x}
          y={fromCoord.y + 20}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize="9"
          fontFamily="Inter,sans-serif"
        >
          {from?.zone || "Pickup"}
        </text>

        {/* TO — green dot with pulse */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ transformOrigin: `${toCoord.x}px ${toCoord.y}px` }}
        >
          <motion.circle
            cx={toCoord.x}
            cy={toCoord.y}
            r="12"
            fill="none"
            stroke="rgba(0,255,136,0.25)"
            strokeWidth="1"
            animate={{ r: [10, 18, 10], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <circle
            cx={toCoord.x}
            cy={toCoord.y}
            r="7"
            fill="rgba(0,255,136,0.2)"
            stroke="#00FF88"
            strokeWidth="1.5"
          />
          <circle cx={toCoord.x} cy={toCoord.y} r="3" fill="#00FF88" />
        </motion.g>

        {/* TO label */}
        <text
          x={toCoord.x}
          y={toCoord.y + 20}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize="9"
          fontFamily="Inter,sans-serif"
        >
          {to?.zone || "Drop"}
        </text>

        {/* Mini taxi animating along the route */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.g
            animate={{
              x: [fromCoord.x - 12, midX - 12, toCoord.x - 12],
              y: [fromCoord.y - 18, midY - 18, toCoord.y - 18],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.8,
            }}
          >
            <rect
              x="0"
              y="4"
              width="24"
              height="10"
              rx="5"
              fill="#0D2040"
              stroke="rgba(0,212,255,0.6)"
              strokeWidth="0.8"
            />
            <rect
              x="4"
              y="6"
              width="5"
              height="5"
              rx="1.5"
              fill="rgba(0,212,255,0.4)"
            />
            <rect
              x="11"
              y="6"
              width="5"
              height="5"
              rx="1.5"
              fill="rgba(0,212,255,0.4)"
            />
            <rect x="0" y="3" width="10" height="2" rx="1" fill="#132338" />
            <rect x="14" y="3" width="10" height="2" rx="1" fill="#132338" />
            <ellipse cx="12" cy="16" rx="7" ry="2" fill="rgba(0,212,255,0.2)" />
          </motion.g>
        </motion.g>
      </svg>

      {/* From → To pill */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full"
        style={{
          background: "rgba(5,14,30,0.88)",
          border: "1px solid rgba(0,212,255,0.2)",
          backdropFilter: "blur(12px)",
          whiteSpace: "nowrap",
        }}
      >
        <span className="font-inter text-[11px] text-white font-medium">
          {from?.name || "—"}
        </span>
        <MdFlightTakeoff
          size={11}
          style={{ color: "#00D4FF", flexShrink: 0 }}
        />
        <span className="font-inter text-[11px] text-white font-medium">
          {to?.name || "—"}
        </span>
      </div>
    </div>
  );
}
