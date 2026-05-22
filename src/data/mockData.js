// ─── DUBAI LOCATIONS ONLY ───────────────────────────────
export const dubaiLocations = [
  { id: 1, name: "Dubai Marina", zone: "Marina", dock: "SKY-DOCK-01" },
  { id: 2, name: "Downtown Dubai", zone: "Downtown", dock: "SKY-DOCK-02" },
  {
    id: 3,
    name: "Dubai International Airport",
    zone: "DXB",
    dock: "SKY-DOCK-03",
  },
  { id: 4, name: "Palm Jumeirah", zone: "Palm", dock: "SKY-DOCK-04" },
  { id: 5, name: "Business Bay", zone: "Business Bay", dock: "SKY-DOCK-05" },
  { id: 6, name: "JBR The Walk", zone: "JBR", dock: "SKY-DOCK-06" },
  { id: 7, name: "DIFC", zone: "DIFC", dock: "SKY-DOCK-07" },
  { id: 8, name: "Dubai Hills", zone: "Hills", dock: "SKY-DOCK-08" },
  { id: 9, name: "Jumeirah Beach Road", zone: "Jumeirah", dock: "SKY-DOCK-09" },
  { id: 10, name: "Dubai Creek Harbour", zone: "Creek", dock: "SKY-DOCK-10" },
];

// ─── RIDE OPTIONS ────────────────────────────────────────
export const rideOptions = [
  {
    id: "standard",
    name: "Standard Sky Ride",
    description: "Comfortable shared cabin",
    eta: "12 min",
    distance: "17 km",
    price: 120,
    passengers: 2,
    icon: "🚁",
  },
  {
    id: "premium",
    name: "Premium Cabin",
    description: "Private luxury experience",
    eta: "10 min",
    distance: "17 km",
    price: 180,
    passengers: 4,
    icon: "✈️",
  },
];

// ─── NOL CARDS ───────────────────────────────────────────
export const nolCards = [
  {
    id: "card-001",
    number: "7845 1231 5678 4821",
    last4: "4821",
    type: "Silver",
    balance: 68.4,
    status: "Active",
    addedOn: "12 Apr 2024",
    autoTopUp: false,
    isDefault: true,
  },
  {
    id: "card-002",
    number: "3921 5544 8800 2233",
    last4: "2233",
    type: "Gold",
    balance: 245.0,
    status: "Active",
    addedOn: "01 Jan 2024",
    autoTopUp: true,
    isDefault: false,
  },
  {
    id: "card-003",
    number: "1100 9988 7766 5544",
    last4: "5544",
    type: "Platinum",
    balance: 1200.0,
    status: "Active",
    addedOn: "15 Mar 2023",
    autoTopUp: true,
    isDefault: false,
  },
];

// ─── NOL CARD COLOR THEMES ───────────────────────────────
export const nolCardThemes = {
  Silver: {
    gradient: "linear-gradient(135deg, #4A5568 0%, #8E9EAB 40%, #C8D6DF 100%)",
    text: "#1a2a3a",
    badge: "bg-slate-200 text-slate-700",
    glow: "rgba(200,214,223,0.4)",
  },
  Gold: {
    gradient: "linear-gradient(135deg, #7B5E00 0%, #B8860B 50%, #FFD700 100%)",
    text: "#2a1a00",
    badge: "bg-yellow-300 text-yellow-900",
    glow: "rgba(255,215,0,0.4)",
  },
  Platinum: {
    gradient: "linear-gradient(135deg, #5a6470 0%, #9DA5A8 45%, #E8ECEE 100%)",
    text: "#1a2228",
    badge: "bg-slate-100 text-slate-600",
    glow: "rgba(232,236,238,0.4)",
  },
};

// ─── USER ────────────────────────────────────────────────
export const currentUser = {
  name: "Abdul Aziz",
  email: "aziaji46@gmail.com",
  website: "https://azizdesigns.framer.ai",
  phone: "+971 54 380 4098",
  emiratesId: "784-1990-1234567-1",
  avatar: null,
};
