import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
export default function SalesChangeChart({ rate }) {
  // Generate sample data based on the rate
  const generateData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: i,
      value: Math.sin(i / 2) * 30 + 50 + (rate || 0) + Math.random() * 10,
    }));
  };

  const data = generateData();
  const { t } = useTranslation();
  return (
    <div className="bg-white border-1 border-gray-200 p-4 rounded-md h-[400px]">
      <h3 className="font-bold text-16 text-center">{t("saleChange")}</h3>
      <div className="text-12 text-gray-400 text-center mt-1">
        Jan 01 - Dec 31
      </div>
      <div className="h-[200px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5EAAA8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#5EAAA8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#5EAAA8"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center items-center mt-7 gap-2">
        <div
          className={`text-xl font-bold ${
            rate >= 0 ? "text-green-500" : "text-black"
          }`}
        >
          {rate >= 0 ? "+" : ""}
          {rate}%
        </div>
        <div className="text-13 text-gray-500 font-extralight text-center leading-normal">
          {t("per1")} {Math.abs(rate) || "0"}% <br />
          {t("per2")}
        </div>
      </div>
    </div>
  );
}
