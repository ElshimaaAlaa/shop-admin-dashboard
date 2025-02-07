/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightgray: "#F7F7F7",
        primary: "#E0A75E",
        customred:"#DC2626",
        customOrange: {
          lightOrange: "#FCEFDB",
          mediumOrange: "#EFD9A466",
          darkOrange: "#D17D2B",
        },
      },
      width: {
        1: "1px",
        "460px":"460px",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      height: {
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
        "110vh": "110vh",
        "115vh": "115vh",
        "120vh": "120vh",
        "130vh": "130vh",
        "140vh": "140vh",
        "150vh": "150vh",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};