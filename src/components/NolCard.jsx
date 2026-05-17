import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";

/**
 * NolCard
 * ─────────────────────────────────────────────────────────
 * Reusable Nol Card UI component.
 * Used on: ChooseNolCardScreen, MyNolCardsScreen, ConfirmRideScreen
 *
 * Props:
 *   card        object    card data from mockData
 *   isSelected  boolean   highlight selected state
 *   onSelect    fn        called on tap (optional — pass null for display-only)
 *   compact     boolean   smaller version for confirm screen (default: false)
 */

// Card theme per type
const THEMES = {
  Silver: {
    gradient: "rgba(179,179,179,0.20)",
    labelColor: "rgba(255,255,255,0.55)",
    valueColor: "#ffffff",
    badgeBg: "rgba(255,255,255,0.18)",
    badgeText: "#e0eaf0",
    chipColor: "rgba(200,220,230,0.35)",
    glowColor: "rgba(176,196,207,0.45)",
    logoOpacity: 0.25,
  },
  Gold: {
    gradient: "rgba(205,158,57,0.20)",
    labelColor: "rgba(255,240,180,0.65)",
    valueColor: "#fff8e0",
    badgeBg: "rgba(255,255,255,0.18)",
    badgeText: "#fff0b0",
    chipColor: "rgba(255,200,50,0.35)",
    glowColor: "rgba(255,215,0,0.5)",
    logoOpacity: 0.3,
  },
  Platinum: {
    gradient: "rgba(57,92,205,0.20)",
    labelColor: "rgba(255,255,255,0.55)",
    valueColor: "#ffffff",
    badgeBg: "rgba(255,255,255,0.18)",
    badgeText: "#dce4e8",
    chipColor: "rgba(210,220,225,0.35)",
    glowColor: "rgba(210,220,225,0.45)",
    logoOpacity: 0.25,
  },
};

export default function NolCard({
  card,
  isSelected = false,
  onSelect,
  compact = false,
}) {
  const theme = THEMES[card.type] || THEMES.Silver;
  const height = compact ? 90 : 185;

  return (
    <motion.div
      whileTap={onSelect ? { scale: 0.97 } : {}}
      onClick={() => onSelect?.(card)}
      className="relative w-full rounded-3xl overflow-hidden cursor-pointer select-none backdrop-blur-[5px]"
      style={{
        height,
        background: theme.gradient,
      }}
      animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%, rgba(0,0,0,0.12) 100%)",
        }}
      />

      {/* Circular glow — decorative */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.08)", filter: "blur(20px)" }}
      />

      {!compact ? (
        // ── Full card layout ─────────────────────────────
        <div className="relative z-10 flex flex-col justify-between h-full px-6 py-5">
          {/* Top row — NOL logo + type badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* NOL logo mark */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-syne font-black text-[14px]"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: theme.valueColor,
                  letterSpacing: "-1px",
                }}
              >
                nol
              </div>
              <div>
                <p
                  className="font-syne font-bold text-[13px]"
                  style={{ color: theme.valueColor }}
                >
                  Nol Card
                </p>
                <p
                  className="font-inter text-[10px]"
                  style={{ color: theme.labelColor }}
                >
                  Dubai RTA
                </p>
              </div>
            </div>

            {/* Type badge */}
            <div
              className="px-3 py-1 rounded-full"
              style={{ background: theme.badgeBg }}
            >
              <span
                className="font-syne font-bold text-[12px]"
                style={{ color: theme.badgeText }}
              >
                {card.type}
              </span>
            </div>
          </div>

          {/* Chip icon */}

          {/* Bottom — card number + balance */}
          <div>
            <p
              className="font-inter text-[16px] font-medium tracking-[3px] mb-3"
              style={{ color: theme.valueColor, letterSpacing: "3px" }}
            >
              {card.number}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="font-inter text-[10px] uppercase tracking-[1.5px] mb-0.5"
                  style={{ color: theme.labelColor }}
                >
                  Balance
                </p>
                <p
                  className="font-syne font-bold text-[22px]"
                  style={{ color: theme.valueColor }}
                >
                  AED {card.balance.toFixed(2)}
                </p>
              </div>

              {/* Default badge */}
              {card.isDefault && (
                <div
                  className="px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <IoCheckmarkCircle
                    size={11}
                    style={{ color: theme.valueColor }}
                  />
                  <span
                    className="font-inter text-[10px] font-medium"
                    style={{ color: theme.valueColor }}
                  >
                    Default
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // ── Compact card layout (for ConfirmRideScreen) ──
        <div className="relative z-10 flex items-center justify-between h-full px-5">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-syne font-black text-[12px]"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: theme.valueColor,
              }}
            >
              nol
            </div>
            <div>
              <p
                className="font-syne font-bold text-[13px]"
                style={{ color: theme.valueColor }}
              >
                {card.type} Card
              </p>
              <p
                className="font-inter text-[11px]"
                style={{ color: theme.labelColor }}
              >
                •••• {card.last4}
              </p>
            </div>
          </div>
          <p
            className="font-syne font-bold text-[16px]"
            style={{ color: theme.valueColor }}
          >
            AED {card.balance.toFixed(2)}
          </p>
        </div>
      )}

      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 z-20"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.95)" }}
          >
            <IoCheckmarkCircle size={20} className="text-sky-accent" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
