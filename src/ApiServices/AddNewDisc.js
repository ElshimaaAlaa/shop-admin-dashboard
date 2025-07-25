import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const addDisc = async (formData) => {
  try {
    const response = await axios.post(
      `https://${live_shop_domain}/api/${role}/promotions/store`,
      formData,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("discount added successfully");
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add discount", error);
    throw error;
  }
};
