"use client"

import { useEffect, useState } from "react"
import { getHome } from "../../ApiServices/Home"
import StatisticsCard from "./StatisticsCard"
import ProfitLossChart from "./ProfitLossChart"
import InventoryStatus from "./InventoryStatus"
import RevenueChart from "./RevenueChart"
import SalesChangeChart from "./SalesChangeChart"
import CompletionRate from "./CompletionRate"
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await getHome()
        setDashboardData(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!dashboardData) {
    return <div className="min-h-screen flex items-center justify-center">Failed to load data</div>
  }

  return (
    <div className="min-h-screen pt-3 mx-3">
      {/* Statistics Section */}
      <section className="bg-white p-5 rounded-md mb-5">
        <h3 className="font-bold text-lg mb-4">Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <StatisticsCard 
            type="sales" 
            data={dashboardData.overview.total_sales} 
          />
          <StatisticsCard 
            type="revenue" 
            data={dashboardData.overview.total_revenue} 
          />
          <StatisticsCard 
            type="orders" 
            data={dashboardData.overview.total_orders} 
          />
          <StatisticsCard 
            type="products" 
            data={dashboardData.overview.total_products} 
          />
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <ProfitLossChart data={dashboardData.profit_and_loss} />
        <InventoryStatus data={dashboardData.inventory_status} />
        <RevenueChart data={dashboardData.monthly_revenue} />
        <SalesChangeChart rate={dashboardData.sales_change_rate} />
      </div>

      {/* Completion Rate Section */}
      <CompletionRate 
        products={dashboardData.popular_products} 
        title="Completion Rate" 
        subtitle="Top Popular Products"
      />
    </div>
  )
}