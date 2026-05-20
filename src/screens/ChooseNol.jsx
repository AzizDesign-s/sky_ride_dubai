import { useState } from "react";
import { motion } from "framer-motion";
import { IoAddOutline } from "react-icons/io5";

import BackdropHero from "../components/BackdropHero";
import PageHeader from "../components/PageHeader";
import NolCard from "../components/NolCard";
import Button from "../components/Button";

export default function ChooseNolCardScreen({ navigate, rideData, cards }) {
  // Pre-select default card
  const defaultCard = cards.find((c) => c.isDefault) || cards[0];
  const [selectedCard, setSelectedCard] = useState(defaultCard);

  const handleContinue = () => {
    if (!selectedCard) return;
    navigate("confirmRide", { selectedNolCard: selectedCard });
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 1. Backdrop */}
      <BackdropHero />

      {/* 2. Header */}
      <div className="relative z-10">
        <PageHeader
          title="Choose Nol Card"
          subtitle="Step 2 of 3"
          onBack={() => navigate("findRide")}
        />
      </div>

      {/* 4. Nol card list */}
      <div className="relative z-10 flex flex-col mt-4 gap-4 px-4 pb-10">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <NolCard
              card={card}
              isSelected={selectedCard?.id === card.id}
              onSelect={setSelectedCard}
            />

            {/* Insufficient balance warning */}
            {selectedCard?.id === card.id &&
              card.balance < (rideData?.selectedRoute?.price || 0) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 px-1 font-inter text-[12px]"
                  style={{ color: "#FF4560" }}
                >
                  ⚠️ Insufficient balance for this ride
                </motion.p>
              )}
          </motion.div>
        ))}
      </div>

      {/* 6. Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className=" z-10 px-4 mt-3 pb-10 flex flex-col gap-3 "
      >
        <Button
          label="Add New Nol Card"
          variant="secondary"
          icon={<IoAddOutline size={20} />}
          iconPosition="left"
          onClick={() => navigate("addCard")}
        />
        <Button
          label="Continue to Confirm"
          variant="primary"
          disabled={!selectedCard}
          onClick={handleContinue}
        />

        {/* Payment note */}
        <div className="flex items-start gap-2 mt-4 px-1">
          <span className="text-[14px] mt-0.5">🔒</span>
          <p
            className="font-inter text-[11px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Your Nol Card will only be charged after your ride is complete. No
            upfront deduction.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
