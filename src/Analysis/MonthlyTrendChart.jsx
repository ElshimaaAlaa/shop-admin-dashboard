import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function MonthlyTrendChart({ monthlyExpended, monthlyIncome, monthlyProfit }) {
  const [activeTab, setActiveTab] = useState("Expend");
  const { t } = useTranslation();
  const transformData = () => {
    return monthNames.map((name, index) => {
      const monthNumber = index + 1;
      const expended =
        monthlyExpended.find((item) => item.month === monthNumber)?.expended ||
        "0";
      const income =
        monthlyIncome.find((item) => item.month === monthNumber)?.income || "0";
      const profit =
        monthlyProfit.find((item) => item.month === monthNumber)?.profit || "0";

      return {
        name,
        Expend: parseFloat(expended),
        Income: parseFloat(income),
        Profit: parseFloat(profit),
      };
    });
  };

  const chartData = transformData();
  return (
    <div className="mt-5 border-1 border-gray-200 rounded-lg p-4">
      <h3 className="font-bold text-17 mb-4">{t("monthlyTrend")}</h3>

      <div className="flex mb-4 justify-center md:justify-end ">
        {[t("expend"), t("income"), t("profit")].map((tab) => (
          <button
            key={tab}
            className={`p-2 rounded-md text-14 w-24 font-medium border-1 border-gray-200 transition-colors ${
              activeTab === tab ? "bg-[#E0A75E] text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, activeTab]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                padding: "0.5rem",
              }}
            />
            <Bar
              dataKey={activeTab}
              fill="#5EADB5"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default MonthlyTrendChart;