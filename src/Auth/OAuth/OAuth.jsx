import React from "react";
import Facebook from '../../Svgs/facebook';
import Google from '../../Svgs/Google'
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import SocialMediaAuth from "../../ApiServices/SocialMediaAuth"
function OAuth() {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleOnClick = async (provider) => {
    try {
      const res = await SocialMediaAuth(provider);
      console.log("User Info:", res);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div>
      {/* login with google & facebook */}
      <div
        className="flex items-center justify-center gap-4 mt-7 "
      >
        <p
          className="text-10 md:text-11 lg:text-11 flex items-center gap-4 bg-lightGray p-3 rounded text-darkGray font-bold border-2 border-borderColor cursor-pointer"
          onClick={() => handleOnClick(facebookProvider)}
        >
          <Facebook />
          Sign in With Facebook
        </p>
        <p
          className="text-10 md:text-11 lg:text-11 flex items-center gap-4 bg-lightGray p-3 rounded text-darkGray font-bold border-2 border-borderColor cursor-pointer"
          onClick={() => handleOnClick(googleProvider)}
        >
          <Google />
          Sign in With Google
        </p>
      </div>
    </div>
  );
}
export default OAuth;
