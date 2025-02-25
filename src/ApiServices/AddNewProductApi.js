import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products/store`, formData, {
      headers: {
        Authorization: `Bearer tUSg6zZB0FFYWX0GyAL8WAprP9Iys96ZfgdB8h8K8162e194`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      console.log(response.data)
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add product", error);
    throw error; // Re-throw the error for handling in the component
  }
};