import { motion } from "framer-motion";

/**
 * ProfileAvatar
 * ─────────────────────────────────────────────────────────
 * Reusable avatar + user info block.
 * Used on: ProfileScreen
 *
 * Props:
 *   name         string   full name
 *   phone        string   mobile number
 *   emiratesId   string   emirates ID number
 *   avatar       string   image url (optional — shows initials if null)
 */
export default function ProfileAvatar({
  name,
  phone,
  emiratesId,
  avatar,
  website,
}) {
  // Generate initials from name
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AZ";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 px-5 pt-14 pb-6"
    >
      {/* Avatar circle */}
      <div className="relative">
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "rgba(0,212,255,0.15)",
            filter: "blur(10px)",
            transform: "scale(1.3)",
          }}
        />

        {/* Avatar */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: avatar
              ? "transparent"
              : "linear-gradient(135deg, #0D2040 0%, #1A3A5C 100%)",
            border: "2px solid rgba(0,212,255,0.4)",
            boxShadow: "0 0 24px rgba(0,212,255,0.2)",
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="font-syne font-extrabold text-[28px]"
              style={{ color: "#00D4FF" }}
            >
              {initials}
            </span>
          )}
        </div>

        {/* Online dot */}
        <div
          className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2"
          style={{
            background: "#00FF88",
            borderColor: "#050A14",
            boxShadow: "0 0 8px rgba(0,255,136,0.6)",
          }}
        />
      </div>

      {/* Name */}
      <div className="text-center">
        <h2 className="font-syne font-extrabold text-[22px] text-white leading-tight">
          {name || "—"}
        </h2>
        <p
          className="font-inter text-[12px] mt-0.5 uppercase tracking-[2px]"
          style={{ color: "rgba(0,212,255,0.6)" }}
        >
          SkyRide Member
        </p>
      </div>

      {/* Info pills */}
      <div className="flex gap-3 flex-wrap justify-center">
        {/* Phone */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <span className="text-[14px]">📱</span>
          <span
            className="font-inter text-[13px] text-white"
            style={{ letterSpacing: "0.5px" }}
          >
            {phone || "—"}
          </span>
        </div>

        {/* Emirates ID */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <span className="text-[14px]">🪪</span>
          <span
            className="font-inter text-[13px] text-white"
            style={{ letterSpacing: "0.5px" }}
          >
            {emiratesId
              ? `${emiratesId.slice(0, 3)}-****-${emiratesId.slice(-4)}`
              : "—"}
          </span>
        </div>
        {/* Website */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <span className="text-[14px]">🪪</span>
          <a
            href={website}
            target="_blank" // ✅ opens in new tab
            rel="noopener noreferrer"
            className="font-inter text-[13px] text-white cursor-pointer"
            style={{ letterSpacing: "0.5px" }}
          >
            {website ? `${website.slice(8)}` : "---"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
