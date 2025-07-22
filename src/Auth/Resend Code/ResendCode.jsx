import axios from "axios";
import { useTranslation } from "react-i18next";
function ResendCode() {
  const live_shop_domain = sessionStorage.getItem("live_shop_domain");
  const role = sessionStorage.getItem("role");
  const { t } = useTranslation();
  const resndCode = async () => {
    const email = localStorage.getItem("shop admin email");
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/send-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ar",
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
        {t("resend")}
      </p>
    </div>
  );
}
export default ResendCode;