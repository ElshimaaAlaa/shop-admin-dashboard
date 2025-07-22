import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  FaSackDollar,
  FaMagnifyingGlassDollar,
  FaMoneyBillWave,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import MonthlyTrendChart from "./MonthlyTrendChart";
import StatisticsCard from "../Pages/Dashboard/ReportItems";
import Delete from "./DeleteProduct";
import { fetchAnalyticsData } from "../ApiServices/Analytics";
import { useTranslation } from "react-i18next";
function Analytics() {
  const { t } = useTranslation();
  const [analyticsData, setAnalyticsData] = useState({
    monthly_expended: [],
    monthly_income: [],
    monthly_profit: [],
    overview: {
      total_expended: { amount: 0, change_rate: "0%", increased: false },
      total_income: { amount: 0, change_rate: "0%", increased: false },
      total_profit: { amount: 0, change_rate: "0%", increased: false },
    },
    popular_products: [],
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const response = await fetchAnalyticsData();

        if (response && Array.isArray(response.monthly_expended)) {
          setAnalyticsData(response);
        } else if (response?.data) {
          setAnalyticsData(response.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        setError(error.message);
        console.error("Analytics data fetch error:", error);
      }
    };
    getAnalyticsData();
  }, []);

  const handleDeleteProduct = (productId) => {
    setAnalyticsData((prev) => ({
      ...prev,
      popular_products: prev.popular_products.filter(
        (product) => product.id !== productId
      ),
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const hasFinancialData =
    analyticsData.monthly_expended.some(
      (item) => parseFloat(item.expended) > 0
    ) ||
    analyticsData.monthly_income.some((item) => parseFloat(item.income) > 0) ||
    analyticsData.monthly_profit.some((item) => parseFloat(item.profit) > 0);

  if (error) {
    return (
      <div className="bg-gray-100 min-h-[89vh] mx-5 pt-5 pb-10">
        <div className="bg-white rounded-md p-5 mb-5 text-center py-10">
          <h2 className="text-red-500 text-lg font-bold mb-2">{t("error")}</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            {t("retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-[89vh] mx-5 pt-5 pb-10">
      <Helmet>
        <title>
          {t("reports")} | {t("vertex")}
        </title>
      </Helmet>

      <section className="bg-white mb-2 p-4 rounded-md">
        <p className="text-gray-400 text-13">{t("reportMenu")}</p>
        <h1 className="font-bold text-17 mt-2">{t("analytics")}</h1>
      </section>

      <div className="bg-white rounded-md p-5 mb-5">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
          <StatisticsCard
            icon={FaMoneyBillWave}
            title={t("totalExpend")}
            totalNumber={analyticsData.overview.total_expended.amount}
            percentage={analyticsData.overview.total_expended.change_rate}
            duration={t("lastMonth")}
            increased={analyticsData.overview.total_expended.increased}
          />
          <StatisticsCard
            icon={FaMagnifyingGlassDollar}
            title={t("totalIncome")}
            totalNumber={analyticsData.overview.total_income.amount}
            percentage={analyticsData.overview.total_income.change_rate}
            duration={t("lastMonth")}
            increased={analyticsData.overview.total_income.increased}
          />
          <StatisticsCard
            icon={FaSackDollar}
            title={t("totalProfit")}
            totalNumber={analyticsData.overview.total_profit.amount}
            percentage={analyticsData.overview.total_profit.change_rate}
            duration={t("lastMonth")}
            increased={analyticsData.overview.total_profit.increased}
          />
        </section>

        <MonthlyTrendChart
          monthlyExpended={analyticsData.monthly_expended}
          monthlyIncome={analyticsData.monthly_income}
          monthlyProfit={analyticsData.monthly_profit}
          hasData={hasFinancialData}
        />
        <section className="mt-10">
          <h3 className="font-bold text-17 mb-4">{t("topProducts")}</h3>
          {analyticsData.popular_products.length === 0 ? (
            <div className="text-center py-3 border-1 border-gray-200 bg-gray-50 rounded-lg">
              <p className="text-gray-400 mb-2 text-15">
                {t("noData")}
              </p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("product")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("price")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("stock")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("color")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.popular_products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={
                                product.images?.[0]?.src ||
                                "/assets/images/default-product.png"
                              }
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(product.price || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          {product.colors?.slice(0, 4).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full border-2 border-white"
                              style={{ backgroundColor: color.code }}
                              title={color.name}
                            />
                          ))}
                          {product.colors?.length > 4 && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold">
                              +{product.colors.length - 4}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              navigate(`/Dashboard/EditProduct/${product.id}`, {
                                state: { product },
                              })
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                        {t("edit")}
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
          )}
        </section>
      </div>
    </div>
  );
}
export default Analytics;