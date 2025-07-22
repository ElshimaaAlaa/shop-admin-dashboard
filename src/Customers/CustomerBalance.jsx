import { HiCurrencyDollar } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
export const CustomerBalance = ({ balance }) => {
  const { t } = useTranslation();
  return (
    <section className="flex items-center justify-between rounded-md border-1 border-primary bg-customOrange-mediumOrange p-3">
      <h3 className="text-gray-600 text-15 flex items-center gap-1">
        <HiCurrencyDollar color="#E0A75E" size={30} />
        {t("currentBalance")}
      </h3>
      <p className="font-bold text-xl">$ {balance}</p>
    </section>
  );
};