import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoTrashOutline,
  IoWalletOutline,
  IoCloseOutline,
  IoWarningOutline,
} from "react-icons/io5";

/**
 * NolCardActions
 * ─────────────────────────────────────────────────────────
 * Bottom sheet — appears on long press of a Nol Card.
 * Options: Top Up (navigates to TopUpScreen) + Delete card
 *
 * Props:
 *   card        object    the card that was long pressed
 *   onClose     fn        close the sheet
 *   onDelete    fn(card)  delete this card from App state
 *   navigate    fn        App navigate function
 */
export default function NolCardActions({ card, onClose, onDelete, navigate }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!card) return null;

  const handleTopUp = () => {
    onClose();
    navigate("topUp", { topUpCard: card });
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(card);
    onClose();
  };

  const handleClose = () => {
    setConfirmDelete(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex left-1/2 -translate-x-1/2 flex-col justify-end w-full ">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="absolute inset-0 "
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        />

        {/* Sheet */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative z-10 rounded-t-3xl overflow-hidden pb-32 mx-4 "
          style={{
            background: "#0D1626",
            border: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "none",
          }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div
              className="w-10 h-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            />
          </div>

          {/* Card info */}
          <div
            className="px-5 pt-3 pb-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-inter text-[11px] uppercase tracking-[2px] mb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Card Options
            </p>
            <p className="font-syne font-bold text-[18px] text-white">
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
          <div className="px-4 pt-4 flex flex-col gap-3">
            {/* Top Up */}
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
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.12)" }}
              >
                <IoWalletOutline size={24} style={{ color: "#00D4FF" }} />
              </div>
              <div className="text-left flex-1">
                <p className="font-syne font-semibold text-[15px] text-white mb-0.5">
                  Top Up Card
                </p>
                <p
                  className="font-inter text-[12px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Add balance using card or wallet
                </p>
              </div>
              <span
                className="font-inter text-[18px]"
                style={{ color: "rgba(0,212,255,0.5)" }}
              >
                →
              </span>
            </motion.button>

            {/* Delete */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleDelete}
              animate={{
                background: confirmDelete
                  ? "rgba(255,69,96,0.12)"
                  : "rgba(255,69,96,0.05)",
              }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl"
              style={{
                border: confirmDelete
                  ? "1.5px solid rgba(255,69,96,0.5)"
                  : "1px solid rgba(255,69,96,0.2)",
                transition: "border 0.2s ease",
              }}
            >
              {/* Icon */}
              <motion.div
                animate={{
                  background: confirmDelete
                    ? "rgba(255,69,96,0.2)"
                    : "rgba(255,69,96,0.1)",
                }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  {confirmDelete ? (
                    <motion.div
                      key="warn"
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IoWarningOutline
                        size={24}
                        style={{ color: "#FF4560" }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="trash"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <IoTrashOutline size={24} style={{ color: "#FF4560" }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Label */}
              <div className="text-left flex-1">
                <AnimatePresence mode="wait">
                  {confirmDelete ? (
                    <motion.div
                      key="confirm-text"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      <p
                        className="font-syne font-semibold text-[15px] mb-0.5"
                        style={{ color: "#FF4560" }}
                      >
                        Tap again to confirm
                      </p>
                      <p
                        className="font-inter text-[12px]"
                        style={{ color: "rgba(255,69,96,0.6)" }}
                      >
                        This action cannot be undone
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="delete-text"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      <p
                        className="font-syne font-semibold text-[15px] mb-0.5"
                        style={{ color: "#FF4560" }}
                      >
                        Delete Card
                      </p>
                      <p
                        className="font-inter text-[12px]"
                        style={{ color: "rgba(255,69,96,0.5)" }}
                      >
                        Remove from your wallet
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>

            {/* Cancel */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleClose}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <IoCloseOutline
                size={18}
                style={{ color: "rgba(255,255,255,0.45)" }}
              />
              <span
                className="font-inter text-[14px]"
                style={{ color: "rgba(255,255,255,0.45)" }}
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
