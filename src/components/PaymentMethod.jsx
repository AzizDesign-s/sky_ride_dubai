import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";

/**
 * PaymentMethodCard
 * ─────────────────────────────────────────────────────────
 * Reusable payment method selector card.
 * Used on: TopUpScreen — future: checkout screens
 *
 * Props:
 *   method      object    { id, label, sublabel, icon, tag }
 *   isSelected  boolean
 *   onSelect    fn(method)
 */
export default function PaymentMethodCard({ method, isSelected, onSelect }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(method)}
      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left"
      style={{
        background: isSelected
          ? "rgba(0,212,255,0.08)"
          : "rgba(255,255,255,0.03)",
        border: isSelected
          ? "1.5px solid rgba(0,212,255,0.45)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isSelected ? "0 0 20px rgba(0,212,255,0.08)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
        style={{
          background: isSelected
            ? "rgba(0,212,255,0.12)"
            : "rgba(255,255,255,0.05)",
          border: isSelected
            ? "1px solid rgba(0,212,255,0.25)"
            : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {method.icon}
      </div>

      {/* Label */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-syne font-bold text-[15px] text-white">
            {method.label}
          </p>
          {method.tag && (
            <span
              className="px-2 py-0.5 rounded-full font-inter text-[10px] font-medium"
              style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88" }}
            >
              {method.tag}
            </span>
          )}
        </div>
        <p
          className="font-inter text-[12px]"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {method.sublabel}
        </p>
      </div>

      {/* Selected checkmark */}
      {isSelected ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IoCheckmarkCircle size={22} style={{ color: "#00D4FF" }} />
        </motion.div>
      ) : (
        <div
          className="w-5 h-5 rounded-full border-2"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        />
      )}
    </motion.button>
  );
}
