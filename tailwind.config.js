/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        sky: {
          bg: "#050A14",
          card: "#0D1626",
          border: "#1A2A40",
          accent: "#00D4FF",
          glow: "#00A8CC",
          success: "#00FF88",
          warning: "#FFB800",
          error: "#FF4560",
          text: "#FFFFFF",
          muted: "#6B7F96",
          subtle: "#1E3048",
          secondText: "rgb(255,255,255,0.4)",
        },
        nol: {
          silver: "#C8D6DF",
          gold: "#FFD700",
          platinum: "#E8ECEE",
        },
      },
      backgroundImage: {
        "nol-silver":
          "linear-gradient(135deg, #4A5568 0%, #8E9EAB 40%, #C8D6DF 100%)",
        "nol-gold":
          "linear-gradient(135deg, #7B5E00 0%, #B8860B 40%, #FFD700 100%)",
        "nol-platinum":
          "linear-gradient(135deg, #6B7280 0%, #9DA5A8 40%, #E8ECEE 100%)",
        "hero-glow":
          "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.15) 0%, transparent 70%)",
        "btn-primary": "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0,212,255,0.35)",
        "glow-gold": "0 0 20px rgba(255,215,0,0.35)",
        "glow-card": "0 8px 32px rgba(0,0,0,0.4)",
        nol: "0 4px 24px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      backdropBlur: {
        xs: "4px",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0,212,255,0.7)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
