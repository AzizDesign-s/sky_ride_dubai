import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoCardOutline,
  IoWalletOutline,
} from "react-icons/io5";

import BackdropHero from "../components/BackdropHero";
import PageHeader from "../components/PageHeader";
import NolCard from "../components/NolCard";
import PaymentMethodCard from "../components/PaymentMethod";
import Button from "../components/Button";
import InputField from "../components/InputField";

// ─── Payment methods ──────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: "apple_pay",
    label: "Apple Pay",
    sublabel: "Pay with Face ID or Touch ID",
    icon: "🍎",
    tag: "Fast",
  },
  {
    id: "samsung_pay",
    label: "Samsung Pay",
    sublabel: "Pay with your Samsung device",
    icon: "🌀",
  },
  {
    id: "credit_card",
    label: "Credit Card",
    sublabel: "Visa, Mastercard, AMEX",
    icon: "💳",
  },
  {
    id: "debit_card",
    label: "Debit Card",
    sublabel: "Linked to your bank account",
    icon: "🏦",
  },
];

// Quick amount chips
const QUICK_AMOUNTS = [50, 100, 150, 200, 300, 500];

// Screen steps
const STEP = {
  SELECT: "select", // choose amount + payment method
  CONFIRM: "confirm", // review before paying
  LOADING: "loading", // processing
  SUCCESS: "success", // done
};

// ─── Amount formatter ─────────────────────────────────────
function formatAmount(val) {
  // Only allow numbers and one decimal point, max 2 decimals
  const cleaned = val.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) return parts[0] + "." + parts[1];
  if (parts[1]?.length > 2) return parts[0] + "." + parts[1].slice(0, 2);
  return cleaned;
}

// ─── Top Up Screen ────────────────────────────────────────
export default function TopUpScreen({
  navigate,
  rideData,
  cards,
  topUpCard,
  addTransaction,
}) {
  const card = rideData?.topUpCard; // card passed from NolCardActions

  const [step, setStep] = useState(STEP.SELECT);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [errors, setErrors] = useState({});
  const [txnRecord, setTxnRecord] = useState(null);

  // ── Validate ──────────────────────────────────────────────
  const validate = () => {
    const e = {};
    const num = parseFloat(amount);
    if (!amount || isNaN(num)) e.amount = "Please enter an amount";
    else if (num < 10) e.amount = "Minimum top up is AED 10";
    else if (num > 2000) e.amount = "Maximum top up is AED 2,000";
    if (!selectedMethod) e.method = "Please select a payment method";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Proceed to confirm ────────────────────────────────────
  const handleReview = () => {
    if (!validate()) return;
    setStep(STEP.CONFIRM);
  };

  // ── Process payment ───────────────────────────────────────
  const handlePay = () => {
    setStep(STEP.LOADING);

    // Build transaction record for future history
    const txn = {
      id: `TXN-${Date.now()}`,
      type: "topup",
      cardId: card?.id,
      cardLast4: card?.last4,
      cardType: card?.type,
      amount: parseFloat(amount),
      paymentMethod: selectedMethod?.label,
      status: "success",
      timestamp: new Date().toISOString(),
    };

    // Simulate payment processing (1.8s)
    setTimeout(() => {
      // 1. Add balance to the card in App state
      topUpCard(card?.id, parseFloat(amount));

      // 2. Save transaction to history in App state
      addTransaction(txn);

      // 3. Store record for success screen
      setTxnRecord(txn);

      // 4. Show success
      setStep(STEP.SUCCESS);
    }, 1800);
  };

  // ── Navigate back ─────────────────────────────────────────
  const handleBack = () => {
    if (step === STEP.CONFIRM) {
      setStep(STEP.SELECT);
      return;
    }
    navigate("myCards");
  };

  // ─── Render ────────────────────────────────────────────────

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* Backdrop */}
      <BackdropHero height={130} />

      {/* Header — hide on loading/success */}
      {step !== STEP.LOADING && step !== STEP.SUCCESS && (
        <div className="relative z-10">
          <PageHeader
            title={step === STEP.CONFIRM ? "Review Top Up" : "Top Up Card"}
            subtitle={
              step === STEP.CONFIRM
                ? "Confirm your payment"
                : "Add balance to Nol Card"
            }
            onBack={handleBack}
          />
        </div>
      )}

      {/* ── STEP: SELECT ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {step === STEP.SELECT && (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex flex-col gap-5 px-4 pb-36 overflow-y-auto"
          >
            {/* Card being topped up */}
            {card && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p
                  className="font-inter text-[11px] uppercase tracking-[2px] mb-3"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Topping Up
                </p>
                <NolCard card={card} compact={true} />
              </motion.div>
            )}

            {/* Quick amount chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <p
                className="font-inter text-[11px] uppercase tracking-[2px] mb-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Quick Amounts (AED)
              </p>
              <div className="grid grid-cols-3 gap-2">
                {QUICK_AMOUNTS.map((val) => {
                  const isActive = amount === String(val);
                  return (
                    <motion.button
                      key={val}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => {
                        setAmount(String(val));
                        setErrors((p) => ({ ...p, amount: "" }));
                      }}
                      className="py-3 rounded-2xl font-syne font-bold text-[16px]"
                      style={{
                        background: isActive
                          ? "rgba(0,212,255,0.15)"
                          : "rgba(255,255,255,0.04)",
                        border: isActive
                          ? "1.5px solid rgba(0,212,255,0.45)"
                          : "1px solid rgba(255,255,255,0.08)",
                        color: isActive ? "#00D4FF" : "rgba(255,255,255,0.6)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {val}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Custom amount input */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <InputField
                label="Custom Amount (AED)"
                placeholder="Enter amount e.g. 75.00"
                value={amount}
                onChange={(v) => {
                  setAmount(formatAmount(v));
                  setErrors((p) => ({ ...p, amount: "" }));
                }}
                icon={<IoWalletOutline size={18} />}
                hint="Min AED 10 · Max AED 2,000"
                error={errors.amount}
                type="decimal"
              />
            </motion.div>

            {/* Payment methods */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p
                className="font-inter text-[11px] uppercase tracking-[2px] mb-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Payment Method
              </p>
              {errors.method && (
                <p
                  className="font-inter text-[11px] mb-2"
                  style={{ color: "#FF4560" }}
                >
                  ⚠ {errors.method}
                </p>
              )}
              <div className="flex flex-col gap-2">
                {PAYMENT_METHODS.map((method, i) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28 + i * 0.07 }}
                  >
                    <PaymentMethodCard
                      method={method}
                      isSelected={selectedMethod?.id === method.id}
                      onSelect={(m) => {
                        setSelectedMethod(m);
                        setErrors((p) => ({ ...p, method: "" }));
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── STEP: CONFIRM ─────────────────────────────── */}
        {step === STEP.CONFIRM && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex flex-col gap-4 px-4 pb-36 overflow-y-auto"
          >
            {/* Card */}
            {card && (
              <div>
                <p
                  className="font-inter text-[11px] uppercase tracking-[2px] mb-3"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Topping Up
                </p>
                <NolCard card={card} compact={true} />
              </div>
            )}

            {/* Summary */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {[
                {
                  label: "Top Up Amount",
                  value: `AED ${parseFloat(amount).toFixed(2)}`,
                  highlight: true,
                },
                { label: "Payment Method", value: selectedMethod?.label },
                {
                  label: "Current Balance",
                  value: `AED ${card?.balance?.toFixed(2) || "0.00"}`,
                },
                {
                  label: "Balance After",
                  value: `AED ${(parseFloat(card?.balance || 0) + parseFloat(amount)).toFixed(2)}`,
                  green: true,
                },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-3"
                  style={{
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                  }}
                >
                  <span
                    className="font-inter text-[13px]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="font-syne font-bold text-[15px]"
                    style={{
                      color: row.green
                        ? "#00FF88"
                        : row.highlight
                          ? "#00D4FF"
                          : "white",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Security note */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: "rgba(0,212,255,0.05)",
                border: "1px solid rgba(0,212,255,0.1)",
              }}
            >
              <span>🔒</span>
              <p
                className="font-inter text-[12px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Payment is encrypted and secure. Amount credited instantly to
                your Nol Card.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── STEP: LOADING ─────────────────────────────── */}
        {step === STEP.LOADING && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center flex-1 gap-6 px-6"
          >
            {/* Spinning ring */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: "rgba(0,212,255,0.15)" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-t-transparent"
                style={{ borderColor: "#00D4FF" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <IoCardOutline size={32} style={{ color: "#00D4FF" }} />
              </div>
            </div>

            <div className="text-center">
              <p className="font-syne font-bold text-[18px] text-white mb-2">
                Processing Payment
              </p>
              <p
                className="font-inter text-[13px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Crediting AED {parseFloat(amount).toFixed(2)} via{" "}
                {selectedMethod?.label}...
              </p>
            </div>
          </motion.div>
        )}

        {/* ── STEP: SUCCESS ─────────────────────────────── */}
        {step === STEP.SUCCESS && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center px-6 pt-20 pb-10 gap-5"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
            >
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

            {/* Text */}
            <div className="text-center">
              <h1 className="font-syne font-extrabold text-[26px] text-white mb-2">
                Top Up Successful!
              </h1>
              <p
                className="font-syne font-bold text-[28px]"
                style={{ color: "#00D4FF" }}
              >
                + AED {parseFloat(amount).toFixed(2)}
              </p>
              <p
                className="font-inter text-[13px] mt-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Added to your {card?.type} Card ending {card?.last4}
              </p>
            </div>

            {/* Transaction details */}
            {txnRecord && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {[
                  {
                    label: "Transaction ID",
                    value: txnRecord.id.slice(0, 20) + "...",
                  },
                  { label: "Payment Via", value: txnRecord.paymentMethod },
                  {
                    label: "Date & Time",
                    value: new Date(txnRecord.timestamp).toLocaleString(
                      "en-AE",
                    ),
                  },
                  { label: "Status", value: "✓ Success", green: true },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                      borderBottom:
                        i < arr.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                    }}
                  >
                    <span
                      className="font-inter text-[12px]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="font-inter font-medium text-[12px]"
                      style={{ color: row.green ? "#00FF88" : "white" }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Note for future history */}
            <p
              className="font-inter text-[11px] text-center"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              This transaction is saved to your payment history
            </p>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-3 mt-2">
              <Button
                label="View My Nol Cards"
                onClick={() => navigate("myCards")}
              />
              <Button
                label="Back to Home"
                variant="ghost"
                onClick={() => navigate("home")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fixed bottom button — only on select/confirm steps ── */}
      <AnimatePresence>
        {(step === STEP.SELECT || step === STEP.CONFIRM) && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full px-4 pb-8 pt-4"
            style={{
              maxWidth: "412px",
              background:
                "linear-gradient(to top, rgba(5,10,20,1) 70%, transparent)",
            }}
          >
            <Button
              label={
                step === STEP.CONFIRM
                  ? `Pay AED ${parseFloat(amount || 0).toFixed(2)}`
                  : "Review Payment"
              }
              onClick={step === STEP.CONFIRM ? handlePay : handleReview}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
