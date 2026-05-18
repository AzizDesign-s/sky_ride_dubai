import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoCardOutline,
  IoWalletOutline,
} from "react-icons/io5";

import BackdropHero from "../components/BackdropHero";
import NolCard from "../components/NolCard";
import Button from "../components/Button";

export default function CardSuccessScreen({ navigate, rideData }) {
  const newCard = rideData?.newCard;

  // Animate checkmark on mount
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowCard(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 1. Backdrop */}
      <BackdropHero height={200} />

      {/* 2. Content — centered */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-20 pb-10">
        {/* 3. Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: 0.1,
          }}
          className="relative mb-6"
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              background: "rgba(0,255,136,0.15)",
              filter: "blur(8px)",
            }}
          />

          {/* Icon circle */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,255,136,0.1)",
              border: "2px solid rgba(0,255,136,0.4)",
              boxShadow: "0 0 32px rgba(0,255,136,0.25)",
            }}
          >
            <IoCheckmarkCircle size={52} style={{ color: "#00FF88" }} />
          </div>
        </motion.div>

        {/* 4. Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-2"
        >
          <h1 className="font-syne font-extrabold text-[26px] text-white mb-2 leading-tight">
            Card Added
          </h1>
          <p
            className="font-inter text-[14px]"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Your Nol Card has been saved to your wallet successfully
          </p>
        </motion.div>

        {/* 5. New card preview */}
        {newCard && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{
              opacity: showCard ? 1 : 0,
              y: showCard ? 0 : 24,
              scale: showCard ? 1 : 0.94,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full mt-6 mb-2"
          >
            <NolCard card={newCard} />
          </motion.div>
        )}

        {/* 6. Card details summary */}
        {newCard && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full mt-4 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Card type row */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-2">
                <IoCardOutline
                  size={15}
                  style={{ color: "rgba(0,212,255,0.6)" }}
                />
                <span
                  className="font-inter text-[13px]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Card Type
                </span>
              </div>
              <span className="font-syne font-semibold text-[14px] text-white">
                {newCard.type}
              </span>
            </div>

            {/* Card number row */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-2">
                <IoCardOutline
                  size={15}
                  style={{ color: "rgba(0,212,255,0.6)" }}
                />
                <span
                  className="font-inter text-[13px]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Card Number
                </span>
              </div>
              <span className="font-inter font-medium text-[13px] text-white tracking-wider">
                •••• {newCard.last4}
              </span>
            </div>

            {/* Wallet row */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <IoWalletOutline
                  size={15}
                  style={{ color: "rgba(0,212,255,0.6)" }}
                />
                <span
                  className="font-inter text-[13px]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Saved To
                </span>
              </div>
              <span
                className="font-syne font-semibold text-[14px]"
                style={{ color: "#00D4FF" }}
              >
                My Nol Wallet
              </span>
            </div>
          </motion.div>
        )}

        {/* 7. Default card notice */}
        {newCard?.isDefault && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="w-full flex items-center gap-2 px-4 py-3 mt-3 rounded-2xl"
            style={{
              background: "rgba(0,255,136,0.06)",
              border: "1px solid rgba(0,255,136,0.15)",
            }}
          >
            <span style={{ color: "#00FF88" }}>✓</span>
            <p
              className="font-inter text-[12px]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              This card has been set as your{" "}
              <span className="text-white font-medium">
                default payment card
              </span>
            </p>
          </motion.div>
        )}

        {/* 8. Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full flex flex-col gap-3 mt-6"
        >
          {/* Primary — go to my cards */}
          <Button
            label="View My Nol Cards"
            onClick={() => navigate("myCards")}
          />

          {/* Secondary — back to home */}
          <Button
            label="Back to Home"
            variant="ghost"
            onClick={() => navigate("home")}
          />
        </motion.div>
      </div>
    </div>
  );
}
