import { motion } from "framer-motion";
import { IoHomeOutline, IoHome } from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";
import { HiOutlineCreditCard, HiCreditCard } from "react-icons/hi2";
import { IoPersonOutline, IoPerson } from "react-icons/io5";

const TABS = [
  {
    id: "home",
    label: "Home",
    icon: IoHomeOutline,
    activeIcon: IoHome,
    screen: "home",
  },
  {
    id: "trips",
    label: "My Trips",
    icon: MdFlightTakeoff,
    activeIcon: MdFlightTakeoff,
    screen: "myTrips",
  },
  {
    id: "cards",
    label: "Nol Cards",
    icon: HiOutlineCreditCard,
    activeIcon: HiCreditCard,
    screen: "myCards",
  },
  {
    id: "profile",
    label: "Profile",
    icon: IoPersonOutline,
    activeIcon: IoPerson,
    screen: "profile",
  },
];

export default function BottomNav({ active, navigate }) {
  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full"
      style={{ maxWidth: "460px" }}
    >
      {/* Background blur */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,10,20,0.98) 60%, rgba(5,10,20,0.85))",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Tabs */}
      <div className="relative  flex items-center justify-around px-2 pt-3 pb-8">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          const Icon = isActive ? tab.activeIcon : tab.icon;

          return (
            <motion.button
              key={tab.id}
              onClick={() => navigate(tab.screen)}
              whileTap={{ scale: 0.85 }}
              className="flex flex-col items-center gap-1 px-4 py-1 relative"
            >
              {/* Active top line */}
              {isActive && (
                <motion.div
                  layoutId="active-tab-line"
                  className="absolute -top-3 w-8 h-[2px] rounded-full"
                  style={{
                    background: "#00D4FF",
                    boxShadow: "0 0 8px rgba(0,212,255,0.9)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                size={22}
                style={{
                  color: isActive ? "#00D4FF" : "#6B7F96",
                  filter: isActive
                    ? "drop-shadow(0 0 6px rgba(0,212,255,0.7))"
                    : "none",
                }}
              />

              <span
                className="text-[10px] font-inter font-medium"
                style={{ color: isActive ? "#00D4FF" : "#6B7F96" }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
