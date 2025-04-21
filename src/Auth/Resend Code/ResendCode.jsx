import axios from "axios";
import React from "react";
function ResendCode() {
  const resndCode = async () => {
    const email = localStorage.getItem("Email Admin");
    const response = await axios({
      url: "https://demo.vrtex.duckdns.org/api/shop/send-otp",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email },
    });
    if (response.status === 200) {
      console.log("Resend code successfully");
    } else {
      console.error("Failed to resend code");
    }
  };
  return (
    <div>
      <p
        onClick={resndCode}
        className="font-bold text-primary text-15 cursor-pointer"
      >
        Resend
      </p>
    </div>
  );
}
export default ResendCode;