import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoLocationSharp,
  IoTimeOutline,
  IoCardOutline,
  IoShareOutline,
} from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";

import BoardingQR from "../components/BoardingQR";

// ─── Trip ID generator ────────────────────────────────────

function generateTripId(from, card) {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const zone = (from?.zone || "DXB")
    .replace(/\s/g, "")
    .toUpperCase()
    .slice(0, 3);
  const last4 = card?.last4 || "0000";
  const random = Math.floor(Math.random() * 900 + 100);
  return `SKYRIDE-${zone}-${date}-${last4}-${random}`;
}

// ─── QR Payload generator ─────────────────────────────────
// Future: this same payload will be stored in trip history

function generateQRPayload({ tripId, card, from, to, route, totalFare }) {
  return JSON.stringify({
    tripId,
    cardId: card?.id,
    cardLast4: card?.last4,
    cardType: card?.type,
    from: from?.name,
    fromDock: from?.dock,
    to: to?.name,
    toDock: to?.dock,
    ride: route?.name,
    fare: `AED ${totalFare?.toFixed(2) || "0.00"}`,
    timestamp: new Date().toISOString(),
    access: "SKYRIDE_BOARDING_V1",
  });
}

// ─── Future: save trip to history ────────────────────────
// When history screen is built, call this function
// and connect to localStorage or your backend

function buildTripRecord({ tripId, from, to, route, card, totalFare }) {
  return {
    tripId,
    from,
    to,
    route,
    card: {
      id: card?.id,
      type: card?.type,
      last4: card?.last4,
    },
    totalFare,
    timestamp: new Date().toISOString(),
    status: "confirmed", // → 'completed' after ride ends
  };
  // TODO: localStorage.setItem(`trip_${tripId}`, JSON.stringify(record))
  // TODO: or POST to your backend API
}

// ─── Countdown timer ─────────────────────────────────────

function useCountdown(minutes = 12) {
  const [seconds, setSeconds] = useState(minutes * 60);
  useEffect(() => {
    const t = setInterval(() => setSeconds((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

// ─── Small helpers ────────────────────────────────────────

function PassRow({ icon, label, value }) {
  return (
    <div
      className="flex items-center justify-between py-2.5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: "rgba(0,212,255,0.55)" }}>{icon}</span>
        <span
          className="font-inter text-[12px]"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {label}
        </span>
      </div>
      <span className="font-inter font-medium text-[13px] text-white text-right max-w-[180px] truncate">
        {value}
      </span>
    </div>
  );
}

function TearLine() {
  return (
    <div className="flex items-center px-4">
      <div
        className="w-5 h-5 rounded-full -ml-9"
        style={{ background: "#050A14" }}
      />
      <div
        className="flex-1 border-t border-dashed mx-2"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      />
      <div
        className="w-5 h-5 rounded-full -mr-9"
        style={{ background: "#050A14" }}
      />
    </div>
  );
}

// ─── Boarding Pass Screen ─────────────────────────────────

export default function BoardingPassScreen({ navigate, rideData, addTrip }) {
  const { from, to, selectedRoute, selectedNolCard, totalFare } =
    rideData || {};

  // Generated once on mount — stable for the lifetime of this screen
  const [boardingData] = useState(() => {
    const id = generateTripId(from, selectedNolCard);

    const payload = generateQRPayload({
      tripId: id,
      card: selectedNolCard,
      from,
      to,
      route: selectedRoute,
      totalFare,
    });

    const record = buildTripRecord({
      tripId: id,
      from,
      to,
      route: selectedRoute,
      card: selectedNolCard,
      totalFare,
    });

    return { tripId: id, qrPayload: payload, tripRecord: record };
  });

  const { tripId, qrPayload, tripRecord } = boardingData;

  const countdown = useCountdown(12);

  const tripSaved = useRef(false);

  useEffect(() => {
    if (tripSaved.current) return; // ← guard against double save
    tripSaved.current = true;
    addTrip?.(tripRecord);
    console.log("Trip saved:", tripRecord);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 3. Trip confirmed badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative z-10 flex items-center justify-center gap-2 mx-4 my-4 py-2.5  rounded-2xl"
        style={{
          background: "rgba(0,255,136,0.08)",
          border: "1px solid rgba(0,255,136,0.2)",
        }}
      >
        <IoCheckmarkCircle size={18} style={{ color: "#00FF88" }} />
        <span
          className="font-syne font-semibold text-[13px]"
          style={{ color: "#00FF88" }}
        >
          Trip Confirmed
        </span>
        <span
          className="font-inter text-[11px]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          · {tripId}
        </span>
      </motion.div>

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col gap-4 px-4 pb-10 overflow-y-auto">
        {/* 4. Main boarding pass card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(13,22,38,0.96)",
            border: "1px solid rgba(0,212,255,0.15)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* ── Pass top — route ── */}
          <div
            className="px-4 pt-5 pb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, transparent 60%)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* From → To */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p
                  className="font-inter text-[10px] uppercase tracking-[2px] mb-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  From
                </p>
                <p className="font-syne font-bold text-[16px] text-white">
                  {from?.zone || "—"}
                </p>
                <p
                  className="font-inter text-[11px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {from?.dock || "—"}
                </p>
              </div>

              <div className="flex flex-col items-center px-3">
                <MdFlightTakeoff size={20} style={{ color: "#00D4FF" }} />
                <div
                  className="h-px w-14 mt-1"
                  style={{ background: "rgba(0,212,255,0.3)" }}
                />
              </div>

              <div className="flex-1 text-right">
                <p
                  className="font-inter text-[10px] uppercase tracking-[2px] mb-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  To
                </p>
                <p className="font-syne font-bold text-[16px] text-white">
                  {to?.zone || "—"}
                </p>
                <p
                  className="font-inter text-[11px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {to?.dock || "—"}
                </p>
              </div>
            </div>

            {/* Departure countdown */}
            <div
              className="flex items-center justify-between px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              <div className="flex items-center gap-2">
                <IoTimeOutline size={14} style={{ color: "#00D4FF" }} />
                <span
                  className="font-inter text-[12px]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Departs in
                </span>
              </div>
              <motion.span
                className="font-syne font-bold text-[18px]"
                style={{ color: "#00D4FF" }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {countdown}
              </motion.span>
            </div>
          </div>

          {/* Tear line */}
          <TearLine />

          {/* ── Pass middle — trip info ── */}
          <div className="px-4 py-3">
            <PassRow
              icon={<MdFlightTakeoff size={14} />}
              label="Ride Type"
              value={selectedRoute?.name || "—"}
            />
            <PassRow
              icon={<IoLocationSharp size={14} />}
              label="Pickup Dock"
              value={from?.dock || "—"}
            />
            <PassRow
              icon={<IoTimeOutline size={14} />}
              label="ETA"
              value={selectedRoute?.eta || "—"}
            />
            <PassRow
              icon={<IoCardOutline size={14} />}
              label="Nol Card"
              value={`${selectedNolCard?.type} ···· ${selectedNolCard?.last4}`}
            />

            {/* Trip ID — no bottom border */}
            <div className="flex items-center justify-between pt-2.5 pb-1">
              <span
                className="font-inter text-[12px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Trip ID
              </span>
              <span
                className="font-inter font-medium text-[11px]"
                style={{ color: "rgba(0,212,255,0.8)", letterSpacing: "0.5px" }}
              >
                {tripId}
              </span>
            </div>
          </div>

          {/* Tear line */}
          <TearLine />

          {/* ── Pass bottom — QR / Nol Tap ── */}
          <div className="px-5 pt-4 pb-5">
            <BoardingQR
              qrPayload={qrPayload}
              selectedNolCard={selectedNolCard}
            />
          </div>
        </motion.div>

        {/* 5. Fare deduction notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(0,212,255,0.05)",
            border: "1px solid rgba(0,212,255,0.1)",
          }}
        >
          <IoCardOutline
            size={16}
            style={{ color: "#00D4FF", flexShrink: 0 }}
          />
          <p
            className="font-inter text-[12px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <span className="text-white font-medium">
              AED {totalFare?.toFixed(2) || "—"}
            </span>{" "}
            will be deducted from Nol Card ending{" "}
            <span className="text-white font-medium">
              {selectedNolCard?.last4}
            </span>{" "}
            after trip completion.
          </p>
        </motion.div>

        {/* 6. Back to home */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => navigate("home")}
            className="w-full py-4 rounded-2xl font-syne font-semibold text-[15px]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
