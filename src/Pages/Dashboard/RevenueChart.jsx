"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }) {
  const chartData = data?.map((item) => ({
    name: `Month ${item.month}`,
    value: parseFloat(item.revenue) || 0,
  }));

  return (
    <div className="bg-white p-5 rounded-md">
      <h3 className="font-bold text-lg">The Revenue Generated</h3>
      <div className="text-2xl font-bold">
        ${chartData?.reduce((sum, item) => sum + item.value, 0).toFixed(2) || 0}
      </div>
      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis hide />
            <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
            <Bar dataKey="value" fill="#F7D59C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span className="text-xs">Current Revenue</span>
        </div>
      </div>
    </div>
  );
}
