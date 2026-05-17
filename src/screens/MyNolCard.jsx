import { useState } from "react";
import { motion } from "framer-motion";
import { IoAddOutline } from "react-icons/io5";

import BackdropHero from "../components/BackdropHero";
import NolCard from "../components/NolCard";
import Button from "../components/Button";
import { currentUser } from "../data/mockData";

export default function MyNolCardsScreen({
  navigate,
  cards,
  updateDefaultCard,
}) {
  const handleSetDefault = (selectedCard) => {
    setCards((prev) =>
      prev.map((c) => ({ ...c, isDefault: c.id === selectedCard.id })),
    );
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 1. Backdrop */}
      <BackdropHero height={180} />

      {/* 2. Top section — title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 px-5 pt-14 pb-2"
      >
        <p
          className="font-inter text-[12px] uppercase tracking-[2.5px] mb-1"
          style={{ color: "rgba(0,212,255,0.6)" }}
        >
          My Wallet
        </p>
        <h1 className="font-syne font-extrabold text-[26px] text-white leading-tight">
          Nol Cards
        </h1>
        <p
          className="font-inter text-[13px] mt-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {cards.length} card{cards.length !== 1 ? "s" : ""} saved ·{" "}
          {currentUser.name}
        </p>
      </motion.div>

      {/* 3. Cards list */}
      <div className="relative z-10 flex flex-col gap-4 px-4 mt-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            {/* Nol Card */}
            <NolCard
              card={card}
              isSelected={card.isDefault}
              onSelect={updateDefaultCard}
            />

            {/* Card actions row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center justify-between mt-2 px-1"
            >
              {/* Default badge or set default button */}
              {card.isDefault ? (
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.2)",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#00FF88" }}
                  />
                  <span
                    className="font-inter text-[11px] font-medium"
                    style={{ color: "#00FF88" }}
                  >
                    Default Card
                  </span>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateDefaultCard(card)}
                  className="px-3 py-1 rounded-full font-inter text-[11px]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  Set as Default
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 4. Add new card button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="relative z-10 px-4 mt-6"
      >
        <Button
          label="Add New Nol Card"
          variant="secondary"
          icon={<IoAddOutline size={20} />}
          iconPosition="left"
          onClick={() => navigate("addCard")}
        />
      </motion.div>

      {/* 5. Info note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="relative z-10 text-center font-inter text-[11px] mt-4 px-6"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        Tap a card to set it as default · Default card is used for all rides
      </motion.p>

      {/* Bottom nav spacer */}
      <div className="h-32" />
    </div>
  );
}
