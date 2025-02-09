import axios from "axios";
import React from "react";
function ResendCode() {
  const resndCode = async () => {
    const email = localStorage.getItem("Email Admin");
    const response = await axios({
      url:"https://vrtex.duckdns.org/api/admin/send-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data:{email},
      }
    );
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
        className="font-bold text-primary ms-1 cursor-pointer"
        style={{fontSize:'16px'}}
      >
        Resend
      </p>
    </div>
  );
}
export default ResendCode;