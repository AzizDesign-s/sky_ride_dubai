import { motion } from "framer-motion";

/**
 * FlyingTaxi
 * ─────────────────────────────────────────────────────────
 * Reusable animated flying taxi SVG.
 *
 * Props:
 *   width   number    width in px (default: 180)
 *   float   boolean   floating up/down animation (default: true)
 */
export default function FlyingTaxi({ width = 180, float = true }) {
  return (
    <motion.div
      style={{ width }}
      animate={float ? { y: [0, -10, 0] } : {}}
      transition={
        float ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" } : {}
      }
    >
      <svg
        viewBox="0 0 180 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
      >
        {/* Ground glow */}
        <ellipse
          cx="90"
          cy="93"
          rx="55"
          ry="7"
          fill="rgba(0,212,255,0.18)"
          style={{ filter: "blur(6px)" }}
        />

        {/* Body */}
        <rect x="22" y="40" width="136" height="40" rx="20" fill="#0D1F35" />
        <rect
          x="22"
          y="40"
          width="136"
          height="40"
          rx="20"
          fill="none"
          stroke="rgba(0,212,255,0.35)"
          strokeWidth="1"
        />

        {/* Body shine */}
        <rect
          x="22"
          y="40"
          width="136"
          height="14"
          rx="14"
          fill="rgba(255,255,255,0.04)"
        />

        {/* Windows */}
        <rect
          x="40"
          y="46"
          width="24"
          height="18"
          rx="6"
          fill="rgba(0,212,255,0.2)"
          stroke="rgba(0,212,255,0.5)"
          strokeWidth="0.8"
        />
        <rect
          x="72"
          y="46"
          width="24"
          height="18"
          rx="6"
          fill="rgba(0,212,255,0.2)"
          stroke="rgba(0,212,255,0.5)"
          strokeWidth="0.8"
        />
        <rect
          x="104"
          y="46"
          width="24"
          height="18"
          rx="6"
          fill="rgba(0,212,255,0.2)"
          stroke="rgba(0,212,255,0.5)"
          strokeWidth="0.8"
        />

        {/* Left rotor arm + spinning blade */}
        <rect x="2" y="33" width="58" height="4" rx="2" fill="#132338" />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "31px 35px" }}
        >
          <ellipse cx="31" cy="35" rx="26" ry="4" fill="rgba(0,212,255,0.5)" />
        </motion.g>

        {/* Right rotor arm + spinning blade */}
        <rect x="120" y="33" width="58" height="4" rx="2" fill="#132338" />
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "149px 35px" }}
        >
          <ellipse cx="149" cy="35" rx="26" ry="4" fill="rgba(0,212,255,0.5)" />
        </motion.g>

        {/* Landing skids */}
        <rect x="36" y="76" width="38" height="4" rx="2" fill="#132338" />
        <rect x="106" y="76" width="38" height="4" rx="2" fill="#132338" />
        <rect x="48" y="68" width="4" height="10" rx="2" fill="#132338" />
        <rect x="66" y="68" width="4" height="10" rx="2" fill="#132338" />
        <rect x="110" y="68" width="4" height="10" rx="2" fill="#132338" />
        <rect x="128" y="68" width="4" height="10" rx="2" fill="#132338" />

        {/* Nav lights */}
        <motion.circle
          cx="24"
          cy="60"
          r="3.5"
          fill="#FF4560"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <motion.circle
          cx="156"
          cy="60"
          r="3.5"
          fill="#00FF88"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
        />
      </svg>
    </motion.div>
  );
}
