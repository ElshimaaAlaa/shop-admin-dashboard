"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { ChevronRight } from "lucide-react"

export default function ProfitLossChart({ data }) {
  // Transform API data into chart format
  const chartData = data?.monthly_expended?.map((item, index) => ({
    name: getMonthName(item.month),
    expand: parseFloat(item.expended) || 0,
    income: parseFloat(data.monthly_income[index]?.income) || 0,
    profit: parseFloat(data.monthly_profit[index]?.profit) || 0
  }))

  // Helper function to get month name from number
  function getMonthName(monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString('default', { month: 'short' })
  }

  // Calculate max value for Y-axis domain
  const maxValue = Math.max(
    ...(chartData?.map(item => Math.max(item.expand, item.income, item.profit)) || [0])
  )

  return (
    <div className="bg-white p-5 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Profit & Loss</h3>
        <button className="text-orange-400 flex items-center text-sm">
          View Report <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="h-[300px]">
        {chartData?.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `$${value.toLocaleString()}`} 
                domain={[0, maxValue * 1.1]} // Add 10% padding
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar dataKey="expand" fill="#5EAAA8" name="Expenses" radius={[4, 4, 0, 0]} />
              <Bar dataKey="income" fill="#F7D59C" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#EB8A90" name="Profit" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No profit/loss data available
          </div>
        )}
      </div>
    </div>
  )
}