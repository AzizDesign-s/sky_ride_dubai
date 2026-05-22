import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoWalletOutline,
  IoCardOutline,
  IoReceiptOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";

// Mock transactions — replaced by real App state when available
const MOCK_TRANSACTIONS = [
  {
    id: "TXN-1716000001",
    type: "topup",
    cardLast4: "4821",
    cardType: "Silver",
    amount: 200.0,
    paymentMethod: "Apple Pay",
    status: "success",
    timestamp: "2024-05-17T09:00:00.000Z",
  },
  {
    id: "TXN-1716000002",
    type: "ride_payment",
    cardLast4: "4821",
    cardType: "Silver",
    amount: 126.0,
    paymentMethod: "Nol Card",
    tripId: "SKYRIDE-DXB-20240517-4821-001",
    status: "success",
    timestamp: "2024-05-17T10:35:00.000Z",
  },
  {
    id: "TXN-1716000003",
    type: "topup",
    cardLast4: "2233",
    cardType: "Gold",
    amount: 500.0,
    paymentMethod: "Credit Card",
    status: "success",
    timestamp: "2024-05-16T07:30:00.000Z",
  },
  {
    id: "TXN-1716000004",
    type: "ride_payment",
    cardLast4: "2233",
    cardType: "Gold",
    amount: 189.0,
    paymentMethod: "Nol Card",
    tripId: "SKYRIDE-PAL-20240516-2233-042",
    status: "success",
    timestamp: "2024-05-16T08:20:00.000Z",
  },
  {
    id: "TXN-1716000005",
    type: "ride_payment",
    cardLast4: "5544",
    cardType: "Platinum",
    amount: 340.0,
    paymentMethod: "Nol Card",
    tripId: "SKYRIDE-JBR-20240515-5544-018",
    status: "success",
    timestamp: "2024-05-15T19:50:00.000Z",
  },
];

// Filter tabs
const FILTERS = [
  { id: "all", label: "All" },
  { id: "ride_payment", label: "Rides" },
  { id: "topup", label: "Top Ups" },
];

// Format date
function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-AE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    d.toLocaleTimeString("en-AE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
}

// Single transaction row
function TransactionRow({ txn }) {
  const isTopUp = txn.type === "topup";
  const amountColor = isTopUp ? "#00FF88" : "#FF4560";
  const amountPrefix = isTopUp ? "+" : "-";

  const CARD_COLORS = {
    Silver: "#B0C4CF",
    Gold: "#FFD700",
    Platinum: "#D8DEE2",
  };
  const cardColor = CARD_COLORS[txn.cardType] || "#00D4FF";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 px-4 py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          background: isTopUp ? "rgba(0,255,136,0.1)" : "rgba(0,212,255,0.1)",
          border: isTopUp
            ? "1px solid rgba(0,255,136,0.2)"
            : "1px solid rgba(0,212,255,0.15)",
        }}
      >
        {isTopUp ? (
          <IoWalletOutline size={20} style={{ color: "#00FF88" }} />
        ) : (
          <MdFlightTakeoff size={20} style={{ color: "#00D4FF" }} />
        )}
      </div>

      {/* Label + meta */}
      <div className="flex-1 min-w-0">
        <p className="font-syne font-semibold text-[14px] text-white">
          {isTopUp ? "Card Top Up" : "Ride Payment"}
        </p>
        <p
          className="font-inter text-[11px] mt-0.5 truncate"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {formatDate(txn.timestamp)}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <IoCardOutline size={10} style={{ color: cardColor }} />
          <span className="font-inter text-[10px]" style={{ color: cardColor }}>
            {txn.cardType} ···· {txn.cardLast4}
          </span>
          {txn.paymentMethod && txn.paymentMethod !== "Nol Card" && (
            <>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <span
                className="font-inter text-[10px]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {txn.paymentMethod}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <p
          className="font-syne font-bold text-[16px]"
          style={{ color: amountColor }}
        >
          {amountPrefix} AED {txn.amount.toFixed(2)}
        </p>
        <div
          className="flex items-center justify-end gap-1 mt-0.5"
          style={{ color: "rgba(0,255,136,0.6)" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00FF88" }}
          />
          <span className="font-inter text-[10px]" style={{ color: "#00FF88" }}>
            {txn.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PaymentHistoryScreen({ navigate, transactions }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allTxns =
    transactions && transactions.length > 0 ? transactions : MOCK_TRANSACTIONS;

  // Total spent + topped up
  const totalTopUp = allTxns
    .filter((t) => t.type === "topup")
    .reduce((s, t) => s + t.amount, 0);
  const totalRides = allTxns
    .filter((t) => t.type === "ride_payment")
    .reduce((s, t) => s + t.amount, 0);

  const filtered = useMemo(() => {
    let result = [...allTxns];
    if (activeFilter !== "all")
      result = result.filter((t) => t.type === activeFilter);
    if (searchQuery.trim()) {
      result = result.filter(
        (t) =>
          t.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.tripId?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return result;
  }, [allTxns, activeFilter, searchQuery]);

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 2. Header */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!showSearch ? (
            <motion.div
              key="header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PageHeader
                title="Payment History"
                onBack={() => navigate("profile")}
                right={
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setShowSearch(true)}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <IoSearchOutline size={18} color="white" />
                  </motion.button>
                }
              />
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-14"
            >
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onCancel={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                placeholder="Search by transaction or trip ID..."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-col gap-4 pb-10 overflow-y-auto">
        {/* 3. Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-3 px-4"
        >
          {[
            {
              label: "Total Top Ups",
              value: `AED ${totalTopUp.toFixed(0)}`,
              color: "#00FF88",
              icon: <IoWalletOutline size={18} />,
            },
            {
              label: "Total Ride Spend",
              value: `AED ${totalRides.toFixed(0)}`,
              color: "#00D4FF",
              icon: <MdFlightTakeoff size={18} />,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span style={{ color: card.color }}>{card.icon}</span>
              <div>
                <p
                  className="font-syne font-bold text-[16px]"
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
                <p
                  className="font-inter text-[10px]"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {card.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* 4. Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 px-4"
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <motion.button
                key={f.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveFilter(f.id)}
                className="flex-1 py-2.5 rounded-xl font-inter text-[12px] font-medium"
                style={{
                  background: isActive
                    ? "rgba(0,212,255,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1.5px solid rgba(0,212,255,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? "#00D4FF" : "rgba(255,255,255,0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                {f.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* 5. Transaction list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mx-4 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <AnimatePresence>
            {filtered.length > 0 ? (
              filtered.map((txn) => <TransactionRow key={txn.id} txn={txn} />)
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-16 gap-3"
              >
                <IoReceiptOutline
                  size={32}
                  style={{ color: "rgba(255,255,255,0.15)" }}
                />
                <p className="font-syne font-bold text-[16px] text-white">
                  No transactions
                </p>
                <p
                  className="font-inter text-[13px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {searchQuery
                    ? `Nothing matches "${searchQuery}"`
                    : "No transactions yet"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
