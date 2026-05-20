import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoLocationSharp,
  IoTimeOutline,
  IoCardOutline,
  IoShareOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";

import PageHeader from "../components/PageHeader";
import BoardingQR from "../components/BoardingQR";
import NolCard from "../components/NolCard";
import Button from "../components/Button";

// ─── Helpers ──────────────────────────────────────────────

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

// Tear line divider — reused from boarding pass
function TearLine() {
  return (
    <div className="flex items-center px-4 py-0">
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

// Info row inside pass
function PassRow({ icon, label, value, valueColor }) {
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
      <span
        className="font-inter font-medium text-[13px] text-right max-w-[180px] truncate"
        style={{ color: valueColor || "white" }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Trip Detail Screen ───────────────────────────────────

export default function TripDetails({
  navigate,
  rideData,
  cards,
  payTrip,
  addTransaction,
}) {
  const trip = rideData?.selectedTrip;

  // Find the card used for this trip from live cards state
  const tripCard =
    cards?.find((c) => c.id === trip?.card?.id) ||
    cards?.find((c) => c.last4 === trip?.card?.last4) ||
    null;

  const isPaid = trip?.status === "completed";
  const totalFare = trip?.totalFare || 0;

  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(isPaid);

  // Build QR payload from trip data
  const qrPayload = JSON.stringify({
    tripId: trip?.tripId,
    cardId: trip?.card?.id,
    cardLast4: trip?.card?.last4,
    cardType: trip?.card?.type,
    from: trip?.from?.name,
    to: trip?.to?.name,
    ride: trip?.route?.name,
    fare: `AED ${totalFare.toFixed(2)}`,
    access: "SKYRIDE_BOARDING_V1",
  });

  // ── Pay Now ─────────────────────────────────────────────
  const handlePayNow = () => {
    if (!tripCard || tripCard.balance < totalFare) return;

    setPaying(true);

    setTimeout(() => {
      // 1. Deduct fare from card balance
      // 2. Mark trip as completed
      // 3. Save transaction to history
      payTrip({
        tripId: trip?.tripId,
        cardId: tripCard?.id,
        amount: totalFare,
        transaction: {
          id: `TXN-${Date.now()}`,
          type: "ride_payment",
          cardId: tripCard?.id,
          cardLast4: tripCard?.last4,
          cardType: tripCard?.type,
          amount: totalFare,
          paymentMethod: "Nol Card",
          tripId: trip?.tripId,
          status: "success",
          timestamp: new Date().toISOString(),
        },
      });

      setPaying(false);
      setPaid(true);
    }, 1800);
  };

  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-bg">
        <p className="font-inter text-sky-muted">Trip not found</p>
      </div>
    );
  }

  const insufficientBalance = tripCard && tripCard.balance < totalFare;

  // ── Render ───────────────────────────────────────────────

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 2. Header */}
      <div className="relative z-10">
        <PageHeader
          title="Trip Details"
          subtitle={paid ? "Completed" : "Pending Payment"}
          onBack={() => navigate("myTrips")}
          right={
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <IoShareOutline size={18} color="white" />
            </motion.button>
          }
        />
      </div>

      {/* 3. Status badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 flex items-center justify-center gap-2 mx-4 mb-4 py-2.5 rounded-2xl"
        style={{
          background: paid ? "rgba(0,255,136,0.08)" : "rgba(255,184,0,0.08)",
          border: paid
            ? "1px solid rgba(0,255,136,0.2)"
            : "1px solid rgba(255,184,0,0.2)",
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: paid ? "#00FF88" : "#FFB800" }}
        />
        <span
          className="font-syne font-semibold text-[13px]"
          style={{ color: paid ? "#00FF88" : "#FFB800" }}
        >
          {paid ? "Fare Collected · Trip Completed" : "Awaiting Payment"}
        </span>
      </motion.div>

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col gap-4 px-4 pb-10 overflow-y-auto">
        {/* 4. Main boarding pass card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(13,22,38,0.96)",
            border: "1px solid rgba(0,212,255,0.15)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* ── Pass top — From → To ── */}
          <div
            className="px-5 pt-5 pb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, transparent 60%)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              {/* From */}
              <div className="flex-1">
                <p
                  className="font-inter text-[10px] uppercase tracking-[2px] mb-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  From
                </p>
                <p className="font-syne font-bold text-[16px] text-white">
                  {trip.from?.zone || "—"}
                </p>
                <p
                  className="font-inter text-[11px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {trip.from?.dock || "—"}
                </p>
              </div>

              {/* Center */}
              <div className="flex flex-col items-center px-3">
                <MdFlightTakeoff size={20} style={{ color: "#00D4FF" }} />
                <div
                  className="h-px w-14 mt-1"
                  style={{ background: "rgba(0,212,255,0.3)" }}
                />
              </div>

              {/* To */}
              <div className="flex-1 text-right">
                <p
                  className="font-inter text-[10px] uppercase tracking-[2px] mb-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  To
                </p>
                <p className="font-syne font-bold text-[16px] text-white">
                  {trip.to?.zone || "—"}
                </p>
                <p
                  className="font-inter text-[11px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {trip.to?.dock || "—"}
                </p>
              </div>
            </div>

            {/* Date + Trip ID row */}
            <div
              className="flex items-center justify-between px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              <div className="flex items-center gap-2">
                <IoTimeOutline size={13} style={{ color: "#00D4FF" }} />
                <span
                  className="font-inter text-[12px]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {formatDate(trip.timestamp)}
                </span>
              </div>
            </div>
          </div>

          {/* Tear line */}
          <TearLine />

          {/* ── Pass middle — trip info ── */}
          <div className="px-5 py-3">
            <PassRow
              icon={<MdFlightTakeoff size={14} />}
              label="Ride Type"
              value={trip.route?.name || "—"}
            />
            <PassRow
              icon={<IoLocationSharp size={14} />}
              label="Pickup Dock"
              value={trip.from?.dock || "—"}
            />
            <PassRow
              icon={<IoLocationSharp size={14} />}
              label="Drop-off Dock"
              value={trip.to?.dock || "—"}
            />
            <PassRow
              icon={<IoCardOutline size={14} />}
              label="Nol Card"
              value={`${trip.card?.type} ···· ${trip.card?.last4}`}
            />
            <PassRow
              icon={<IoWalletOutline size={14} />}
              label="Fare"
              value={`AED ${totalFare.toFixed(2)}`}
              valueColor="#00D4FF"
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
                {trip.tripId}
              </span>
            </div>
          </div>

          {/* Tear line */}
          <TearLine />

          {/* ── Pass bottom — QR / Nol Tap ── */}
          <div className="px-5 pt-4 pb-5">
            <BoardingQR
              qrPayload={qrPayload}
              selectedNolCard={tripCard || trip.card}
            />
          </div>
        </motion.div>

        {/* 5. Nol Card — live balance */}
        {tripCard && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <p
              className="font-inter text-[11px] uppercase tracking-[2px] mb-3"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Payment Card
            </p>
            <NolCard card={tripCard} compact={true} />

            {/* Balance after deduction */}
            {!paid && (
              <div className="flex items-center justify-between mt-2 px-1">
                <span
                  className="font-inter text-[12px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Balance after payment
                </span>
                <span
                  className="font-syne font-semibold text-[13px]"
                  style={{
                    color: insufficientBalance ? "#FF4560" : "#00FF88",
                  }}
                >
                  AED {(tripCard.balance - totalFare).toFixed(2)}
                </span>
              </div>
            )}

            {/* Insufficient balance warning */}
            {insufficientBalance && !paid && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mt-3 px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(255,69,96,0.08)",
                  border: "1px solid rgba(255,69,96,0.2)",
                }}
              >
                <span>⚠️</span>
                <p
                  className="font-inter text-[12px]"
                  style={{ color: "rgba(255,69,96,0.9)" }}
                >
                  Insufficient balance. Please top up your card first.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* 6. Payment success state */}
        <AnimatePresence>
          {paid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 px-4 py-4 rounded-2xl"
              style={{
                background: "rgba(0,255,136,0.07)",
                border: "1px solid rgba(0,255,136,0.2)",
              }}
            >
              <IoCheckmarkCircle
                size={22}
                style={{ color: "#00FF88", flexShrink: 0 }}
              />
              <div>
                <p
                  className="font-syne font-semibold text-[14px]"
                  style={{ color: "#00FF88" }}
                >
                  Fare Deducted Successfully
                </p>
                <p
                  className="font-inter text-[12px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  AED {totalFare.toFixed(2)} deducted from card ending{" "}
                  {trip.card?.last4}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Fixed bottom — Pay Now or Paid ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className=" z-50  w-full px-4 pb-14 pt-9 "
        style={{
          background:
            "linear-gradient(to top, rgba(5,10,20,1) 70%, transparent)",
        }}
      >
        <AnimatePresence mode="wait">
          {/* Not paid yet */}
          {!paid && (
            <motion.div
              key="pay"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button
                className="w-full"
                label={
                  paying
                    ? "Processing Payment..."
                    : `Pay Now · AED ${totalFare.toFixed(2)}`
                }
                onClick={handlePayNow}
                disabled={paying || insufficientBalance}
              />

              {/* Top up shortcut */}
              {insufficientBalance && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("topUp", { topUpCard: tripCard })}
                  className="w-full mt-3 py-3 rounded-2xl font-inter text-[13px]"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    color: "#00D4FF",
                  }}
                >
                  Top Up Card First →
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Already paid */}
          {paid && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 w-full "
            >
              <Button
                label="Back to My Trips"
                onClick={() => navigate("myTrips")}
              />
              <Button
                label="Back to Home"
                variant="ghost"
                onClick={() => navigate("home")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
