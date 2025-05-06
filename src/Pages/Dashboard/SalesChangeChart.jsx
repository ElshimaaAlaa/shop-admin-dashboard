"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronRight } from "lucide-react";

export default function SalesChangeChart({ rate }) {
  // Generate sample data based on the rate
  const generateData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: i,
      value: Math.sin(i / 2) * 30 + 50 + (rate || 0) + Math.random() * 10,
    }));
  };

  const data = generateData();

  return (
    <div className="bg-white p-5 rounded-md">
      <h3 className="font-bold text-lg">Sales Change Rate</h3>
      <div className="text-xs text-gray-500">Jan 01 - Dec 31</div>
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
      <div className="flex flex-col mt-4">
        <div
          className={`text-3xl font-bold ${
            rate >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {rate >= 0 ? "+" : ""}
          {rate}%
        </div>
        <div className="text-sm text-gray-600">
          Your sales performance is {Math.abs(rate)}%{" "}
          {rate >= 0 ? "better" : "worse"} compared to last month.
        </div>
        <button className="text-orange-400 flex items-center text-sm mt-2">
          View Details <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
