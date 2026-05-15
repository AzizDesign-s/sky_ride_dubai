import React from "react";
import { motion } from "framer-motion";

const Button = ({
  label,
  onClick,
  variant = "primary",
  icon,
  iconPosition = "left",
  fullWidth = true,
  disabled = false,
  className = "",
}) => {
  const base = `flex items-center justify-center gap-2 h-16 rounded-2xl font-syne font-semibold text-base trasition-all duration-200 select-non cursor-pointer ${fullWidth ? "w-full" : "w-auto px-8"} ${disabled ? "opacity-40 cursor-not-allowed" : ""}`;

  const variants = {
    primary: `bg-btn-primary text-sky-bg shadown-glow-cyan active:scale-[0.98] active:shadow-non`,
    secondary: `glass text-sky-accent border border-sky-accent/30 active:scale-[0.98]`,
    ghost: `bg-transparent text-sky-muted border border-sky-border active:scale-[0,98]`,
  };

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {icon && iconPosition === "left" && (
        <span className="text-xl">{icon}</span>
      )}
      {label}
      {icon && iconPosition === "right" && (
        <span className="text-xl h-">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;
