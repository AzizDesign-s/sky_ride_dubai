import { motion } from "framer-motion";
import { IoTimeOutline, IoPersonOutline } from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";

/**
 * RideCard
 * ─────────────────────────────────────────────────────────
 * Reusable ride option card.
 * Used on: FindRideScreen, MyTripsScreen
 *
 * Props:
 *   ride        object    { id, name, description, icon, price, eta, distance, passengers }
 *   isSelected  boolean   highlight selected state
 *   onSelect    fn        called with ride object on tap
 */
export default function RideCard({ ride, isSelected, onSelect }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(ride)}
      className="w-full text-left rounded-2xl overflow-hidden"
      style={{
        background: isSelected
          ? "rgba(0,212,255,0.08)"
          : "rgba(255,255,255,0.03)",
        border: isSelected
          ? "1.5px solid rgba(0,212,255,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isSelected ? "0 0 24px rgba(0,212,255,0.1)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      {/* Top row — icon, name, price */}
      <div className="flex items-center gap-4 px-4 pt-4 pb-3">
        {/* Ride icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
          style={{
            background: isSelected
              ? "rgba(0,212,255,0.15)"
              : "rgba(255,255,255,0.05)",
            border: isSelected
              ? "1px solid rgba(0,212,255,0.3)"
              : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {ride.icon}
        </div>

        {/* Name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <p className="font-syne font-bold text-[15px] text-white">
              {ride.name}
            </p>
            {isSelected && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2 py-0.5 rounded-full font-inter text-[10px] font-semibold"
                style={{ background: "rgba(0,212,255,0.2)", color: "#00D4FF" }}
              >
                Selected
              </motion.span>
            )}
          </div>
          <p
            className="font-inter text-[12px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {ride.description}
          </p>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <p
            className="font-syne font-bold text-[20px]"
            style={{ color: "#00D4FF" }}
          >
            {ride.price}
          </p>
          <p
            className="font-inter text-[10px]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            AED
          </p>
        </div>
      </div>

      {/* Bottom row — stats */}
      <div
        className="flex items-center gap-5 px-4 pb-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <StatBadge icon={<IoTimeOutline size={12} />} label={ride.eta} />
        <StatBadge icon={<MdFlightTakeoff size={12} />} label={ride.distance} />
        <StatBadge
          icon={<IoPersonOutline size={12} />}
          label={`${ride.passengers} seats`}
        />
      </div>
    </motion.button>
  );
}

// Small stat item inside the card
function StatBadge({ icon, label }) {
  return (
    <div className="flex items-center gap-1 pt-2">
      <span style={{ color: "rgba(0,212,255,0.6)" }}>{icon}</span>
      <span
        className="font-inter text-[11px]"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {label}
      </span>
    </div>
  );
}
