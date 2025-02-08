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
        "300px":"300px",
        "360px":"360px",
        "460px":"460px",
        "500px":"500px",
        "530px":"530px",
        "550px":"550px",
        "560px":"560px",
        "600px":"600px",
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
      fontSize:{
        "11":"11px",
        "12":"12px",
        "13":"13px",
        "14":"14px",
        "15":"15px",
        "16":"16px",
        "17":"17px",
      },
      gap:{
        "360px":"360px"
      }
    },
  },
  plugins: [],
};