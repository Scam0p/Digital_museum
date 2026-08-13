/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        saffron: {
          DEFAULT: "#FF9933",
          light: "#FFAA55",
          dark: "#E67700",
        },
        indigoGreen: {
          DEFAULT: "#128807",
          light: "#169C08",
          dark: "#0F6F06",
        },
        indigoNavy: {
          DEFAULT: "#000080",
          light: "#0000A3",
          dark: "#00005C",
        },
        charcoal: {
          DEFAULT: "#121212",
          card: "#1E1E1E",
          hover: "#252525",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
