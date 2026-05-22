import { useState } from "react";
import { motion } from "framer-motion";
import {
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoCardOutline,
  IoCreateOutline,
} from "react-icons/io5";

import PageHeader from "../components/PageHeader";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { currentUser } from "../data/mockData";

// Display row — non-editable view
function InfoRow({ icon, label, value }) {
  return (
    <div
      className="flex items-center gap-4 px-4 py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: "rgba(0,212,255,0.08)",
          border: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <span style={{ color: "#00D4FF", fontSize: 18 }}>{icon}</span>
      </div>
      <div className="flex-1">
        <p
          className="font-inter text-[11px] uppercase tracking-[1.5px] mb-0.5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {label}
        </p>
        <p className="font-syne font-semibold text-[15px] text-white">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export default function PersonalInfoScreen({ navigate }) {
  const [editMode, setEditMode] = useState(true);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [emiratesId] = useState(currentUser.emiratesId); // not editable

  const handleSave = () => {
    // TODO: save to backend
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-sky-bg">
      {/* 2. Header */}
      <div className="relative z-10">
        <PageHeader
          title="Personal Information"
          onBack={() => navigate("profile")}
          right={
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setEditMode((e) => !e)}
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{
                background: editMode
                  ? "rgba(0,212,255,0.15)"
                  : "rgba(255,255,255,0.05)",
                border: editMode
                  ? "1px solid rgba(0,212,255,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <IoCreateOutline
                size={18}
                style={{ color: editMode ? "#00D4FF" : "white" }}
              />
            </motion.button>
          }
        />
      </div>

      <div className="relative z-10 flex flex-col gap-4 px-4 pb-36 overflow-y-auto">
        {/* 3. Avatar initials */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-2"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0D2040 0%, #1A3A5C 100%)",
              border: "2px solid rgba(0,212,255,0.4)",
              boxShadow: "0 0 24px rgba(0,212,255,0.2)",
            }}
          >
            <span
              className="font-syne font-extrabold text-[26px]"
              style={{ color: "#00D4FF" }}
            >
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </span>
          </div>
        </motion.div>

        {/* 4. View mode */}
        {!editMode && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <InfoRow
              icon={<IoPersonOutline />}
              label="Full Name"
              value={name}
            />
            <InfoRow
              icon={<IoCallOutline />}
              label="Mobile Number"
              value={phone}
            />
            <InfoRow
              icon={<IoMailOutline />}
              label="Email Address"
              value={email}
            />
            <InfoRow
              icon={<IoCardOutline />}
              label="Emirates ID"
              value={`${emiratesId?.slice(0, 3)}-****-${emiratesId?.slice(-4)}`}
            />
          </motion.div>
        )}

        {/* 5. Edit mode */}
        {editMode && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <InputField
              label="Full Name"
              placeholder="Your full name"
              value={name}
              onChange={setName}
              icon={<IoPersonOutline size={18} />}
            />
            <InputField
              label="Mobile Number"
              placeholder="+971 XX XXX XXXX"
              value={phone}
              onChange={setPhone}
              icon={<IoCallOutline size={18} />}
              type="tel"
            />
            <InputField
              label="Email Address"
              placeholder="your@email.com"
              value={email}
              onChange={setEmail}
              icon={<IoMailOutline size={18} />}
              type="email"
            />

            {/* Emirates ID — read only */}
            <div>
              <InputField
                label="Emirates ID"
                value={`${emiratesId?.slice(0, 3)}-****-${emiratesId?.slice(-4)}`}
                onChange={() => {}}
                icon={<IoCardOutline size={18} />}
                disabled={true}
                hint="Emirates ID cannot be changed"
              />
            </div>
          </motion.div>
        )}

        {/* 6. UAE resident note */}
        {!editMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.1)",
            }}
          >
            <span>🇦🇪</span>
            <p
              className="font-inter text-[12px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              SkyRide Dubai is available for UAE residents only. Emirates ID is
              required for verification.
            </p>
          </motion.div>
        )}
      </div>

      {/* 7. Save button in edit mode */}
      {editMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full px-4 pb-8 pt-4"
          style={{
            background:
              "linear-gradient(to top, rgba(5,10,20,1) 70%, transparent)",
          }}
        >
          <Button label="Save Changes" onClick={handleSave} />
        </motion.div>
      )}

      {!editMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full px-4 pb-8 pt-4"
          style={{
            background:
              "linear-gradient(to top, rgba(5,10,20,1) 70%, transparent)",
          }}
        >
          <Button label="Edit" onClick={handleEdit} variant="secondary" />
        </motion.div>
      )}
    </div>
  );
}
