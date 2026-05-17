import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { IoQrCodeOutline } from "react-icons/io5";
import { MdNfc } from "react-icons/md";
import { nolCardThemes } from "../data/mockData";

/**
 * BoardingQR
 * ─────────────────────────────────────────────────────────
 * QR code + Nol Card tap access section.
 * Reusable on: BoardingPassScreen, TripHistoryScreen (future)
 *
 * Props:
 *   qrPayload       string   JSON string to encode in QR
 *   selectedNolCard object   card data for theme + tap display
 */

// Access method toggle badge
function AccessBadge({ icon, label, sublabel, active, onTap }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onTap}
      className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl"
      style={{
        background: active ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.04)",
        border: active
          ? "1.5px solid rgba(0,212,255,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        transition: "all 0.2s ease",
      }}
    >
      <span
        style={{
          color: active ? "#00D4FF" : "rgba(255,255,255,0.4)",
          fontSize: 22,
        }}
      >
        {icon}
      </span>
      <span
        className="font-syne font-semibold text-[12px]"
        style={{ color: active ? "#00D4FF" : "rgba(255,255,255,0.5)" }}
      >
        {label}
      </span>
      <span
        className="font-inter text-[10px]"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {sublabel}
      </span>
    </motion.button>
  );
}

export default function BoardingQR({ qrPayload, selectedNolCard }) {
  const [accessMode, setAccessMode] = useState("qr"); // 'qr' | 'nol'
  const [qrRevealed, setQrRevealed] = useState(false);

  const theme = nolCardThemes[selectedNolCard?.type] || nolCardThemes.Silver;

  // Small delay before revealing QR — feels premium
  useEffect(() => {
    const t = setTimeout(() => setQrRevealed(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* Access method toggle */}
      <p
        className="font-inter text-[11px] uppercase tracking-[2px] mb-3 text-center"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        Choose Access Method
      </p>

      <div className="flex gap-3 mb-5">
        <AccessBadge
          icon={<IoQrCodeOutline />}
          label="QR Scan"
          sublabel="Show at scanner"
          active={accessMode === "qr"}
          onTap={() => setAccessMode("qr")}
        />
        <AccessBadge
          icon={<MdNfc />}
          label="Nol Tap"
          sublabel="Tap card at gate"
          active={accessMode === "nol"}
          onTap={() => setAccessMode("nol")}
        />
      </div>

      {/* Content — QR or Nol Tap */}
      <AnimatePresence mode="wait">
        {/* ── QR Code ── */}
        {accessMode === "qr" && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: qrRevealed ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="relative p-4 rounded-2xl"
              style={{
                background: "white",
                boxShadow: `0 0 28px ${theme.glow}, 0 0 56px ${theme.glow}`,
              }}
            >
              <QRCodeSVG
                value={qrPayload || "SKYRIDE-DUBAI"}
                size={160}
                bgColor="#ffffff"
                fgColor="#050A14"
                level="M"
              />

              {/* Corner accent marks */}
              {[
                "top-1 left-1",
                "top-1 right-1",
                "bottom-1 left-1",
                "bottom-1 right-1",
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-5 h-5 rounded-sm`}
                  style={{ background: "rgba(0,212,255,0.15)" }}
                />
              ))}
            </motion.div>

            <p
              className="font-inter text-[11px] mt-3 text-center"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Scan at Sky Dock terminal · Valid for this trip only
            </p>
          </motion.div>
        )}

        {/* ── Nol Card Tap ── */}
        {accessMode === "nol" && (
          <motion.div
            key="nol"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Pulsing NFC ring */}
            <motion.div
              animate={{ scale: [1, 1.07, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: theme.glow.replace("0.4", "0.07"),
                border: `2px solid ${theme.glow.replace("0.4", "0.45")}`,
                boxShadow: `0 0 28px ${theme.glow}`,
              }}
            >
              <MdNfc size={54} style={{ color: "#00D4FF" }} />
            </motion.div>

            {/* Ripple rings */}
            {[1, 1.4, 1.8].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 128 + i * 24,
                  height: 128 + i * 24,
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: "50%",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay }}
              />
            ))}

            <div className="text-center">
              <p className="font-syne font-bold text-[15px] text-white mb-1">
                Tap Your Nol Card
              </p>
              <p
                className="font-inter text-[12px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Use your{" "}
                <span className="text-white font-medium">
                  {selectedNolCard?.type}
                </span>{" "}
                card ending in{" "}
                <span className="text-white font-medium">
                  {selectedNolCard?.last4}
                </span>
              </p>
              <p
                className="font-inter text-[11px] mt-1.5"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Hold card near the NFC reader at the dock gate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
