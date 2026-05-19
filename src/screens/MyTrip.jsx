import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoSearchOutline,
  IoCloseOutline,
  IoAirplaneOutline,
} from "react-icons/io5";

import BackdropHero from "../components/BackdropHero";
import TripCard from "../components/TripCard";

// ─── Mock trips — shown when no real trips exist yet ─────
// Once user books real rides, these get replaced by App state trips
const MOCK_TRIPS = [
  {
    tripId: "SKYRIDE-DXB-20240517-4821-001",
    from: { zone: "Marina", name: "Dubai Marina", dock: "SKY-DOCK-01" },
    to: { zone: "Downtown", name: "Downtown Dubai", dock: "SKY-DOCK-02" },
    route: { name: "Standard Sky Ride" },
    card: { type: "Silver", last4: "4821" },
    totalFare: 126.0,
    timestamp: "2024-05-17T10:30:00.000Z",
    status: "completed",
  },
  {
    tripId: "SKYRIDE-PAL-20240516-2233-042",
    from: { zone: "Palm", name: "Palm Jumeirah", dock: "SKY-DOCK-04" },
    to: { zone: "DXB", name: "Dubai Airport", dock: "SKY-DOCK-03" },
    route: { name: "Premium Cabin" },
    card: { type: "Gold", last4: "2233" },
    totalFare: 189.0,
    timestamp: "2024-05-16T08:15:00.000Z",
    status: "completed",
  },
  {
    tripId: "SKYRIDE-JBR-20240515-5544-018",
    from: { zone: "JBR", name: "JBR – The Walk", dock: "SKY-DOCK-06" },
    to: { zone: "DIFC", name: "DIFC", dock: "SKY-DOCK-07" },
    route: { name: "VIP Private Pod" },
    card: { type: "Platinum", last4: "5544" },
    totalFare: 340.0,
    timestamp: "2024-05-15T19:45:00.000Z",
    status: "completed",
  },
  {
    tripId: "SKYRIDE-HLS-20240514-4821-007",
    from: { zone: "Hills", name: "Dubai Hills", dock: "SKY-DOCK-08" },
    to: { zone: "Marina", name: "Dubai Marina", dock: "SKY-DOCK-01" },
    route: { name: "Standard Sky Ride" },
    card: { type: "Silver", last4: "4821" },
    totalFare: 113.0,
    timestamp: "2024-05-14T14:20:00.000Z",
    status: "completed",
  },
  {
    tripId: "SKYRIDE-CRK-20240513-2233-031",
    from: { zone: "Creek", name: "Dubai Creek Harbour", dock: "SKY-DOCK-10" },
    to: { zone: "Downtown", name: "Downtown Dubai", dock: "SKY-DOCK-02" },
    route: { name: "Premium Cabin" },
    card: { type: "Gold", last4: "2233" },
    totalFare: 189.0,
    timestamp: "2024-05-13T11:00:00.000Z",
    status: "completed",
  },
];

// Filter tabs
const FILTERS = [
  { id: "all", label: "All Trips" },
  { id: "Silver", label: "Silver" },
  { id: "Gold", label: "Gold" },
  { id: "Platinum", label: "Platinum" },
];

// Filter tab accent colors
const FILTER_COLORS = {
  all: "#00D4FF",
  Silver: "#B0C4CF",
  Gold: "#FFD700",
  Platinum: "#D8DEE2",
};

export default function MyTripsScreen({ navigate, trips }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Use real trips from App state if available, else mock data
  const allTrips = trips && trips.length > 0 ? trips : MOCK_TRIPS;

  // ── Filter + Search ──────────────────────────────────────
  const filteredTrips = useMemo(() => {
    let result = [...allTrips];

    // Filter by card type
    if (activeFilter !== "all") {
      result = result.filter((t) => t.card?.type === activeFilter);
    }

    // Search by trip ID
    if (searchQuery.trim()) {
      result = result.filter((t) =>
        t.tripId?.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      );
    }

    return result;
  }, [allTrips, activeFilter, searchQuery]);

  const handleTripPress = (trip) => {
    // TODO: navigate to trip detail screen when built
    // navigate('tripDetail', { trip })
    console.log("Trip pressed:", trip.tripId);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  // ── Render ───────────────────────────────────────────────

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 1. Backdrop */}
      <BackdropHero height={180} />

      {/* 2. Top section */}
      <div className="relative z-10 px-5 pt-14 pb-2">
        <AnimatePresence mode="wait">
          {/* Normal header */}
          {!showSearch && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-end justify-between"
            >
              <div>
                <p
                  className="font-inter text-[12px] uppercase tracking-[2.5px] mb-1"
                  style={{ color: "rgba(0,212,255,0.6)" }}
                >
                  History
                </p>
                <h1 className="font-syne font-extrabold text-[26px] text-white leading-tight">
                  My Trips
                </h1>
                <p
                  className="font-inter text-[13px] mt-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {allTrips.length} trip{allTrips.length !== 1 ? "s" : ""} total
                </p>
              </div>

              {/* Search icon */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setShowSearch(true)}
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <IoSearchOutline size={20} color="white" />
              </motion.button>
            </motion.div>
          )}

          {/* Search bar */}
          {showSearch && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Trip ID..."
                  className="flex-1 bg-transparent font-inter text-[14px] text-white outline-none"
                  style={{ caretColor: "#00D4FF" }}
                />
                {searchQuery && (
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setSearchQuery("")}
                  >
                    <IoCloseOutline
                      size={18}
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    />
                  </motion.button>
                )}
              </div>

              {/* Cancel */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleClearSearch}
                className="font-inter text-[13px]"
                style={{ color: "rgba(0,212,255,0.7)", whiteSpace: "nowrap" }}
              >
                Cancel
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative z-10 px-4 mt-4"
      >
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            const color = FILTER_COLORS[filter.id];
            return (
              <motion.button
                key={filter.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveFilter(filter.id)}
                className="flex-shrink-0 px-4 py-2 rounded-xl font-inter text-[12px] font-medium"
                style={{
                  background: isActive
                    ? `${color}18`
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? `1.5px solid ${color}55`
                    : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? color : "rgba(255,255,255,0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                {filter.label}

                {/* Trip count per filter */}
                {filter.id !== "all" && (
                  <span
                    className="ml-1.5 font-inter text-[10px]"
                    style={{
                      color: isActive ? color : "rgba(255,255,255,0.25)",
                    }}
                  >
                    ({allTrips.filter((t) => t.card?.type === filter.id).length}
                    )
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* 4. Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 px-5 mt-4 mb-2 flex items-center justify-between"
      >
        <p
          className="font-inter text-[11px] uppercase tracking-[2px]"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {filteredTrips.length} {filteredTrips.length === 1 ? "trip" : "trips"}{" "}
          found
        </p>

        {(activeFilter !== "all" || searchQuery) && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="font-inter text-[11px]"
            style={{ color: "rgba(0,212,255,0.6)" }}
          >
            Clear filters
          </motion.button>
        )}
      </motion.div>

      {/* 5. Trip list */}
      <div className="relative z-10 flex flex-col gap-3 px-4">
        <AnimatePresence mode="popLayout">
          {/* Trip cards */}
          {filteredTrips.map((trip, i) => (
            <motion.div
              key={trip.tripId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              layout
            >
              <TripCard trip={trip} onPress={handleTripPress} />
            </motion.div>
          ))}

          {/* Empty state — no results */}
          {filteredTrips.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-3"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <IoAirplaneOutline
                  size={28}
                  style={{ color: "rgba(255,255,255,0.2)" }}
                />
              </div>
              <p className="font-syne font-bold text-[17px] text-white">
                No trips found
              </p>
              <p
                className="font-inter text-[13px] text-center px-8"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {searchQuery
                  ? `No trips match "${searchQuery}"`
                  : `No trips with ${activeFilter} card yet`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom nav spacer */}
      <div className="h-32" />
    </div>
  );
}
