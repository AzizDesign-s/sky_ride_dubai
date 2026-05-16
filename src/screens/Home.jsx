import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSwapVertical, IoLocationSharp, IoSearch } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";

import BackdropHero from "../components/BackdropHero";
import FlyingTaxi from "../icons/FlyingTaxi";
import NotificationBell from "../components/NotificationBell";
import Button from "../components/Button";

import { dubaiLocations, currentUser } from "../data/mockData";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

function filterDubai(query) {
  if (!query) return dubaiLocations.slice(0, 6);
  return dubaiLocations
    .filter((l) =>
      l.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    )
    .slice(0, 6);
}

const Home = ({ navigate }) => {
  //Location
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  //dropdown
  const [activeField, setActiveField] = useState(null);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const toggleField = (field) =>
    setActiveField((prev) => (prev === field ? null : field));

  const selectLocation = (field, loc) => {
    if (field === "from") {
      setFrom(loc);
      setFromQuery(loc.name);
    } else {
      setTo(loc);
      setToQuery(loc.name);
    }
    setActiveField(null);
  };

  const swapLocation = () => {
    setFrom(to);
    setTo(from);
    setFromQuery(to?.name || "");
    setToQuery(to?.name || "");
  };

  // To this:
  const handleFindRide = () => {
    if (!from || !to) return; // ← guard
    navigate("findRide", { from, to });
  };
  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      <BackdropHero height={280} isActive={true} />

      {/* Header */}
      <motion.div
        initial={{ opcaity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-between px-4 pt-12 pb-2"
      >
        <div className="flex flex-col gap-1">
          <p
            className="font-inter text-xs mb-0.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {getGreeting()}, {currentUser.name.split(" ")[0]}
          </p>
          <h1 className="font-syne font-extrabold text-xl leading-none tracking-tight text-white">
            SKY{" "}
            <span
              style={{
                color: "#00D4FF",
                textShadow: "0 0 18px rgba(0,212,255,0.65)",
              }}
            >
              RIDE
            </span>
            <span
              className="font-syne font-light text-[14px] ml-2 tracking-[4px]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              DUBAI
            </span>
          </h1>
        </div>
        <NotificationBell hasNotification={true} />
      </motion.div>

      <div className="h-20" />

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="relative z-10 px-4 mt-32"
      >
        <p
          className="font-inter text-[11px] uppercase tracking-[3px] mb-1"
          style={{ color: "rgba(0,212,255,0.6)" }}
        >
          Smart Air Mobility
        </p>
        <h2 className="font-syne font-bold text-[24px] text-white leading-[1.2]">
          Where would
          <span style={{ color: "#00D4FF" }}> you fly today?</span>
        </h2>
      </motion.div>

      <div className="h-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-10 mx-4 rounded-3xl  overflow-hidden"
        style={{
          background: "rgba(13,22,38,0.95)",
          border: "1px solid rgba(0,212,255,0.14)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
        }}
      >
        <button
          onClick={() => toggleField("from")}
          className="w-full flex items-center gap-3 px-4 py-4 text-left"
        >
          <div
            className="w-3 h-3 rounded-full border-2 flex-shrink-0"
            style={{
              borderColor: "#00D4FF",
              boxShadow: "0 0 8px rgba(0,212,255,0.6)",
            }}
          />
          <div className="flex-1">
            <p
              className="font-inter text-[10px] uppercase tracking-[2px] mb-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              From · Pickup
            </p>
            {from ? (
              <p className="font-syne font-semibold text-[15px] text-white">
                {from.name}
              </p>
            ) : (
              <p
                className="font-inter text-[14px]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Choose pickup location
              </p>
            )}
          </div>
          <MdMyLocation size={18} style={{ color: "#00D4FF", flexShrink: 0 }} />
        </button>

        {/* FROM dropdown */}
        <AnimatePresence>
          {activeField === "from" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Search input */}
              <div className="px-4 pt-3 pb-1">
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.12)",
                  }}
                >
                  <IoSearch
                    size={14}
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  />
                  <input
                    autoFocus
                    type="text"
                    value={fromQuery}
                    onChange={(e) => setFromQuery(e.target.value)}
                    placeholder="Search Dubai location..."
                    className="flex-1 bg-transparent font-inter text-[13px] text-white outline-none"
                    style={{ caretColor: "#00D4FF" }}
                  />
                </div>
              </div>
              {/* Results */}
              {filterDubai(fromQuery).map((loc, i) => (
                <motion.button
                  key={loc.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectLocation("from", loc)}
                  className="w-full flex items-center gap-3 px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)" }}
                  >
                    <IoLocationSharp size={14} style={{ color: "#00D4FF" }} />
                  </div>
                  <div className="text-left">
                    <p className="font-inter font-medium text-[14px] text-white">
                      {loc.name}
                    </p>
                    <p
                      className="font-inter text-[11px]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {loc.dock}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider + Swap button */}
        <div className="flex items-center px-5 py-1">
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <motion.button
            whileTap={{ scale: 0.85, rotate: 180 }}
            transition={{ duration: 0.25 }}
            onClick={swapLocation}
            className="mx-3 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.25)",
            }}
          >
            <IoSwapVertical size={17} style={{ color: "#00D4FF" }} />
          </motion.button>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
        </div>

        {/* TO field */}
        <button
          onClick={() => toggleField("to")}
          className="w-full flex items-center gap-3 px-5 py-4 text-left"
        >
          <div
            className="w-3 h-3 rounded-sm rotate-45 flex-shrink-0"
            style={{
              background: "#00D4FF",
              boxShadow: "0 0 8px rgba(0,212,255,0.6)",
            }}
          />
          <div className="flex-1">
            <p
              className="font-inter text-[10px] uppercase tracking-[2px] mb-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              To · Destination
            </p>
            {to ? (
              <p className="font-syne font-semibold text-[15px] text-white">
                {to.name}
              </p>
            ) : (
              <p
                className="font-inter text-[14px]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Choose destination
              </p>
            )}
          </div>
          <IoLocationSharp
            size={18}
            style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}
          />
        </button>

        {/* TO dropdown */}
        <AnimatePresence>
          {activeField === "to" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Search input */}
              <div className="px-4 pt-3 pb-1">
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.12)",
                  }}
                >
                  <IoSearch
                    size={14}
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  />
                  <input
                    autoFocus
                    type="text"
                    value={toQuery}
                    onChange={(e) => setToQuery(e.target.value)}
                    placeholder="Search Dubai location..."
                    className="flex-1 bg-transparent font-inter text-[13px] text-white outline-none"
                    style={{ caretColor: "#00D4FF" }}
                  />
                </div>
              </div>
              {/* Results */}
              {filterDubai(toQuery).map((loc, i) => (
                <motion.button
                  key={loc.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectLocation("to", loc)}
                  className="w-full flex items-center gap-3 px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)" }}
                  >
                    <IoLocationSharp size={14} style={{ color: "#00D4FF" }} />
                  </div>
                  <div className="text-left">
                    <p className="font-inter font-medium text-[14px] text-white">
                      {loc.name}
                    </p>
                    <p
                      className="font-inter text-[11px]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {loc.dock}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="relative z-10 px-4 mt-4"
      >
        <Button
          label="Find Sky Ride"
          onClick={handleFindRide}
          disabled={!from || !to}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative z-10 px-4 mt-6"
      >
        <p
          className="font-inter text-[11px] uppercase tracking-[2.5px] mb-3"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Popular Sky Docks
        </p>
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {dubaiLocations.slice(0, 7).map((loc, i) => {
            const isActive = to?.id === loc.id;
            return (
              <motion.button
                key={loc.id}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setTo(loc)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl"
                style={{
                  background: isActive
                    ? "rgba(0,212,255,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid rgba(0,212,255,0.4)"
                    : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <IoLocationSharp
                  size={12}
                  style={{
                    color: isActive ? "#00D4FF" : "rgba(255,255,255,0.3)",
                  }}
                />
                <span
                  className="font-inter text-[12px] whitespace-nowrap"
                  style={{
                    color: isActive ? "#00D4FF" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {loc.zone}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div className="h-28" />
    </div>
  );
};

export default Home;
