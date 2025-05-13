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
import { IoArrowForwardSharp } from "react-icons/io5";
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("default", { month: "short" });
}
export default function ProfitLossChart({ data }) {
  if (!data?.monthly_expended || data.monthly_expended.length === 0) {
    return (
      <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-16">Profit & Loss</h3>
          <button className="text-primary flex items-center text-15 gap-2 font-bold">
            View Report <IoArrowForwardSharp size={19}/>
          </button>
        </div>
        <div className="h-[300px] text-14 flex items-center justify-center text-gray-400">
          No profit / loss data available
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
        <h3 className="font-bold text-16">Profit & Loss</h3>
        <button className="text-primary flex items-center text-15 gap-2 font-bold">
          View Report <IoArrowForwardSharp size={19}/>
        </button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              domain={[0, maxValue * 1.1]}
            />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Bar
              dataKey="expend"
              fill="#5EAAA8"
              name="Expenses"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="income"
              fill="#F7D59C"
              name="Income"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="profit"
              fill="#EB8A90"
              name="Profit"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}