import { motion } from "framer-motion";

/**
 * PageTopBar
 * ─────────────────────────────────────────────────────────
 * Reusable top section for tab screens (Home, My Trips,
 * Nol Cards, Profile) — NO back button, has BottomNav.
 *
 * Props:
 *   eyebrow    string   small label above title e.g. "History"
 *   title      string   main page title e.g. "My Trips"
 *   subtitle   string   count or info below title (optional)
 *   right      node     right side element e.g. search button
 */
export default function PageTopBar({ eyebrow, title, subtitle, right, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-end justify-between px-5 pt-14 pb-2"
    >
      {/* Left — eyebrow + title + subtitle */}
      <div>
        {eyebrow && (
          <p
            className="font-inter text-[12px] uppercase tracking-[2.5px] mb-1"
            style={{ color: "rgba(0,212,255,0.6)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="font-syne font-extrabold text-[26px] text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p
            className="font-inter text-[13px] mt-1"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {subtitle}
          </p>
        )}
        <p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-inter text-[11px]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          {text}
        </p>
      </div>

      {/* Right — optional slot */}
      {right && <div className="mb-1 flex-shrink-0">{right}</div>}
    </motion.div>
  );
}
