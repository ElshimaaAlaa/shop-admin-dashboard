import { useTranslation } from "react-i18next";

function DesktopButtons({ onLoginClick, onRegisterClick }) {
  const { t } = useTranslation();
  
  return (
    <div className="hidden lg:flex gap-4">
      <button
        className="text-primary w-24 rtl:w-32 py-3 rounded-md font-bold hover:bg-primary hover:text-white focus:bg-primary focus:text-white border-2 border-primary"
        onClick={onLoginClick}
        aria-label="Open Login Modal"
      >
        {t("login")}
      </button>
      <button
        className="text-primary w-28 py-3 rounded-md font-bold hover:bg-primary hover:text-white focus:bg-primary focus:text-white border-2 border-primary"
        onClick={onRegisterClick}
        aria-label="Open Register Modal"
      >
        {t("register")}
      </button>
    </div>
  );
}
export default DesktopButtons;