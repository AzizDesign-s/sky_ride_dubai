import { motion } from "framer-motion";
import { IoChevronForward } from "react-icons/io5";

/**
 * ProfileMenuItem
 * ─────────────────────────────────────────────────────────
 * Reusable profile menu list item.
 * Used on: ProfileScreen — any settings-style screen
 *
 * Props:
 *   icon        node     left icon element
 *   label       string   menu item label
 *   sublabel    string   small description below (optional)
 *   onPress     fn       tap handler
 *   badge       string   right badge text e.g. "New" (optional)
 *   danger      boolean  red color for destructive items e.g. logout
 *   disabled    boolean  future items not yet built
 *   showArrow   boolean  show right chevron (default: true)
 */
export default function ProfileMenuItem({
  icon,
  label,
  sublabel,
  onPress,
  badge,
  danger = false,
  disabled = false,
  showArrow = true,
}) {
  const labelColor = danger ? "#FF4560" : "white";
  const iconColor = danger ? "rgba(255,69,96,0.8)" : "#00D4FF";
  const iconBg = danger ? "rgba(255,69,96,0.1)" : "rgba(0,212,255,0.1)";
  const iconBorder = danger ? "rgba(255,69,96,0.2)" : "rgba(0,212,255,0.15)";

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={disabled ? undefined : onPress}
      className="w-full flex items-center gap-4 px-4 py-4 text-left"
      style={{
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "default" : "pointer",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Left icon */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
      >
        <span style={{ color: iconColor, fontSize: 20 }}>{icon}</span>
      </div>

      {/* Label + sublabel */}
      <div className="flex-1 min-w-0">
        <p
          className="font-syne font-semibold text-[15px] leading-tight"
          style={{ color: labelColor }}
        >
          {label}
        </p>
        {sublabel && (
          <p
            className="font-inter text-[12px] mt-0.5 truncate"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {sublabel}
          </p>
        )}
      </div>

      {/* Right — badge or coming soon or arrow */}
      {badge && (
        <div
          className="px-2.5 py-1 rounded-full flex-shrink-0"
          style={{
            background: "rgba(0,212,255,0.15)",
            border: "1px solid rgba(0,212,255,0.3)",
          }}
        >
          <span
            className="font-inter text-[10px] font-semibold"
            style={{ color: "#00D4FF" }}
          >
            {badge}
          </span>
        </div>
      )}

      {disabled && (
        <div
          className="px-2.5 py-1 rounded-full flex-shrink-0"
          style={{
            background: "rgba(255,184,0,0.1)",
            border: "1px solid rgba(255,184,0,0.2)",
          }}
        >
          <span
            className="font-inter text-[10px] font-medium"
            style={{ color: "#FFB800" }}
          >
            Soon
          </span>
        </div>
      )}

      {showArrow && !disabled && (
        <IoChevronForward
          size={16}
          style={{
            color: danger ? "rgba(255,69,96,0.5)" : "rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}
        />
      )}
    </motion.button>
  );
}
