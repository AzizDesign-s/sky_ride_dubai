import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoPersonOutline,
  IoReceiptOutline,
  IoHelpCircleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import BackdropHero from "../components/BackdropHero";
import PageTopBar from "../components/PageTopBar";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileMenuItem from "../components/ProfileMenuItem";
import { currentUser } from "../data/mockData";

// Menu items config
const MENU_ITEMS = [
  {
    id: "personalInfo",
    icon: <IoPersonOutline />,
    label: "Personal Information",
    sublabel: "Name, phone, Emirates ID",
    screen: "personalInfo",
    disabled: false,
  },
  {
    id: "paymentHistory",
    icon: <IoReceiptOutline />,
    label: "Payment History",
    sublabel: "Top ups and ride payments",
    screen: "paymentHistory",
    disabled: false,
  },
  {
    id: "helpSupport",
    icon: <IoHelpCircleOutline />,
    label: "Help & Support",
    sublabel: "FAQs, contact us",
    screen: null,
    disabled: true,
  },
  {
    id: "settings",
    icon: <IoSettingsOutline />,
    label: "Settings",
    sublabel: "Notifications, language, theme",
    screen: null,
    disabled: true,
  },
];

export default function Profile({ navigate, cards, transactions }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleMenuPress = (item) => {
    if (item.disabled || !item.screen) return;
    navigate(item.screen);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 1. Backdrop */}
      <BackdropHero height={260} />

      {/* 2. Avatar section */}
      <div className="relative z-10">
        <ProfileAvatar
          name={currentUser.name}
          phone={currentUser.phone}
          emiratesId={currentUser.emiratesId}
          avatar={currentUser.avatar}
          website={currentUser.website}
        />
      </div>

      {/* 3. Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex mx-4 mb-5 rounded-2xl  overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {[
          { label: "Nol Cards", value: (cards || []).length },
          {
            label: "Total Trips",
            value: (transactions || []).filter((t) => t.type === "ride_payment")
              .length,
          },
          {
            label: "Top Ups",
            value: (transactions || []).filter((t) => t.type === "topup")
              .length,
          },
        ].map((stat, i, arr) => (
          <div
            key={stat.label}
            className="flex-1 flex flex-col items-center py-4"
            style={{
              borderRight:
                i < arr.length - 1
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "none",
            }}
          >
            <p
              className="font-syne font-extrabold text-[22px]"
              style={{ color: "#00D4FF" }}
            >
              {stat.value}
            </p>
            <p
              className="font-inter text-[11px] mt-0.5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* 4. Menu list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative z-10 mx-4 rounded-2xl overflow-hidden mb-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {MENU_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
          >
            <ProfileMenuItem
              icon={item.icon}
              label={item.label}
              sublabel={item.sublabel}
              onPress={() => handleMenuPress(item)}
              disabled={item.disabled}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* 5. Logout button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="relative z-10 mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <ProfileMenuItem
          icon={<IoLogOutOutline />}
          label="Log Out"
          sublabel="Sign out of your account"
          onPress={() => setShowLogoutConfirm(true)}
          danger={true}
          showArrow={false}
        />
      </motion.div>

      {/* 6. App version */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 text-center font-inter text-[11px] mt-4"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        SkyRide Dubai · Abdul Aziz · v1.0.0
      </motion.p>

      {/* Bottom nav spacer */}
      <div className="h-32" />

      {/* 7. Logout confirm sheet */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col justify-end w-full"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0"
              style={{
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 rounded-t-3xl overflow-hidden pb-32 mx-4"
              style={{
                background: "#0D1626",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "none",
              }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-4">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
              </div>

              <div className="px-5 pb-2 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "rgba(255,69,96,0.1)",
                    border: "1px solid rgba(255,69,96,0.2)",
                  }}
                >
                  <IoLogOutOutline size={28} style={{ color: "#FF4560" }} />
                </div>
                <h3 className="font-syne font-bold text-[18px] text-white mb-2">
                  Log Out?
                </h3>
                <p
                  className="font-inter text-[13px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  You will need to sign in again to access your SkyRide account.
                </p>
              </div>

              <div className="flex flex-col gap-3 px-4 mt-4">
                {/* Confirm logout */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("home")}
                  className="w-full py-4 rounded-2xl font-syne font-semibold text-[15px]"
                  style={{
                    background: "rgba(255,69,96,0.12)",
                    border: "1.5px solid rgba(255,69,96,0.4)",
                    color: "#FF4560",
                  }}
                >
                  Yes, Log Out
                </motion.button>

                {/* Cancel */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-4 rounded-2xl font-inter text-[14px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
