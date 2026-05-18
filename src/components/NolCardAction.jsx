import { motion, AnimatePresence } from "framer-motion";
import {
  IoTrashOutline,
  IoWalletOutline,
  IoCloseOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { useState } from "react";

/**
 * NolCardActions
 * ─────────────────────────────────────────────────────────
 * Bottom sheet that appears on long press of a Nol Card.
 * Shows Delete + Top Up options.
 *
 * Props:
 *   card        object    the card that was long pressed
 *   onClose     fn        close the sheet
 *   onDelete    fn(card)  delete this card
 *   onTopUp     fn(card)  top up (future)
 */
export default function NolCardActions({
  navigate,
  card,
  onClose,
  onDelete,
  topUpCard,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!card) return null;

  const handleDelete = () => {
    if (!confirmDelete) {
      // First tap — show confirm state
      setConfirmDelete(true);
      return;
    }
    // Second tap — actually delete
    onDelete(card);
    onClose();
  };

  // To this:
  const handleTopUp = (card) => {
    setActiveCard(null);
    navigate("topUp", { topUpCard: card }); // ← passes card to TopUp screen
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col justify-end w-full"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 w-full"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        />

        {/* Bottom sheet */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative z-10 rounded-t-3xl overflow-hidden pb-32 mx-4"
          style={{
            background: "#0D1626",
            border: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "none",
          }}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div
              className="w-10 h-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            />
          </div>

          {/* Card info */}
          <div
            className="px-5 pt-2 pb-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-inter text-[11px] uppercase tracking-[2px] mb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Card Options
            </p>
            <p className="font-syne font-bold text-[17px] text-white">
              {card.type} Card
            </p>
            <p
              className="font-inter text-[13px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              •••• {card.last4} · AED {card.balance.toFixed(2)}
            </p>
          </div>

          {/* Actions */}
          <div className="px-4 pt-3 flex flex-col gap-2">
            {/* Top Up — future */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleTopUp}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl"
              style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.12)" }}
              >
                <IoWalletOutline size={22} style={{ color: "#00D4FF" }} />
              </div>
              <div className="text-left">
                <p className="font-syne font-semibold text-[15px] text-white">
                  Top Up Card
                </p>
                <p
                  className="font-inter text-[12px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Add balance · Coming soon
                </p>
              </div>
              <span
                className="ml-auto px-2.5 py-1 rounded-full font-inter text-[10px]"
                style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800" }}
              >
                Soon
              </span>
            </motion.button>

            {/* Delete card */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleDelete}
              animate={{
                background: confirmDelete
                  ? "rgba(255,69,96,0.15)"
                  : "rgba(255,69,96,0.06)",
                borderColor: confirmDelete
                  ? "rgba(255,69,96,0.5)"
                  : "rgba(255,69,96,0.2)",
              }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl border"
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: confirmDelete
                    ? "rgba(255,69,96,0.2)"
                    : "rgba(255,69,96,0.1)",
                }}
              >
                {confirmDelete ? (
                  <IoWarningOutline size={22} style={{ color: "#FF4560" }} />
                ) : (
                  <IoTrashOutline size={22} style={{ color: "#FF4560" }} />
                )}
              </div>
              <div className="text-left">
                <p
                  className="font-syne font-semibold text-[15px]"
                  style={{ color: "#FF4560" }}
                >
                  {confirmDelete ? "Tap again to confirm" : "Delete Card"}
                </p>
                <p
                  className="font-inter text-[12px]"
                  style={{ color: "rgba(255,69,96,0.6)" }}
                >
                  {confirmDelete
                    ? "This cannot be undone"
                    : "Remove this card from your wallet"}
                </p>
              </div>
            </motion.button>

            {/* Cancel */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-4 mt-1 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <IoCloseOutline
                size={18}
                style={{ color: "rgba(255,255,255,0.5)" }}
              />
              <span
                className="font-inter text-[14px]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Cancel
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
