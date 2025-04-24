import axios from "axios"

const API_BASE_URL = "https://"
const live_shop_domain = localStorage.getItem("live_shop_domain")
const role = localStorage.getItem("role")

export const fetchAnalyticsData = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/analytics?year=2026`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    if (response.status === 200) {
      console.log(response.data.data)
      return response.data.data
    }

    throw new Error("Failed to fetch analytics data")
  } catch (error) {
    console.error("Failed to fetch data", error)
    throw error
  }
}
