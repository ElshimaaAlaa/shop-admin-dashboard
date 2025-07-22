import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

export const AddNewRequest = async (questionId, answer) => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/support-questions/answer-question`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        question_id: questionId,
        answer,
      },
    });

    if (response.status === 200) {
      console.log("Response added successfully", response.data);
      return response.data;
    }
    throw new Error("Failed to add response");
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to add response. Please try again."
    );
  }
};
