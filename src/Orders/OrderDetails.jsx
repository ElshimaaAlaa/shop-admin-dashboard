import React from "react";
import { Helmet } from "react-helmet";
import { FaCheckCircle } from "react-icons/fa";
import CancelOrder from "./CancelOrder";
function OrderDetails() {
  return (
    <div className="bg-gray-100 min-h-[150vh] mx-10 pt-5">
      <Helmet>
        <title>Orders Details | VERTEX</title>
      </Helmet>
      <div className=" bg-white mb-3 p-4 rounded-md flex justify-between items-center">
        <h1 className="font-bold text-17">Order Details</h1>
        <CancelOrder />
      </div>
      <div className="flex gap-5">
        <div className="border-1 border-gray-200 rounded-md p-4 bg-white w-full">
          <div className="flex justify-between">
            <h2 className="font-bold text-17">
              Order ID : <span className="text-14">#34567118</span>
            </h2>
            <p className="bg-customOrange-mediumOrange text-primary rounded-md p-2">
              On Going
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-16 flex gap-2 items-center">
              <FaCheckCircle size={20} color="#E0A75E" />
              Checking
            </p>
            <span className="text-gray-400 text-13">12 May , 2:24 Am</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-16 flex gap-2 items-center">
              <FaCheckCircle size={20} color="#E0A75E" />
              IN Transit
            </p>
            <span className="text-gray-400 text-13">12 May , 2:24 Am</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-16 flex gap-2 items-center">
              <FaCheckCircle size={20} color="#E0A75E" />
              Delivered
            </p>
            <span className="text-gray-400 text-13">12 May , 2:24 Am</span>
          </div>
        </div>
        <img src="/assets/svgs/map.svg" alt="map" className="w-250" />
      </div>
      <div className="flex gap-3 items-center mt-3">
        <div className="border-1 border-gray-200 rounded-md p-4 bg-white w-full">
          <h2 className="font-bold text-15">Order Details </h2>
        </div>
        <div className="border-1 border-gray-200 rounded-md p-4 bg-white w-310">
          <h2 className="font-bold text-15">Shipping Address</h2>
        </div>
      </div>
      <div className="flex gap-3 items-center mt-3">
        <div className="border-1 border-gray-200 rounded-md p-4 bg-white w-full">
          <h2 className="font-bold text-15">List Items </h2>
        </div>
        <div className="border-1 border-gray-200 rounded-md p-4 bg-white w-310">
          <h2 className="font-bold text-15">Customer Details</h2>
        </div>
      </div>
      <div className="flex gap-3 items-center mt-3">
        <div className="border-1 border-gray-200 rounded-md p-4 bg-white w-full">
          <h2 className="font-bold text-15">Transactions </h2>
        </div>
        <div className="border-1 border-gray-200 rounded-md p-4 bg-white w-310">
          <h2 className="font-bold text-15">Balance</h2>
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;
