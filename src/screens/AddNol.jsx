import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCardOutline, IoPersonOutline } from "react-icons/io5";
import { MdNfc } from "react-icons/md";

import PageHeader from "../components/PageHeader";
import InputField from "../components/InputField";
import NfcTapReader from "../components/NfcTapReader";
import NolCard from "../components/NolCard";
import Button from "../components/Button";

// ─── Card number formatter ────────────────────────────────
// Adds space every 4 digits: 7845123156784821 → 7845 1231 5678 4821
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

// ─── Entry mode tab ───────────────────────────────────────
function ModeTab({ label, icon, active, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-syne font-semibold text-[13px]"
      style={{
        background: active ? "rgba(0,212,255,0.12)" : "transparent",
        border: active
          ? "1.5px solid rgba(0,212,255,0.4)"
          : "1.5px solid transparent",
        color: active ? "#00D4FF" : "rgba(255,255,255,0.35)",
        transition: "all 0.2s ease",
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
}

// ─── Add Nol Card Screen ──────────────────────────────────

export default function AddNolCardScreen({
  navigate,
  cards,
  updateDefaultCard,
  addCard,
}) {
  const [mode, setMode] = useState("manual"); // 'manual' | 'nfc'
  const [cardNumber, setCardNumber] = useState("");
  const [nickname, setNickname] = useState("");
  const [cardType, setCardType] = useState("Silver");
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(false);

  // Validate form
  const validate = () => {
    const e = {};
    const digits = cardNumber.replace(/\s/g, "");
    if (digits.length !== 16) e.cardNumber = "Card number must be 16 digits";
    if (!nickname.trim()) e.nickname = "Please enter a nickname for this card";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // NFC detected — auto-fill fields
  const handleNfcRead = ({ number, type }) => {
    setCardNumber(number);
    setCardType(type);
    setNickname(`My ${type} Card`);
    setMode("manual"); // Switch to manual so user can review/edit
    setErrors({});
  };

  // Card number changed — detect card type by first digit
  const handleCardNumber = (val) => {
    setCardNumber(val);
    const digits = val.replace(/\s/g, "");
    if (digits.startsWith("1")) setCardType("Platinum");
    else if (digits.startsWith("3")) setCardType("Gold");
    else setCardType("Silver");
    if (errors.cardNumber) setErrors((p) => ({ ...p, cardNumber: "" }));
  };

  // Build preview card object
  const previewCard = {
    id: `card-preview`,
    number: cardNumber || "0000 0000 0000 0000",
    last4: cardNumber.replace(/\s/g, "").slice(-4) || "0000",
    type: cardType,
    balance: 0.0,
    isDefault: (cards || []).length === 0,
    addedOn: new Date().toLocaleDateString("en-AE"),
    autoTopUp: false,
  };

  const handleSave = () => {
    if (!validate()) return;

    const newCard = {
      id: `card-${Date.now()}`,
      number: cardNumber,
      last4: cardNumber.replace(/\s/g, "").slice(-4),
      type: cardType,
      balance: 0.0,
      status: "Active",
      addedOn: new Date().toLocaleDateString("en-AE"),
      autoTopUp: false,
      isDefault: (cards || []).length === 0,
      nickname: nickname,
    };

    addCard(newCard); // ← saves to App state
    navigate("cardSuccess", { newCard }); // ← passes card to success screen
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 2. Header */}
      <div className="relative z-10">
        <PageHeader title="Add Nol Card" onBack={() => navigate("myCards")} />
      </div>

      <div className="relative z-10 flex flex-col gap-5 px-4 pb-32 overflow-y-auto">
        {/* 3. Mode toggle — Manual / NFC */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 p-1 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <ModeTab
            label="Enter Manually"
            icon={<IoCardOutline size={16} />}
            active={mode === "manual"}
            onClick={() => setMode("manual")}
          />
          <ModeTab
            label="NFC Tap"
            icon={<MdNfc size={16} />}
            active={mode === "nfc"}
            onClick={() => setMode("nfc")}
          />
        </motion.div>

        {/* 4. Mode content */}
        <AnimatePresence mode="wait">
          {/* ── Manual entry ── */}
          {mode === "manual" && (
            <motion.div
              key="manual"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              {/* Card number */}
              <InputField
                label="Card Number"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardNumber}
                icon={<IoCardOutline size={18} />}
                hint="16-digit number on your physical Nol Card"
                error={errors.cardNumber}
                maxLength={19}
                formatter={formatCardNumber}
              />

              {/* Card type selector */}
              <div>
                <p
                  className="font-inter text-[12px] uppercase tracking-[1.5px] mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Card Type
                </p>
                <div className="flex gap-2">
                  {["Silver", "Gold", "Platinum"].map((type) => (
                    <motion.button
                      key={type}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setCardType(type)}
                      className="flex-1 py-2.5 rounded-xl font-syne font-semibold text-[13px]"
                      style={{
                        background:
                          cardType === type
                            ? "rgba(0,212,255,0.12)"
                            : "rgba(255,255,255,0.04)",
                        border:
                          cardType === type
                            ? "1.5px solid rgba(0,212,255,0.45)"
                            : "1px solid rgba(255,255,255,0.08)",
                        color:
                          cardType === type
                            ? "#00D4FF"
                            : "rgba(255,255,255,0.4)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Nickname */}
              <InputField
                label="Card Nickname"
                placeholder="e.g. My Gold Card, Work Card"
                value={nickname}
                onChange={(v) => {
                  setNickname(v);
                  if (errors.nickname)
                    setErrors((p) => ({ ...p, nickname: "" }));
                }}
                icon={<IoPersonOutline size={18} />}
                hint="A name to identify this card in your wallet"
                error={errors.nickname}
                maxLength={30}
              />
            </motion.div>
          )}

          {/* ── NFC tap ── */}
          {mode === "nfc" && (
            <motion.div
              key="nfc"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center py-6"
            >
              <NfcTapReader onCardRead={handleNfcRead} />

              <p
                className="font-inter text-[11px] text-center mt-6 px-4"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                NFC reads your card number and type automatically. You can edit
                the details after scanning.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Card preview toggle */}
        {mode === "manual" && cardNumber.replace(/\s/g, "").length >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setPreview((p) => !p)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl mb-3"
              style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
            >
              <span
                className="font-inter text-[13px]"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {preview ? "Hide" : "Preview"} Card
              </span>
              <motion.span
                animate={{ rotate: preview ? 180 : 0 }}
                className="font-inter text-[18px]"
                style={{ color: "#00D4FF" }}
              >
                ↓
              </motion.span>
            </motion.button>

            {/* Live card preview */}
            <AnimatePresence>
              {preview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NolCard card={previewCard} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* 6. Save button — fixed bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="  w-full px-4 absolute bottom-14 "
        style={{
          background:
            "linear-gradient(to top, rgba(5,10,20,1) 70%, transparent)",
        }}
      >
        <Button
          label="Save Nol Card"
          onClick={handleSave}
          disabled={mode === "nfc"}
        />
      </motion.div>
    </div>
  );
}
