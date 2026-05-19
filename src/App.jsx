import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";

import HomeScreen from "./screens/Home";
import FindRide from "./screens/FindRide";
import ChooseNolCardScreen from "./screens/ChooseNol";
import ConfirmRideScreen from "./screens/ConfirmRide";
import BoardingPassScreen from "./screens/BoardingPass";
import MyTripsScreen from "./screens/MyTrip";
import MyNolCardsScreen from "./screens/MyNolCard";
import AddNolCardScreen from "./screens/AddNol";
import CardSuccessScreen from "./screens/CardSuccess";
import ProfileScreen from "./screens/Profile";
import TopUpScreen from "./screens/TopUpScreen";

import { nolCards } from "./data/mockData";

// Screens where Bottom Nav is shown
const BOTTOM_NAV_SCREENS = ["home", "myTrips", "myCards", "profile"];

// Map screen → active tab
const ACTIVE_TAB = {
  home: "home",
  myTrips: "trips",
  myCards: "cards",
  profile: "profile",
};

const SCREENS = {
  home: HomeScreen,
  findRide: FindRide,
  chooseCard: ChooseNolCardScreen,
  confirmRide: ConfirmRideScreen,
  boarding: BoardingPassScreen,
  myTrips: MyTripsScreen,
  myCards: MyNolCardsScreen,
  addCard: AddNolCardScreen,
  cardSuccess: CardSuccessScreen,
  profile: ProfileScreen,
  topUp: TopUpScreen,
};

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [rideData, setRideData] = useState({
    from: null,
    to: null,
    selectedRoute: null,
    selectedNolCard: null,
  });

  const [cards, setCards] = useState(nolCards);

  const navigate = (to, data = {}) => {
    setRideData((prev) => ({ ...prev, ...data }));
    setScreen(to);
  };

  const updateDefaultCard = (selectedCard) => {
    setCards((prev) =>
      prev.map((c) => ({ ...c, isDefault: c.id === selectedCard.id })),
    );
  };

  // Add alongside updateDefaultCard
  const addCard = (newCard) => {
    setCards((prev) => [...prev, newCard]);
  };

  // Add this
  const deleteCard = (cardToDelete) => {
    setCards((prev) => {
      const remaining = prev.filter((c) => c.id !== cardToDelete.id);
      // If deleted card was default, make first remaining card default
      if (cardToDelete.isDefault && remaining.length > 0) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
  };

  // 1. Add transactions state
  const [transactions, setTransactions] = useState([]);

  // 2. Add topUpCard function
  const topUpCard = (cardId, amount) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, balance: parseFloat((c.balance + amount).toFixed(2)) }
          : c,
      ),
    );
  };

  // 3. Add addTransaction function
  const addTransaction = (txn) => {
    setTransactions((prev) => [txn, ...prev]); // newest first
  };

  // Add trips state (already have transactions — trips are a subset)
  const [trips, setTrips] = useState([]);

  // Add trip when boarding pass is confirmed
  const addTrip = (tripRecord) => {
    setTrips((prev) => [tripRecord, ...prev]); // newest first
  };

  const ActiveScreen = SCREENS[screen];
  const showBottomNav = BOTTOM_NAV_SCREENS.includes(screen);

  return (
    <div className="relative w-full min-h-screen bg-sky-bg overflow-hidden">
      {/* Active Screen */}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen"
        >
          <ActiveScreen
            navigate={navigate}
            rideData={rideData}
            cards={cards}
            updateDefaultCard={updateDefaultCard}
            addCard={addCard}
            deleteCard={deleteCard}
            topUpCard={topUpCard} // ← add
            addTransaction={addTransaction}
            transactions={transactions}
            trips={trips}
            addTrip={addTrip}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Nav — only for tab screens */}
      <AnimatePresence>
        {showBottomNav && (
          <motion.div
            key="bottom-nav"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <BottomNav active={ACTIVE_TAB[screen]} navigate={navigate} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer — every page */}
      <Footer />
    </div>
  );
}
