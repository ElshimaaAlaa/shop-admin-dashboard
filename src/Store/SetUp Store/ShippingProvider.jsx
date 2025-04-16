import React from "react";
import { Helmet } from "react-helmet";
function ShippingProvider() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <Helmet>
        <title>Set Up Store</title>
      </Helmet>
      <div className="w-full lg:w-[600px] md:w-[600px] bg-white rounded-lg shadow-lg">
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className=" flex items-center gap-3 mb-5 px-6">
          <div className="rounded-full border-[5px] border-primary p-2 font-bold">
            1/3
          </div>
          <h3 className="text-15 font-bold">
            Set UP The Shipping Providers and Shipping Rates
          </h3>
        </div>
        <h3 className="text-15 font-bold my-5 px-6">
          Select Shipping Providers
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default ShippingProvider;
