import { useState } from "react";
import { motion } from "framer-motion";

import BackdropHero from "../components/BackdropHero";
import PageHeader from "../components/PageHeader";
import DubaiRouteMap from "../components/DubaiRouteMap";
import RideCard from "../components/RideCard";
import Button from "../components/Button";

import { rideOptions } from "../data/mockData";

export default function FindRideScreen({ navigate, rideData }) {
  const [selectedRide, setSelectedRide] = useState(null);

  const { from, to } = rideData || {};

  const handleContinue = () => {
    if (!selectedRide) return;
    navigate("chooseCard", { selectedRoute: selectedRide });
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 1. Backdrop */}
      <BackdropHero />

      {/* 2. Header */}
      <div className="relative z-10">
        <PageHeader
          title="Select Your Ride"
          subtitle="Step 1 of 3"
          onBack={() => navigate("home")}
        />
      </div>

      {/* 3. Map */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="relative z-10 mt-10 px-4"
      >
        <DubaiRouteMap from={from} to={to} />
      </motion.div>

      {/* 4. Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 px-4 mt-10 mb-3 font-inter text-[11px] uppercase tracking-[2.5px]"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        Choose Your Ride Style
      </motion.p>

      {/* 5. Ride cards */}
      <div className="relative z-10 flex flex-col gap-6 px-4">
        {rideOptions.map((ride, i) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.1 }}
          >
            <RideCard
              ride={ride}
              isSelected={selectedRide?.id === ride.id}
              onSelect={setSelectedRide}
            />
          </motion.div>
        ))}
      </div>

      {/* 6. Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 px-4 mt-5 pb-10"
      >
        <Button
          label="Continue to Payment"
          onClick={handleContinue}
          disabled={!selectedRide}
        />
        <p
          className="text-center font-inter text-[11px] mt-3"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Fare deducted automatically after ride completion
        </p>
      </motion.div>
    </div>
  );
}
