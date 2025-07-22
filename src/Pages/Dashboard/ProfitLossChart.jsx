import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("default", { month: "short" });
}

export default function ProfitLossChart({ data }) {
  const { t } = useTranslation();
  if (!data?.monthly_expended || data.monthly_expended.length === 0) {
    return (
      <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-16">{t("profitLoss")}</h3>
        </div>
        <div className="h-[300px] text-14 flex items-center justify-center text-gray-400">
          {t("noProfit")}
        </div>
      </div>
    );
  }

  const chartData = data.monthly_expended.map((item, index) => ({
    name: getMonthName(item.month),
    expend: parseFloat(item.expended) || 0,
    income: parseFloat(data.monthly_income[index]?.income) || 0,
    profit: parseFloat(data.monthly_profit[index]?.profit) || 0,
  }));

  const maxValue = Math.max(
    ...chartData.map((item) => Math.max(item.expend, item.income, item.profit))
  );

  return (
    <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-16">{t("profitLoss")}</h3>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e0e0e0" }}
              tickLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              domain={[0, maxValue * 1.1]}
              axisLine={{ stroke: "#e0e0e0" }}
              tickLine={{ stroke: "#e0e0e0" }}
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                fontSize: 12,
                borderRadius: "4px",
                border: "1px solid #e0e0e0",
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: 12,
                paddingTop: "20px",
              }}
            />
            <Bar
              dataKey="expend"
              fill="#5EAAA8"
              name={t("expense")}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="income"
              fill="#E0A75E"
              name={t("income")}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="profit"
              fill="#EB8A90"
              name={t("profit")}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}