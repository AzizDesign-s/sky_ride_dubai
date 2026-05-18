import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdNfc } from "react-icons/md";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

/**
 * NfcTapReader
 * ─────────────────────────────────────────────────────────
 * NFC tap simulation for reading Nol Card details.
 * In production — replace simulateNfcRead with real
 * Web NFC API: new NDEFReader().scan()
 *
 * Props:
 *   onCardRead   fn(cardData)   called when card is detected
 *                               cardData: { number, type }
 */

// NFC states
const STATE = {
  IDLE: "idle", // waiting for user to tap
  SCANNING: "scanning", // reading card
  SUCCESS: "success", // card read successfully
  ERROR: "error", // read failed
};

// Simulated NFC card read — replace with real Web NFC API in production
function simulateNfcRead() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 80% success rate simulation
      if (Math.random() > 0.2) {
        const types = ["Silver", "Gold", "Platinum"];
        const type = types[Math.floor(Math.random() * types.length)];
        const number = Array.from({ length: 4 }, () =>
          Math.floor(Math.random() * 9000 + 1000),
        ).join(" ");
        resolve({ number, type });
      } else {
        reject(new Error("Card not detected"));
      }
    }, 2200);
  });
}

export default function NfcTapReader({ onCardRead }) {
  const [nfcState, setNfcState] = useState(STATE.IDLE);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTap = async () => {
    if (nfcState === STATE.SCANNING) return;

    setNfcState(STATE.SCANNING);
    setErrorMsg("");

    try {
      const cardData = await simulateNfcRead();
      setNfcState(STATE.SUCCESS);
      // Small delay to show success state then pass data up
      setTimeout(() => onCardRead(cardData), 900);
    } catch (err) {
      setNfcState(STATE.ERROR);
      setErrorMsg("No card detected. Try again.");
      // Reset to idle after 2.5s
      setTimeout(() => setNfcState(STATE.IDLE), 2500);
    }
  };

  // Color per state
  const colors = {
    [STATE.IDLE]: {
      ring: "rgba(0,212,255,0.3)",
      icon: "#00D4FF",
      glow: "rgba(0,212,255,0.15)",
    },
    [STATE.SCANNING]: {
      ring: "rgba(0,212,255,0.5)",
      icon: "#00D4FF",
      glow: "rgba(0,212,255,0.25)",
    },
    [STATE.SUCCESS]: {
      ring: "rgba(0,255,136,0.5)",
      icon: "#00FF88",
      glow: "rgba(0,255,136,0.2)",
    },
    [STATE.ERROR]: {
      ring: "rgba(255,69,96,0.5)",
      icon: "#FF4560",
      glow: "rgba(255,69,96,0.15)",
    },
  };
  const c = colors[nfcState];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* NFC tap button */}
      <motion.button
        onClick={handleTap}
        disabled={nfcState === STATE.SCANNING}
        whileTap={nfcState !== STATE.SCANNING ? { scale: 0.94 } : {}}
        className="relative flex items-center justify-center rounded-full"
        style={{ width: 120, height: 120 }}
      >
        {/* Ripple rings — only when scanning */}
        <AnimatePresence>
          {nfcState === STATE.SCANNING && (
            <>
              {[0, 0.4, 0.8].map((delay, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 120 + i * 28,
                    height: 120 + i * 28,
                    border: `1px solid ${c.ring}`,
                  }}
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Idle pulse ring */}
        {nfcState === STATE.IDLE && (
          <motion.div
            className="absolute rounded-full"
            style={{ width: 120, height: 120, border: `1.5px solid ${c.ring}` }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Main circle */}
        <motion.div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          animate={{ boxShadow: `0 0 32px ${c.glow}` }}
          style={{
            background: `radial-gradient(circle, ${c.glow} 0%, rgba(5,10,20,0.95) 70%)`,
            border: `2px solid ${c.ring}`,
          }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {/* IDLE / SCANNING — NFC icon */}
            {(nfcState === STATE.IDLE || nfcState === STATE.SCANNING) && (
              <motion.div
                key="nfc"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
              >
                <MdNfc size={48} style={{ color: c.icon }} />
              </motion.div>
            )}

            {/* SUCCESS — checkmark */}
            {nfcState === STATE.SUCCESS && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IoCheckmarkCircle size={52} style={{ color: "#00FF88" }} />
              </motion.div>
            )}

            {/* ERROR — X */}
            {nfcState === STATE.ERROR && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IoCloseCircle size={52} style={{ color: "#FF4560" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>

      {/* Status text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={nfcState}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          {nfcState === STATE.IDLE && (
            <>
              <p className="font-syne font-semibold text-[14px] text-white mb-1">
                Tap to Scan Nol Card
              </p>
              <p
                className="font-inter text-[12px]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Hold your physical Nol Card near your phone
              </p>
            </>
          )}
          {nfcState === STATE.SCANNING && (
            <>
              <p
                className="font-syne font-semibold text-[14px]"
                style={{ color: "#00D4FF" }}
              >
                Scanning...
              </p>
              <p
                className="font-inter text-[12px]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Keep card steady near your phone
              </p>
            </>
          )}
          {nfcState === STATE.SUCCESS && (
            <>
              <p
                className="font-syne font-semibold text-[14px]"
                style={{ color: "#00FF88" }}
              >
                Card Detected!
              </p>
              <p
                className="font-inter text-[12px]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Reading card details...
              </p>
            </>
          )}
          {nfcState === STATE.ERROR && (
            <>
              <p
                className="font-syne font-semibold text-[14px]"
                style={{ color: "#FF4560" }}
              >
                {errorMsg}
              </p>
              <p
                className="font-inter text-[12px]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Make sure NFC is enabled on your phone
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
