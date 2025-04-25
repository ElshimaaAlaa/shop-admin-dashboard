import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaSackDollar } from "react-icons/fa6";
import { FaMagnifyingGlassDollar } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { fetchAnalyticsData } from "../ApiServices/Analytics";
import { ClipLoader } from "react-spinners";
import Delete from "./DeleteProduct";
import { useNavigate } from "react-router-dom";
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

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    monthly_expended: [],
    monthly_income: [],
    monthly_profit: [],
    overview: {},
    popular_products: [],
  });
  const [statistics, setStatistics] = useState({});
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeChart, setActiveChart] = useState("expended");
  const navigate = useNavigate();

  useEffect(() => {
    const getAnalyticsData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAnalyticsData();
        console.log(response);
        setAnalyticsData(response);
        setStatistics(response);
        setProductData(response.popular_products || []);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error(error);
      }
    };
    getAnalyticsData();
  }, []);

  const prepareChartData = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return months.map((month) => {
      const expendedItem = analyticsData.monthly_expended?.find(
        (item) => item.month === month
      ) || { expended: "0.00" };
      const incomeItem = analyticsData.monthly_income?.find(
        (item) => item.month === month
      ) || { income: "0.00" };
      const profitItem = analyticsData.monthly_profit?.find(
        (item) => item.month === month
      ) || { profit: "0.00" };

      return {
        name: `Month ${month}`,
        expended: parseFloat(expendedItem.expended),
        income: parseFloat(incomeItem.income),
        profit: parseFloat(profitItem.profit),
      };
    });
  };

  const chartData = prepareChartData();

  const ReportsItem = ({
    icon: Icon,
    title,
    totalNumber,
    percentage,
    duration,
  }) => (
    <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px]">
      <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md p-4 mb-5">
        <Icon className="text-2xl text-primary" />
        <h3 className="text-gray-600 text-14">{title}</h3>
      </div>
      <div className="flex items-center gap-4 ps-4">
        <h1 className="text-2xl font-bold">{totalNumber}</h1>
        <p
          className={`text-13 font-bold rounded-md p-1 ${
            percentage?.includes("+") || percentage?.includes("زيادة")
              ? "text-[#34B41E] bg-[#E7F6E5]"
              : "text-red-600 bg-red-50"
          }`}
        >
          {percentage}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-3 mb-3 ps-4">{duration}</p>
    </div>
  );

  const handleDeleteProduct = (productId) => {
    setProductData((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );
      return updatedProducts;
    });
  };

  return (
    <div className="bg-gray-100 min-h-[89vh] mx-10 pt-5 pb-10">
      <Helmet>
        <title>Reports | VERTEX</title>
      </Helmet>
      <div className="bg-white mb-3 p-4 rounded-md">
        <p className="text-gray-400 text-13">Menu / Analytics & Reports</p>
        <h1 className="font-bold text-17 mt-3">Analytics & Reports</h1>
      </div>
      <div className="bg-white rounded-md p-8 mb-5">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReportsItem
            icon={FaMoneyBillWave}
            title="Total Expend "
            totalNumber={statistics?.overview?.total_expended?.amount}
            percentage={`${statistics?.overview?.total_expended?.change_rate} % vs. previous month`}
            duration={`Last month: ${0}`}
          />
          <ReportsItem
            icon={FaMagnifyingGlassDollar}
            title="Total Income"
            totalNumber={statistics?.overview?.total_income?.amount}
            percentage={`${statistics?.overview?.total_income?.change_rate} % vs. previous month`}
            duration={`Last month: ${0}`}
          />
          <ReportsItem
            icon={FaSackDollar}
            title="Total Profit "
            totalNumber={statistics?.overview?.total_profit?.amount}
            percentage={`${statistics?.overview?.total_profit?.change_rate} % vs. previous month`}
            duration={`Last month: ${0}`}
          />
        </section>

        {/* Analytics Chart Section with Recharts */}
        <section className="mt-8 border border-gray-100 rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-17">Monthly Trend</h3>
            <div className="flex gap-2 border-1 border-gray-100 rounded-md">
              <button
                onClick={() => setActiveChart("expended")}
                className={`p-3 w-24 rounded text-14 font-medium ${
                  activeChart === "expended"
                    ? "bg-primary text-white"
                    : " text-gray-400"
                }`}
              >
                Expend
              </button>
              <button
                onClick={() => setActiveChart("income")}
                className={`p-3 w-24 rounded text-14 font-medium ${
                  activeChart === "income"
                    ? "bg-primary text-white"
                    : " text-gray-400"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setActiveChart("profit")}
                className={`p-3 w-24 rounded text-14 font-medium ${
                  activeChart === "profit"
                    ? "bg-primary text-white"
                    : " text-gray-400"
                }`}
              >
                Profit
              </button>
            </div>
          </div>

          <div className="bg-white h-96">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <ClipLoader color="#E0A75E" size={40} />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    formatter={(value) => [
                      `$${value}`,
                      activeChart === "expended"
                        ? "Expenditure"
                        : activeChart === "income"
                        ? "Income"
                        : "Profit",
                    ]}
                    labelFormatter={(label) => label}
                  />
                  <Legend />
                  {activeChart === "expended" && (
                    <Bar
                      dataKey="expended"
                      name="Expenditure"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                  {activeChart === "income" && (
                    <Bar
                      dataKey="income"
                      name="Income"
                      fill="#82ca9d"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                  {activeChart === "profit" && (
                    <Bar
                      dataKey="profit"
                      name="Profit"
                      fill="#ffc658"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* Products Section (unchanged) */}
        <section>
          <h3 className="font-bold text-17 mt-6 mb-3">Top Selling Products</h3>
          {error ? (
            <div className="text-red-500 text-center mt-10">
              Failed to fetch products. Please try again.
            </div>
          ) : isLoading ? (
            <div className="flex justify-center mt-10">
              <ClipLoader color="#E0A75E" size={40} />
            </div>
          ) : productData.length === 0 ? (
            <div className="text-gray-400 text-center mt-10">
              No products available
            </div>
          ) : (
            <>
              <div className="border border-gray-200 rounded-lg overflow-hidden mt-5">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 border-b border-r ">
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary border-gray-300"
                          />
                          Product
                        </p>
                      </th>
                      <th className="px-3 py-3 border-r border-b text-left">
                        Price
                      </th>
                      <th className="px-3 py-3 border-r border-b text-left">
                        Stock
                      </th>
                      <th className="px-3 py-3 border-r text-left border-b ">
                        Colors
                      </th>
                      <th className="px-3 py-3 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-3 py-3 border-t border-r text-gray-600 text-15 ">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary border-gray-300"
                            />
                            <img
                              className="h-7 w-7 rounded-full object-cover"
                              src={
                                product.images?.[0]?.src ||
                                "/assets/images/default-product.png"
                              }
                              alt={product.name}
                            />
                            {product.name}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-600 text-15 border-t border-l">
                          ${product.price?.toFixed(2) || "0.00"}
                        </td>
                        <td className="px-3 text-gray-600 text-15 py-3 border-t border-l">
                          {product.stock}
                        </td>
                        <td className="px-6 py-3 border-t border-l">
                          <div className="flex">
                            {product.colors?.slice(0, 4).map((color, idx) => (
                              <div
                                key={idx}
                                className="w-8 h-8 -ms-3 rounded-full border-2 border-white"
                                style={{ backgroundColor: color.code }}
                                title={color.name}
                              />
                            ))}
                            {product.colors?.length > 4 && (
                              <div className="w-8 h-8 -ms-3 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold">
                                +{product.colors.length - 4}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 border-t border-l w-20">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  `/Dashboard/EditProduct/${product.id}`,
                                  {
                                    state: { product },
                                  }
                                );
                              }}
                              className="text-primary hover:text-primary-dark"
                            >
                              <img
                                src="/assets/svgs/editIcon.svg"
                                alt="Edit"
                                className="w-6 h-6"
                              />
                            </button>
                            <Delete
                              id={product.id}
                              onDelete={handleDeleteProduct}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Analytics;
