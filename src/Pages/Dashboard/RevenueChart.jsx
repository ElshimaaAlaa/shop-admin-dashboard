import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("default", { month: "short" });
}

export default function RevenueChart({ data }) {
  const chartData = data?.map(item => ({
    name: getMonthName(item.month),
    revenue: parseFloat(item.revenue) || 0
  }));

  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
        <h3 className="font-bold text-16 mb-4">Monthly Revenue</h3>
        <div className="h-[300px] text-14 flex items-center justify-center text-gray-400">
          No revenue data available
        </div> 
      </div>
    );
  }

  return (
    <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
      <h3 className="font-bold text-16 mb-4">Monthly Revenue</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}