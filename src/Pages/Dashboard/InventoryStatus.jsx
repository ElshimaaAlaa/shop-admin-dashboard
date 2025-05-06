"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

export default function InventoryStatus({ data }) {
  const [category, setCategory] = useState("all");

  // Prepare chart data from API
  const inventoryData = [
    {
      name: "In Stock",
      value: parseInt(data?.in_stock) || 0,
      color: "#5EAAA8",
    },
    {
      name: "Low Stock",
      value: parseInt(data?.low_stock) || 0,
      color: "#F7D59C",
    },
    {
      name: "Out Of Stock",
      value: parseInt(data?.out_of_stock) || 0,
      color: "#EB8A90",
    },
  ];

  // Calculate total stock
  const totalStock = inventoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-5 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Inventory Status</h3>
        <select
          className="border rounded-md px-2 py-1 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="furniture">Furniture</option>
        </select>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-orange-400">
          {totalStock.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Total Items in Inventory</div>

        {totalStock > 0 ? (
          <>
            <div className="h-[220px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} items`, "Quantity"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-around w-full mt-4">
              {inventoryData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-medium">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold mt-1">
                    {item.value} ({((item.value / totalStock) * 100).toFixed(0)}
                    %)
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-gray-500">
            No inventory data available
          </div>
        )}
      </div>
    </div>
  );
}
