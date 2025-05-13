import { useState } from "react";

export default function CompletionRate({ products, title, subtitle }) {
  const [sortBy, setSortBy] = useState("quantity");

  if (!products || products.length === 0) {
    return (
      <section className="bg-white p-4 border-1 border-gray-200 rounded-md mb-5">
        <h3 className="font-bold text-16">{title}</h3>
        <div className="text-12">{subtitle}</div>
        <div className="h-[200px] flex items-center text-14 justify-center text-gray-400 mt-4">
          No product data available
        </div>
      </section>
    );
  }
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "quantity") {
      return parseInt(b.quantity) - parseInt(a.quantity);
    }
    return a.name.localeCompare(b.name);
  });

  const maxQuantity = Math.max(...sortedProducts.map(p => parseInt(p.quantity)), 1);

  return (
    <section className="bg-white p-5 rounded-md mb-5 h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="quantity">Quantity</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {sortedProducts.map((product, index) => {
          const percentage = (parseInt(product.quantity) / maxQuantity) * 100;
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{product.name}</span>
                <span>{percentage.toFixed(0)}% ({product.quantity})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-[#F7D59C] h-2.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}