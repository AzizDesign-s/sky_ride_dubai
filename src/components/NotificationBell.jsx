import { motion } from "framer-motion";
import { IoNotificationsOutline } from "react-icons/io5";

/**
 * NotificationBell
 * ─────────────────────────────────────────────────────────
 * Reusable bell icon with optional red dot indicator.
 *
 * Props:
 *   hasNotification  boolean   show red dot (default: true)
 *   onClick          fn        tap handler
 */
export default function NotificationBell({ hasNotification = true, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      className="relative w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <IoNotificationsOutline size={20} color="white" />

      {hasNotification && (
        <span
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{
            background: "#FF4560",
            boxShadow: "0 0 6px rgba(255,69,96,0.8)",
          }}
        />
      )}
    </motion.button>
  );
}
