import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
export default function CompletionRate({ products = [], title, subtitle }) {
  const [sortBy, setSortBy] = useState("quantity");
  const { t } = useTranslation();
  if (!products || products.length === 0) {
    return (
      <section className="bg-white p-4 border-1 border-gray-200 rounded-md mb-5">
        <h3 className="font-bold text-16">{title}</h3>
        <div className="text-12">{subtitle}</div>
        <div className="h-[200px] flex items-center text-14 justify-center text-gray-400 mt-4">
          {t("noData")}
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

  const maxQuantity = Math.max(
    ...sortedProducts.map((p) => parseInt(p.quantity)),
    1
  );

  return (
    <section className="bg-white border-1 border-gray-200 p-5 rounded-md mb-5 compeletion">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-16">{title}</h3>
          <div className="text-14 mt-2 text-gray-500">{subtitle}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-14 font-bold">{t("stortBy")}</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="quantity">{t("quantity")}</option>
            <option value="name">{t("name")}</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {sortedProducts.map((product, index) => {
          const percentage = (parseInt(product.quantity) / maxQuantity) * 100;
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-13 text-gray-500">{product.name}</span>
                <span className="text-13 text-gray-500">
                  {percentage.toFixed(0)}% ({product.quantity})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-md h-4">
                <div
                  className="bg-[#E0A75E] h-4 rounded-md"
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
