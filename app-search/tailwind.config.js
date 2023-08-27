// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './common/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './talent-search/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          ["Inter var", ...defaultTheme.fontFamily.sans],
          {
            fontFeatureSettings: '"cv02", "cv03", "cv04", "cv09", "cv11", "zero"', // Legend: rsms.me/inter/#features
          }
        ]
      },

      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "13": "3.25rem",
        "18": "4.5rem",
        // "header": "5rem",
        // "header-1": "calc(5rem - 1px)",
        // "body": "calc(100vh - 5rem)",
        // "section-upper": `clamp(4rem, (100vw - ${screenLg}) * 9999, 5rem)`,
        // "section-lower": `clamp(5rem, (100vw - ${screenLg}) * 9999, 6rem)`,
      },

      boxShadow: {
        ...defaultTheme.boxShadow,
        sm: "0 1px 2px 0 rgb(100 116 139 / 0.05 * 2)",
        DEFAULT: "0 1px 3px 0 rgb(100 116 139 / 0.2), 0 1px 2px -1px rgb(100 116 139 / 0.2)",
        md: "0 4px 6px -1px rgb(100 116 139 / 0.2), 0 2px 4px -2px rgb(100 116 139 / 0.2)",
        lg: "0 10px 15px -3px rgb(100 116 139 / 0.2), 0 4px 6px -4px rgb(100 116 139 / 0.2)",
        xl: "0 20px 25px -5px rgb(100 116 139 / 0.2), 0 8px 10px -6px rgb(100 116 139 / 0.2)",
        "2xl": "0 25px 50px -12px rgb(100 116 139 / 0.5)",
        inner: "inset 0 2px 4px 0 rgb(100 116 139 / 0.1)",
        // Note: used "slate-500" instead of "black" and doubled alpha (opacity) to compensate brightness.
      }
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
}

// fontSize() {
//   // text-xs	font-size: 0.75rem; /* 12px */
//   // line-height: 1rem; /* 16px */
//   // text-sm	font-size: 0.875rem; /* 14px */
//   // line-height: 1.25rem; /* 20px */
//   // text-base	font-size: 1rem; /* 16px */
//   // line-height: 1.5rem; /* 24px */
//   // text-lg	font-size: 1.125rem; /* 18px */
//   // line-height: 1.75rem; /* 28px */
//   // text-xl	font-size: 1.25rem; /* 20px */
//   // line-height: 1.75rem; /* 28px */
//   // text-2xl	font-size: 1.5rem; /* 24px */
//   // line-height: 2rem; /* 32px */
//   // text-3xl	font-size: 1.875rem; /* 30px */
//   // line-height: 2.25rem; /* 36px */
//   // text-4xl	font-size: 2.25rem; /* 36px */
//   // line-height: 2.5rem; /* 40px */
//
//   return {
//     // text-sm	font-size: 0.875rem; /* 14px */
//     // line-height: 1.25rem; /* 20px */
//     // text-xs	font-size: 0.75rem; /* 12px */
//     // line-height: 1rem; /* 16px */
//     "xs": ["0.75rem", {lineHeight: "1.25rem"}],
//     "sm": ["0.875rem", {lineHeight: "1.375rem"}],
//     "base": ["1.rem", {lineHeight: "1.5rem"}],
//   }
// }
