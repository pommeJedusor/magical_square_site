import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-black": "#07090D",
        "dark-grey": "#313640",
        "normal-grey": "#5C6373",
        "light-grey": "#8F96A6",
        "dark-white": "#C7CFD9",
      },
    },
  },
  plugins: [],
};
export default config;
