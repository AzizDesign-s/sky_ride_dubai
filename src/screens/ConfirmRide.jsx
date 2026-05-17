import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoLocationSharp,
  IoTimeOutline,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";

import DubaiRouteMap from "../components/DubaiRouteMap";
import PageHeader from "../components/PageHeader";
import NolCard from "../components/NolCard";
import Button from "../components/Button";

// ─── Helpers ──────────────────────────────────────────────

// Small detail row — label on left, value on right
function DetailRow({ label, value, valueColor, icon }) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-2">
        {icon && <span style={{ color: "rgba(0,212,255,0.6)" }}>{icon}</span>}
        <span
          className="font-inter text-[13px]"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {label}
        </span>
      </div>
      <span
        className="font-syne font-semibold text-[14px]"
        style={{ color: valueColor || "white" }}
      >
        {value}
      </span>
    </div>
  );
}

// Section wrapper with glass card
function Section({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden px-4 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </div>
  );
}

// Section title
function SectionLabel({ label }) {
  return (
    <p
      className="font-inter text-[11px] uppercase tracking-[2px] mb-3"
      style={{ color: "rgba(255,255,255,0.3)" }}
    >
      {label}
    </p>
  );
}

// ─── Confirm Ride Screen ───────────────────────────────────

export default function ConfirmRide({ navigate, rideData }) {
  const [confirming, setConfirming] = useState(false);

  const { from, to, selectedRoute, selectedNolCard } = rideData || {};

  // Fare breakdown
  const baseFare = selectedRoute?.price || 0;
  const serviceFee = parseFloat((baseFare * 0.05).toFixed(2));
  const totalFare = parseFloat((baseFare + serviceFee).toFixed(2));

  const handleConfirm = () => {
    setConfirming(true);
    // Simulate booking delay then go to boarding pass
    setTimeout(() => navigate("boarding", { totalFare }), 1500);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 2. Header */}
      <div className="relative z-10">
        <PageHeader
          title="Confirm Your Ride"
          subtitle="Step 3 of 3"
          onBack={() => navigate("chooseCard")}
        />
      </div>

      {/* 3. Map — compact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative z-10 overflow-hidden px-4"
      >
        <div className="mt-4">
          <DubaiRouteMap from={from} to={to} />
        </div>
      </motion.div>

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col gap-4 px-4 mt-4 pb-6 overflow-y-auto">
        {/* 4. Route section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionLabel label="Your Route" />
          <Section>
            {/* From */}
            <div
              className="flex items-center gap-3 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full border-2"
                  style={{ borderColor: "#00D4FF" }}
                />
              </div>
              <div>
                <p
                  className="font-inter text-[10px] uppercase tracking-[1.5px] mb-0.5"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Pickup
                </p>
                <p className="font-syne font-semibold text-[14px] text-white">
                  {from?.name || "—"}
                </p>
                <p
                  className="font-inter text-[11px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {from?.dock || "—"}
                </p>
              </div>
            </div>

            {/* To */}
            <div className="flex items-center gap-3 py-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,255,136,0.1)",
                  border: "1px solid rgba(0,255,136,0.2)",
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-sm rotate-45"
                  style={{ background: "#00FF88" }}
                />
              </div>
              <div>
                <p
                  className="font-inter text-[10px] uppercase tracking-[1.5px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Drop-off
                </p>
                <p className="font-syne font-semibold text-[14px] text-white">
                  {to?.name || "—"}
                </p>
                <p
                  className="font-inter text-[11px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {to?.dock || "—"}
                </p>
              </div>
            </div>
          </Section>
        </motion.div>

        {/* 5. Ride details section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionLabel label="Ride Details" />
          <Section>
            <DetailRow
              icon={<MdFlightTakeoff size={15} />}
              label="Ride Type"
              value={selectedRoute?.name || "—"}
            />
            <DetailRow
              icon={<IoTimeOutline size={15} />}
              label="ETA"
              value={selectedRoute?.eta || "—"}
            />
            <DetailRow
              icon={<IoPersonOutline size={15} />}
              label="Passengers"
              value={`${selectedRoute?.passengers || "—"} seats`}
            />
            <DetailRow
              icon={<IoLocationSharp size={15} />}
              label="Distance"
              value={selectedRoute?.distance || "—"}
            />
          </Section>
        </motion.div>

        {/* 6. Fare breakdown section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionLabel label="Fare Breakdown" />
          <Section>
            <DetailRow label="Base Fare" value={`AED ${baseFare.toFixed(2)}`} />
            <DetailRow
              label="Service Fee"
              value={`AED ${serviceFee.toFixed(2)}`}
            />
            {/* Total */}
            <div className="flex items-center justify-between pt-3 pb-1">
              <span className="font-syne font-bold text-[15px] text-white">
                Total
              </span>
              <span
                className="font-syne font-bold text-[20px]"
                style={{ color: "#00D4FF" }}
              >
                AED {totalFare.toFixed(2)}
              </span>
            </div>
          </Section>
        </motion.div>

        {/* 7. Payment — Nol card compact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SectionLabel label="Payment Method" />
          {selectedNolCard ? (
            <NolCard card={selectedNolCard} compact={true} />
          ) : (
            <p
              className="font-inter text-[13px]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              No card selected
            </p>
          )}

          {/* Balance after deduction */}
          {selectedNolCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between mt-2 px-1"
            >
              <span
                className="font-inter text-[12px]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Balance after ride
              </span>
              <span
                className="font-syne font-semibold text-[13px]"
                style={{
                  color:
                    selectedNolCard.balance - totalFare >= 0
                      ? "#00FF88"
                      : "#FF4560",
                }}
              >
                AED {(selectedNolCard.balance - totalFare).toFixed(2)}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* 8. Auto deduction notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-start gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(0,212,255,0.05)",
            border: "1px solid rgba(0,212,255,0.12)",
          }}
        >
          <IoShieldCheckmarkOutline
            size={18}
            style={{ color: "#00D4FF", flexShrink: 0, marginTop: 1 }}
          />
          <p
            className="font-inter text-[12px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Fare will be automatically deducted from your Nol Card ending in{" "}
            <span className="text-white font-medium">
              {selectedNolCard?.last4 || "····"}
            </span>{" "}
            after ride completion.
          </p>
        </motion.div>
      </div>

      {/* 9. Confirm button — fixed bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className=" px-4 w-full  my-4  pb-5"
      >
        <Button
          label={confirming ? "Confirming Ride..." : "Confirm Ride"}
          onClick={handleConfirm}
          disabled={confirming || !selectedNolCard || !selectedRoute}
        />
      </motion.div>
    </div>
  );
}
