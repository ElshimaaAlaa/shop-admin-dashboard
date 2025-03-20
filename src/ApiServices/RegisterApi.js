import axios from "axios";
export const register = async (
  name,
  email,
  password,
  password_confirmation
) => {
  try {
    const response = await axios({
      url: "https://demo.vrtex.duckdns.org/api/register",
      method: "POST",
      data: {
        name,
        email,
        password,
        password_confirmation,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ar",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error registering user");
    }
  } catch (error) {
    console.error("Failed to register user: ", error);
    throw error;
  }
};
