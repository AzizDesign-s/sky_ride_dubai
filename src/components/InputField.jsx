import { useState } from "react";
import { motion } from "framer-motion";

/**
 * InputField
 * ─────────────────────────────────────────────────────────
 * Reusable input field — use on any form screen.
 *
 * Props:
 *   label        string    field label above input
 *   placeholder  string    placeholder text
 *   value        string    controlled value
 *   onChange     fn        called with new value string
 *   type         string    input type (default: 'text')
 *   icon         node      left icon element (optional)
 *   hint         string    small hint text below (optional)
 *   error        string    error message below (optional)
 *   maxLength    number    max character limit (optional)
 *   disabled     boolean   disable input (default: false)
 *   formatter    fn        format value on change e.g card number spacing
 */
export default function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  hint,
  error,
  maxLength,
  disabled = false,
  formatter,
}) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const raw = e.target.value;
    const formatted = formatter ? formatter(raw) : raw;
    onChange(formatted);
  };

  const borderColor = error
    ? "rgba(255,69,96,0.6)"
    : focused
      ? "rgba(0,212,255,0.5)"
      : "rgba(255,255,255,0.1)";

  const glowColor = error
    ? "rgba(255,69,96,0.08)"
    : focused
      ? "rgba(0,212,255,0.06)"
      : "transparent";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      {label && (
        <p
          className="font-inter text-[12px] uppercase tracking-[1.5px]"
          style={{
            color: focused ? "rgba(0,212,255,0.8)" : "rgba(255,255,255,0.4)",
          }}
        >
          {label}
        </p>
      )}

      {/* Input wrapper */}
      <motion.div
        animate={{
          boxShadow: focused
            ? `0 0 0 1px ${borderColor}, 0 4px 20px ${glowColor}`
            : "none",
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-3 px-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${borderColor}`,
          height: "56px",
          transition: "border-color 0.2s ease, background 0.2s ease",
          background: focused
            ? "rgba(0,212,255,0.04)"
            : "rgba(255,255,255,0.04)",
        }}
      >
        {/* Left icon */}
        {icon && (
          <span
            style={{
              color: focused ? "#00D4FF" : "rgba(255,255,255,0.3)",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className="flex-1 bg-transparent font-inter text-[15px] text-white outline-none"
          style={{
            caretColor: "#00D4FF",
            color: disabled ? "rgba(255,255,255,0.3)" : "white",
          }}
        />

        {/* Character count if maxLength set */}
        {maxLength && value?.length > 0 && (
          <span
            className="font-inter text-[11px] flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {value.length}/{maxLength}
          </span>
        )}
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-inter text-[11px]"
          style={{ color: "#FF4560" }}
        >
          ⚠ {error}
        </motion.p>
      )}

      {/* Hint text */}
      {hint && !error && (
        <p
          className="font-inter text-[11px]"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
