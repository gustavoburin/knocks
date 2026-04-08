import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nflBlue: "#013369",
        nflRed: "#D50A0A",
        bg: "#FFFFFF",
        surface: "#FAFAFA",
        bord: "#EBEBEB",
        ink: "#222222",
        mute: "#717171",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
