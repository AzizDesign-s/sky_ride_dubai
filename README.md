<div align="center">

# 🚁 SkyRide Dubai
### Smart Urban Air Mobility — Futuristic Flying Taxi Experience

[Live Demo](https://skyride-dubai.vercel.app) · [Designer](https://azizdesigns.framer.ai)

</div>

---

## 📱 Overview

SkyRide Dubai is a mobile-first React application simulating a next-generation urban air mobility experience. Inspired by Dubai's futuristic transportation vision, the app allows users to book flying taxi rides across Dubai's iconic locations and pay exclusively using RTA Nol Cards.

> Designed and developed by [Abdul Aziz](https://azizdesigns.framer.ai) — UI/UX Designer & Frontend Developer based in Dubai.

---

## ✨ Features

### 🏠 Home Screen
- Dubai skyline backdrop with animated flying taxi
- Smart From / To location picker — Dubai locations only
- Location search with live filtering
- Popular Sky Docks quick select
- Time-based greeting

### ✈️ Find Ride
- SVG Dubai route map with animated route line
- Animated mini taxi flying along route
- Ride options — Standard, Premium Cabin, VIP Private Pod
- ETA, distance, passengers, price per card

### 💳 Nol Card System
- Silver, Gold, Platinum card themes with real gradient design
- Card selection with glowing active state
- Add new card manually or via NFC tap simulation
- Long press to Delete or Top Up a card
- Default card synced across all screens
- Card balance updates in real time

### 🎫 Boarding Pass
- Auto-generated Trip ID per booking
- QR Code linked to selected Nol Card + Trip ID
- NFC Tap alternative access method
- Live departure countdown timer
- Tear line boarding pass aesthetic

### 🗺️ Trip History
- Full trip list with search by Trip ID
- Filter by card type (Silver / Gold / Platinum)
- Trip detail with boarding pass + Pay Now button
- Insufficient balance detection with Top Up shortcut

### 💰 Top Up
- Quick amount chips (50 / 100 / 150 / 200 / 300 / 500 AED)
- Custom amount input
- Apple Pay, Samsung Pay, Credit Card, Debit Card
- Review → Processing → Success flow
- Transaction saved to payment history

### 👤 Profile
- Avatar with initials, name, phone, Emirates ID
- Stats — Nol Cards, Total Trips, Top Ups
- Personal Information (view + edit mode)
- Payment History with filter + search
- Logout with confirmation sheet

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React.js** | 18 | UI library and component architecture |
| **Vite** | 5 | Build tool and dev server |
| **Tailwind CSS** | 3 | Utility-first styling |
| **Framer Motion** | 11 | Animations, transitions, gestures |
| **qrcode.react** | 3 | QR code generation for boarding pass |
| **react-icons** | 5 | Icon library (Ionicons, Material) |

---

## 📱 Mobile First

This app is designed exclusively for mobile (412px viewport).
On desktop it renders centered in a mobile frame with a dark background.

---

## 🔮 Roadmap

- [ ] Live ride tracking screen
- [ ] Real NFC Web API integration
- [ ] Backend API + authentication
- [ ] Push notifications
- [ ] Real payment gateway (Stripe / Telr)
- [ ] Help & Support screen
- [ ] Settings screen
- [ ] Multi-language (Arabic / English)

---
