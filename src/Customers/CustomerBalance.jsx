import { HiCurrencyDollar } from "react-icons/hi2";

export const CustomerBalance = ({ balance }) => (
  <section className="flex items-center justify-between rounded-md border-1 border-primary bg-customOrange-mediumOrange p-3">
    <h3 className="text-gray-600 text-15 flex items-center gap-1">
      <HiCurrencyDollar color="#E0A75E" size={30} />
      Current Balance
    </h3>
    <p className="font-bold text-xl">$ {balance}</p>
  </section>
);
