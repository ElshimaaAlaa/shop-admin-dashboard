import axios from "axios";
export const register = async (
  name,
  email,
  password,
  password_confirmation,
  domain
) => {
  try {
    const response = await axios.post(
      "https://vrtex.duckdns.org/api/register-tenant",
      {
        name,
        email,
        password,
        password_confirmation,
        domain,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "ar",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Response Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    throw error;
  }
};