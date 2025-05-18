import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { FaSackDollar } from "react-icons/fa6"
import { FaMagnifyingGlassDollar } from "react-icons/fa6"
import { FaMoneyBillWave } from "react-icons/fa"
import { fetchAnalyticsData } from "../ApiServices/Analytics"
import { ClipLoader } from "react-spinners"
import Delete from "./DeleteProduct"
import { useNavigate } from "react-router-dom"
import MonthlyTrendChart from "./MonthlyTrendChart"
import StatisticsCard from "../Pages/Dashboard/ReportItems"
function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    monthly_expended: [],
    monthly_income: [],
    monthly_profit: [],
    overview: {},
    popular_products: [],
  })
  const [statistics, setStatistics] = useState({})
  const [productData, setProductData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getAnalyticsData = async () => {
      setIsLoading(true)
      try {
        const response = await fetchAnalyticsData()
        console.log(response)
        setAnalyticsData(response)
        setStatistics(response)
        setProductData(response.popular_products || [])
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
        console.error(error)
      }
    }
    getAnalyticsData()
  }, [])

  const handleDeleteProduct = (productId) => {
    setProductData((prevProducts) => {
      const updatedProducts = prevProducts.filter((product) => product.id !== productId)
      return updatedProducts
    })
  }

  return (
    <div className="bg-gray-100 min-h-[89vh] mx-5 pt-5 pb-10">
      <Helmet>
        <title>Reports | VERTEX</title>
      </Helmet>
      <section className="bg-white mb-2 p-4 rounded-md">
        <p className="text-gray-400 text-13">Menu / Analytics & Reports</p>
        <h1 className="font-bold text-17 mt-2">Analytics & Reports</h1>
      </section>
      <div className="bg-white rounded-md p-5 mb-5">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <StatisticsCard
            icon={FaMoneyBillWave}
            title="Total Expend "
            totalNumber={statistics?.overview?.total_expended?.amount || 0}
            percentage={`${statistics?.overview?.total_expended?.change_rate || 0}`}
            duration={`Last month: ${0}`}
          />
          <StatisticsCard
            icon={FaMagnifyingGlassDollar}
            title="Total Income"
            totalNumber={statistics?.overview?.total_income?.amount || 0}
            percentage={`${statistics?.overview?.total_income?.change_rate || 0}`}
            duration={`Last month: ${0}`}
          />
          <StatisticsCard
            icon={FaSackDollar}
            title="Total Profit "
            totalNumber={statistics?.overview?.total_profit?.amount || 0}
            percentage={`${statistics?.overview?.total_profit?.change_rate || 0}`}
            duration={`Last month: ${0}`}
          />
        </section>
        {/* Analytics Chart Section with Recharts */}
        {!isLoading && !error && (
          <MonthlyTrendChart
            monthlyExpended={analyticsData.monthly_expended}
            monthlyIncome={analyticsData.monthly_income}
            monthlyProfit={analyticsData.monthly_profit}
          />
        )}
        {/* Products Section */}
        <section>
          <h3 className="font-bold text-17 my-8">Top Selling Products</h3>
          {error ? (
            <div className="text-red-500 text-center mt-10">Failed to fetch products. Please try again.</div>
          ) : isLoading ? (
            <div className="flex justify-center mt-10">
              <ClipLoader color="#E0A75E" size={40} />
            </div>
          ) : productData.length === 0 ? (
            <div className="text-gray-400 text-center mt-5 text-14">No products available</div>
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
                            className="form-checkbox h-4 w-4 rounded-md text-primary focus:ring-primary border-gray-300"
                          />
                          Product
                        </p>
                      </th>
                      <th className="px-3 py-3 border-r border-b text-left">Price</th>
                      <th className="px-3 py-3 border-r border-b text-left">Stock</th>
                      <th className="px-3 py-3 border-r text-left border-b ">Colors</th>
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
                              className="form-checkbox h-4 w-4 rounded-md text-primary focus:ring-primary border-gray-300"
                            />
                            <img
                              className="h-7 w-7 rounded-full object-cover"
                              src={
                                product.images?.[0]?.src || "/assets/images/default-product.png" || "/placeholder.svg"
                              }
                              alt={product.name}
                            />
                            {product.name}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-gray-600 text-15 border-t border-l">
                          ${product.price?.toFixed(2) || "0.00"}
                        </td>
                        <td className="px-3 text-gray-600 text-15 py-3 border-t border-l">{product.stock}</td>
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
                                e.stopPropagation()
                                navigate(`/Dashboard/EditProduct/${product.id}`, {
                                  state: { product },
                                })
                              }}
                              className="text-primary hover:text-primary-dark"
                            >
                              <img src="/assets/svgs/editIcon.svg" alt="Edit" className="w-6 h-6" />
                            </button>
                            <Delete id={product.id} onDelete={handleDeleteProduct} />
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
  )
}
export default Analytics;