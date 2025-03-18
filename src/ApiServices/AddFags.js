import axios from "axios";
const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";
export const addFaqs = async (question, answer) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/faqs/add-question`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {question,
      answer},
    });
    if (response.status === 200) {
      console.log("FAQ added successfully");
    }
  } catch (error) {
    console.error("Failed to add FAQ", error);
    throw error;
  }
};
