import { useEffect, useState } from "react";
import { getHome } from "../../ApiServices/Home";
import ProfitLossChart from "./ProfitLossChart";
import InventoryStatus from "./InventoryStatus";
import RevenueChart from "./RevenueChart";
import SalesChangeChart from "./SalesChangeChart";
import CompletionRate from "./CompletionRate";
import { HiCurrencyDollar } from "react-icons/hi2";
import { LiaShippingFastSolid } from "react-icons/lia";
import { HiShoppingBag } from "react-icons/hi2";
import { IoArrowForwardSharp } from "react-icons/io5";
import StatisticsCard from "./StatisticsCard";
import { SiGoogleanalytics } from "react-icons/si";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await getHome();
        setDashboardData(response);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen pt-5 mx-5 pb-5">
      {/* Statistics Section */}
      <section className="bg-white p-5 rounded-md mb-3">
        <h3 className="font-bold text-17 mb-3">{t("statstic")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <StatisticsCard
            icon={SiGoogleanalytics}
            title={t("totalSales")}
            totalNumber={dashboardData?.overview?.total_sales?.amount || 0}
            percentage={
              dashboardData?.overview?.total_sales?.change_rate || "0%"
            }
            increased={dashboardData?.overview?.total_sales?.increased}
          />
          <StatisticsCard
            icon={HiCurrencyDollar}
            title={t("totalRevenue")}
            totalNumber={dashboardData?.overview?.total_revenue?.amount || 0}
            percentage={
              dashboardData?.overview?.total_revenue?.change_rate || "0%"
            }
            increased={dashboardData?.overview?.total_revenue?.increased}
          />
          <StatisticsCard
            icon={LiaShippingFastSolid}
            title={t("totalOrders")}
            totalNumber={dashboardData?.overview?.total_orders?.amount || 0}
            percentage={
              dashboardData?.overview?.total_orders?.change_rate || "0%"
            }
            increased={dashboardData?.overview?.total_orders?.increased}
          />
          <StatisticsCard
            icon={HiShoppingBag}
            title={t("totalProducts")}
            totalNumber={dashboardData?.overview?.total_products?.amount || 0}
            percentage={
              dashboardData?.overview?.total_products?.change_rate || "0%"
            }
            increased={dashboardData?.overview?.total_products?.increased}
          />
        </div>
      </section>
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
        <ProfitLossChart data={dashboardData?.profit_and_loss} />
        <InventoryStatus data={dashboardData?.inventory_status} />
      </div>
      {/* Completion Rate Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <RevenueChart data={dashboardData?.monthly_revenue} />
        <SalesChangeChart rate={dashboardData?.sales_change_rate} />
        <CompletionRate
          products={dashboardData?.popular_products}
          title={t("completiobRate")}
          subtitle={t("topProduct")}
        />
      </div>
      {/* Low Stock Products Section */}
      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-16">{t("outStock")}</h3>
          <button className="text-white bg-primary p-3 rounded-md font-bold flex justify-center items-center gap-2 text-15">
            {t("viewDetails")} <IoArrowForwardSharp size={19} />
          </button>
        </div>
      </section>
    </div>
  );
}