import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

export default function InventoryStatus({ data }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const inventoryData = [
    {
      name: t("inStock"),
      value: parseInt(data?.in_stock) || 0,
      color: "#5EAAA8",
    },
    {
      name: t("lowStock"),
      value: parseInt(data?.low_stock) || 0,
      color: "#E0A75E",
    },
    {
      name: t("outOfStock"),
      value: parseInt(data?.out_of_stock) || 0,
      color: "#D22B2B",
    },
  ];

  const totalStock = inventoryData.reduce((sum, item) => sum + item.value, 0);

  if (totalStock === 0) {
    return (
      <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-16">{t("inventoryStatus")}</h3>
        </div>
        <div className="h-[220px] text-14 flex items-center justify-center text-gray-400">
          {t("noInventory")}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 border-1 border-gray-200 rounded-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-16">{t("inventoryStatus")}</h3>
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold text-primary">
          {totalStock.toLocaleString()}
        </div>
        <div className="text-sm">{t("stock")}</div>

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
                labelLine={false}
                label={({ name, percent, x, y }) => (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="12"
                    fill="#333"
                    direction={isRTL ? "rtl" : "ltr"}
                    style={{ fontWeight: "bold" }}
                  >
                    {`${name}: ${(percent * 100).toFixed(0)}%`}
                  </text>
                )}
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} items`, "Quantity"]} />
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
                {item.value} ({((item.value / totalStock) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
