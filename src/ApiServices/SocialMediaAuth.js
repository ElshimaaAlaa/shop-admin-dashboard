import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../Config/firebase-config";

const SocialMediaAuth = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.warn("The user closed the popup before completing the login.");
    } else {
      console.error("Authentication error:", error);
    }
    throw error;
  }
};

export default SocialMediaAuth;
