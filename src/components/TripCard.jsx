import { motion } from "framer-motion";
import {
  IoLocationSharp,
  IoTimeOutline,
  IoCardOutline,
  IoChevronForward,
} from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";

/**
 * TripCard
 * ─────────────────────────────────────────────────────────
 * Single trip history item.
 * Reusable on: MyTripsScreen, future trip detail screen
 *
 * Props:
 *   trip      object    trip record from App state
 *   onPress   fn        tap handler → navigate to trip detail
 */

// Card type accent colors
const CARD_COLORS = {
  Silver: { accent: "#B0C4CF", glow: "rgba(176,196,207,0.15)" },
  Gold: { accent: "#FFD700", glow: "rgba(255,215,0,0.15)" },
  Platinum: { accent: "#D8DEE2", glow: "rgba(57,92,205,0.20)" },
};

// Format timestamp → "17 May 2024 · 10:30 AM"
function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-AE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    d.toLocaleTimeString("en-AE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
}

export default function TripCard({ trip, onPress, navigate }) {
  const colors = CARD_COLORS[trip?.card?.type] || CARD_COLORS.Silver;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onPress?.(trip)}
      className="w-full text-left rounded-2xl overflow-hidden"
      style={{
        background: "rgba(57,92,205,0.20)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Top — colored accent bar */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
        }}
      />

      <div className="px-4 py-4">
        {/* Row 1 — Trip ID + date */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p
              className="font-inter text-[10px] uppercase tracking-[1.5px] mb-0.5"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Trip ID
            </p>
            <p
              className="font-inter font-medium text-[12px]"
              style={{ color: colors.accent }}
            >
              {trip?.tripId || "—"}
            </p>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background:
                trip?.status === "completed"
                  ? "rgba(0,255,136,0.1)"
                  : "rgba(255,184,0,0.1)",
              border:
                trip?.status === "completed"
                  ? "1px solid rgba(0,255,136,0.2)"
                  : "1px solid rgba(255,184,0,0.2)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  trip?.status === "completed" ? "#00FF88" : "#FFB800",
              }}
            />
            <span
              className="font-inter text-[10px] font-medium capitalize"
              style={{
                color: trip?.status === "completed" ? "#00FF88" : "#FFB800",
              }}
            >
              {trip?.status || "confirmed"}
            </span>
          </div>
        </div>

        {/* Row 2 — From → To */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,212,255,0.1)" }}
          >
            <IoLocationSharp size={13} style={{ color: "#00D4FF" }} />
          </div>
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <p className="font-syne font-semibold text-[13px] text-white truncate">
              {trip?.from?.zone || trip?.from?.name || "—"}
            </p>
            <MdFlightTakeoff
              size={13}
              style={{ color: "rgba(0,212,255,0.5)", flexShrink: 0 }}
            />
            <p className="font-syne font-semibold text-[13px] text-white truncate">
              {trip?.to?.zone || trip?.to?.name || "—"}
            </p>
          </div>
          <IoChevronForward
            size={16}
            style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}
          />
        </div>

        {/* Row 3 — date, ride type, card */}
        <div
          className="flex items-center gap-3 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-1.5">
            <IoTimeOutline
              size={12}
              style={{ color: "rgba(255,255,255,0.3)" }}
            />
            <span
              className="font-inter text-[11px]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {formatDate(trip?.timestamp)}
            </span>
          </div>
        </div>

        {/* Row 4 — ride type + fare + card */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <MdFlightTakeoff
              size={12}
              style={{ color: "rgba(255,255,255,0.3)" }}
            />
            <span
              className="font-inter text-[11px]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {trip?.route?.name || "—"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Card type badge */}
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                background: colors.glow,
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <IoCardOutline size={10} style={{ color: colors.accent }} />
              <span
                className="font-inter text-[10px]"
                style={{ color: colors.accent }}
              >
                {trip?.card?.type} ···· {trip?.card?.last4}
              </span>
            </div>

            {/* Fare */}
            <span
              className="font-syne font-bold text-[14px]"
              style={{ color: "#00D4FF" }}
            >
              AED {trip?.totalFare?.toFixed(2) || "—"}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
