import axios from "axios";

export const ViewProduct = async (productId) => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/products/${productId}`,
      method: "GET",
      headers: {
        Authorization:
          "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch product", error);
    return null;
  }
};
