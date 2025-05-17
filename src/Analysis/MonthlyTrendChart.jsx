import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function MonthlyTrendChart({ monthlyExpended, monthlyIncome, monthlyProfit }) {
  const [activeTab, setActiveTab] = useState("Expend")

  const transformData = () => {
    return monthNames.map((name, index) => {
      const monthNumber = index + 1
      const expended = monthlyExpended.find((item) => item.month === monthNumber)?.expended || "0"
      const income = monthlyIncome.find((item) => item.month === monthNumber)?.income || "0"
      const profit = monthlyProfit.find((item) => item.month === monthNumber)?.profit || "0"

      return {
        name,
        Expend: parseFloat(expended),
        Income: parseFloat(income),
        Profit: parseFloat(profit),
      }
    })
  }

  const chartData = transformData()

  return (
    <div className="mt-5 border-1 border-gray-200 rounded-lg p-6">
      <h3 className="font-bold text-17 mb-4">Monthly Trend</h3>
      <div className="flex my-5 justify-end">
        <button
          className={`px-6 py-3 rounded-md text-15 border-1 border-gray-100 ${
            activeTab === "Expend" ? "bg-[#E0A75E] text-white" : "bg-gray-50 text-gray-400"
          }`}
          onClick={() => setActiveTab("Expend")}
        >
          Expend
        </button>
        <button
          className={`px-6 py-2 rounded-md text-15 border-1 border-gray-100 ${
            activeTab === "Income" ? "bg-[#E0A75E] text-white" : "bg-gray-50 text-gray-400"
          }`}
          onClick={() => setActiveTab("Income")}
        >
          Income
        </button>
        <button
          className={`px-6 py-2 rounded-md text-15 border-1 border-gray-100 ${
            activeTab === "Profit" ? "bg-[#E0A75E] text-white" : "bg-gray-50 text-gray-400"
          }`}
          onClick={() => setActiveTab("Profit")}
        >
          Profit
        </button>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ right: 20 }} // Adjust right margin 
            barCategoryGap={10} // Reduced gap between categories 
          >
            <CartesianGrid vertical={false} strokeDasharray="1 1" />
            <XAxis 
              className="text-12 pt-5" 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              interval={0} // Ensure 
            />
            <YAxis
              className="text-14 pe-5"
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              ticks={[0, 50, 100]}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, activeTab]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar
              dataKey={activeTab}
              fill="#5EADB5"
              radius={[20, 20, 20, 20]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default MonthlyTrendChart