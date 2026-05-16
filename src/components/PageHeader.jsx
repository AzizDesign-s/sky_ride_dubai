import { motion } from "framer-motion";
import { IoChevronBack } from "react-icons/io5";
import NotificationBell from "./NotificationBell";

/**
 * PageHeader
 * ─────────────────────────────────────────────────────────
 * Reusable header — used on most screens after Home.
 *
 * Props:
 *   title           string    main heading
 *   subtitle        string    small text above title (optional)
 *   onBack          fn        back button handler
 *   showBell        boolean   show notification bell (default: false)
 *   hasNotification boolean   red dot on bell (default: false)
 *   right           node      custom right side element (optional)
 */
export default function PageHeader({ title, subtitle, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-center justify-between px-4 pt-12 pb-4"
    >
      {/* Left — back button */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={onBack}
        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <IoChevronBack size={20} color="white" />
      </motion.button>

      {/* Center — title */}
      <div className="flex flex-col items-center flex-1 px-3">
        {subtitle && (
          <p
            className="font-inter text-[11px] uppercase tracking-[2px] mb-0.5"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            {subtitle}
          </p>
        )}
        <h1 className="font-syne font-bold text-[18px] text-white leading-tight text-center">
          {title}
        </h1>
      </div>

      <NotificationBell />
    </motion.div>
  );
}
