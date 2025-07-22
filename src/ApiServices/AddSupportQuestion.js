import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const AddNewSupportQuestion = async (question, answer) => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/support-questions/store`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { question, answer },
    });
    if (response.status === 200) {
      console.log("question added successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add question", error);
    throw error;
  }
};
