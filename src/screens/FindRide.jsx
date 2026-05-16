import React from "react";
import PageHeader from "../components/PageHeader";

const FindRide = ({ navigate }) => {
  return (
    <div>
      <PageHeader
        title="Select Your Ride"
        subtitle="Step 1 of 3"
        onBack={() => navigate("home")}
      />
    </div>
  );
};

export default FindRide;
