import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

export const fetchPromotions = async (search = "", page = 1, perPage = 10) => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/promotions?search=${search}&per_page=${perPage}&page=${page}`,
      method: "GET",
      headers: {
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    }
  } catch (error) {
    console.error("Failed to fetch promotions", error);
    throw error;
  }
};
