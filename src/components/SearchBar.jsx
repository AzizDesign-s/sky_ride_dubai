import { motion, AnimatePresence } from "framer-motion";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

/**
 * SearchBar
 * ─────────────────────────────────────────────────────────
 * Reusable search input with clear button and cancel.
 * Used on: MyTripsScreen — any future search screen
 *
 * Props:
 *   value        string    controlled search text
 *   onChange     fn        called with new string
 *   onCancel     fn        called when cancel is tapped
 *   placeholder  string    input placeholder text
 */
export default function SearchBar({
  value,
  onChange,
  onCancel,
  placeholder = "Search...",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 px-5 pb-2"
    >
      {/* Input */}
      <div
        className="flex-1 flex items-center gap-2 px-4 rounded-2xl"
        style={{
          background: "rgba(0,212,255,0.06)",
          border: "1.5px solid rgba(0,212,255,0.3)",
          height: "48px",
        }}
      >
        <IoSearchOutline
          size={16}
          style={{ color: "rgba(0,212,255,0.6)", flexShrink: 0 }}
        />
        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-inter text-[14px] text-white outline-none"
          style={{ caretColor: "#00D4FF" }}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => onChange("")}
            >
              <IoCloseOutline
                size={18}
                style={{ color: "rgba(255,255,255,0.4)" }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Cancel */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onCancel}
        className="font-inter text-[13px] flex-shrink-0"
        style={{ color: "rgba(0,212,255,0.7)" }}
      >
        Cancel
      </motion.button>
    </motion.div>
  );
}
