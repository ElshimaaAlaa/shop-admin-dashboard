import axios from "axios";

export const register = async (
  name,
  password,
  email,
  password_confirmation,
  agreeToTerms,
  domain
) => {
  try {
    const payload = {
      name,
      password,
      email,
      password_confirmation,
      agreeToTerms,
      domain,
    };
    console.log("Request Payload:", payload);
    const response = await axios.post(
      "https://vrtex.duckdns.org/api/register-tenant",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("API Response Error:", error.response?.data || error);
    throw error;
  }
};