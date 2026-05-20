import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoAddOutline } from "react-icons/io5";

import BackdropHero from "../components/BackdropHero";
import NolCard from "../components/NolCard";
import NolCardActions from "../components/NolCardAction";
import Button from "../components/Button";
import PageTopBar from "../components/PageTopBar";
import SearchBar from "../components/SearchBar";
import { currentUser } from "../data/mockData";

const LONG_PRESS_MS = 550;

export default function MyNolCardsScreen({
  navigate,
  cards,
  updateDefaultCard,
  deleteCard,
}) {
  const [activeCard, setActiveCard] = useState(null);
  const longPressTimer = useRef(null);

  // ── Long press ───────────────────────────────────────────

  const startPress = (card) => {
    longPressTimer.current = setTimeout(() => {
      setActiveCard(card);
    }, LONG_PRESS_MS);
  };

  const cancelPress = () => {
    clearTimeout(longPressTimer.current);
  };

  // Short tap — set as default
  const handleTap = (card) => {
    clearTimeout(longPressTimer.current);
    updateDefaultCard(card);
  };

  // Delete — called from NolCardActions
  const handleDelete = (card) => {
    deleteCard(card);
    setActiveCard(null);
  };

  // ── Render ───────────────────────────────────────────────

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 1. Backdrop */}
      <BackdropHero height={180} />

      {/* 2. Page top bar */}
      <div className="relative z-10">
        <PageTopBar
          eyebrow="My Wallet"
          title="Nol Cards"
          text="Tap to set default · Hold for more options"
          subtitle={`${(cards || []).length} card${(cards || []).length !== 1 ? "s" : ""} · ${currentUser.name}`}
        />
      </div>

      {/* 3. Cards list */}
      <div className="relative z-10 flex flex-col gap-4 px-4 mt-4">
        <AnimatePresence>
          {(cards || []).map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
            >
              {/* Long press wrapper */}
              <div
                onMouseDown={() => startPress(card)}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
                onTouchStart={() => startPress(card)}
                onTouchEnd={cancelPress}
                onTouchMove={cancelPress}
                onClick={() => handleTap(card)}
                className="cursor-pointer select-none"
              >
                <NolCard
                  card={card}
                  isSelected={card.isDefault}
                  onSelect={null}
                />
              </div>

              {/* Below card — default badge + balance */}
              <div className="flex items-center justify-between mt-2 px-1">
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

                <div className="text-right">
                  <p
                    className="font-inter text-[10px] uppercase tracking-[1.5px]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Balance
                  </p>
                  <p className="font-syne font-bold text-[15px] text-white">
                    AED {card.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state */}
        {(cards || []).length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-3"
          >
            <p className="font-syne font-bold text-[18px] text-white">
              No cards yet
            </p>
            <p
              className="font-inter text-[13px]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Add your first Nol Card to get started
            </p>
          </motion.div>
        )}
      </div>

      {/* 4. Add new card button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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

      <p
        className="relative z-10 text-center font-inter text-[11px] mt-4 px-6"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Tap to set default · Hold for more options
      </p>

      {/* Bottom nav spacer */}
      <div className="h-32" />

      {/* 5. NolCardActions bottom sheet */}
      {activeCard && (
        <NolCardActions
          card={activeCard}
          onClose={() => setActiveCard(null)}
          onDelete={handleDelete}
          navigate={navigate}
        />
      )}
    </div>
  );
}
