const { Warning } = require("postcss");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      /* Typography */
      fontSize: {
        h1: ["32px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        h2: ["28px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        h3: ["24px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        s1: ["20px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        s2: ["18px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        b1: ["16px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        b2: ["16px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        b3: ["14px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        b4: ["14px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        b5: ["12px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        b6: ["12px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        c1: ["10px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        c2: ["10px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        c3: ["8px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        c4: ["8px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
        c5: ["6px", { lineHeight: "140%", letterSpacing: "-0.6px" }],
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      /* Color Pallet */
      colors: {
        primary: {
          25: "#FEF2F3",
          50: "#FCE5E7",
          100: "#FACCD0",
          200: "#F599A0",
          300: "#F06671",
          400: "#F97066",
          500: "#E60012",
          600: "#CF0010",
          700: "#B8000E",
          800: "#A1000D",
          900: "#8A000B",
          950: "#730009",
        },
        secondary: {
          25: "#DAEFDF",
          50: "#B5DFBF",
          100: "#90CF9F",
          200: "#6BBF7F",
          300: "#47af5f",
          400: "#22a35b",
          500: "#009857",
          600: "#018550",
          700: "#016743",
          800: "#015236",
          900: "#013E28",
          950: "#00291B",
        },
        grayScale: {
          25: "#F7F7FA",
          50: "#F0F0F4",
          100: "#E8E8ED",
          200: "#E1E1E8",
          300: "#CDCED6",
          400: "#A9ABB8",
          500: "#84889A",
          600: "#525463",
          700: "#3E404C",
          800: "#2B2D36",
          900: "#252730",
          950: "#17181E",
        },
        warning: {
          25: "#FFF9ED",
          50: "#FFEDC6",
          100: "#FFE293",
          200: "#FFCE48",
          300: "#FFD768",
          400: "#EEAE00",
          500: "#EEAE00",
          600: "#D59100",
          700: "#CF8300",
        },
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        // Header Styles
        ".h1": {
          fontWeight: "bold",
          fontSize: "32px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".h2": {
          fontWeight: "bold",
          fontSize: "28px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".h3": {
          fontWeight: "bold",
          fontSize: "24px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".h4": {
          fontWeight: "500",
          fontSize: "24px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },

        // Subtitle Styles
        ".st1": {
          fontWeight: "bold",
          fontSize: "20px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".st2": {
          fontWeight: "500",
          fontSize: "20px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".st3": {
          fontWeight: "bold",
          fontSize: "18px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".st4": {
          fontWeight: "500",
          fontSize: "18px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },

        // Body Styles
        ".b1": {
          fontWeight: "bold",
          fontSize: "16px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".b2": {
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".b3": {
          fontWeight: "600",
          fontSize: "14px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".b4": {
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".b5": {
          fontWeight: "500",
          fontSize: "12px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".b6": {
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },

        // Caption Styles
        ".c1": {
          fontWeight: "500",
          fontSize: "10px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".c2": {
          fontWeight: "400",
          fontSize: "10px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".c3": {
          fontWeight: "500",
          fontSize: "8px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".c4": {
          fontWeight: "400",
          fontSize: "8px",
          lineHeight: "160%",
          letterSpacing: "-0.6px",
        },
        ".c5": {
          fontWeight: "400",
          fontSize: "6px",
          lineHeight: "100%",
          letterSpacing: "-0.6px",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
