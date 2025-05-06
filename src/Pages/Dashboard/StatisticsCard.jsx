"use client";

import { SiSimpleanalytics } from "react-icons/si";
import { HiCurrencyDollar } from "react-icons/hi2";
import { LiaShippingFastSolid } from "react-icons/lia";
import { HiShoppingBag } from "react-icons/hi2";

const iconComponents = {
  sales: SiSimpleanalytics,
  revenue: HiCurrencyDollar,
  orders: LiaShippingFastSolid,
  products: HiShoppingBag,
};

const formatNumber = (num) => {
  if (!num) return "0";
  return parseFloat(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function StatisticsCard({ type, data }) {
  const Icon = iconComponents[type];
  const titles = {
    sales: "Total Sales",
    revenue: "Total Revenue",
    orders: "Total Orders",
    products: "Total Products",
  };

  // Extract the numeric value from change_rate string (e.g., "919.96% من الشهر الماضي")
  const changeRateValue = parseFloat(data?.change_rate?.split("%")[0]) || 0;
  const isIncreased = data?.increased || changeRateValue >= 0;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-white">
          <Icon className="text-orange-400 text-xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{titles[type]}</p>
          <p className="font-bold text-xl">${formatNumber(data?.amount)}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span
          className={`text-sm ${
            isIncreased ? "text-green-500" : "text-red-500"
          }`}
        >
          {changeRateValue >= 0 ? "+" : ""}
          {changeRateValue}%
        </span>
        <span className="text-xs text-gray-400">
          Last month: ${formatNumber(data?.last_month)}
        </span>
      </div>
    </div>
  );
}
