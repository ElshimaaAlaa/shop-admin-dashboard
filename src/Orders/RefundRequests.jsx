import React from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../Components/Search Bar/SearchBar";
import RejectRefundRequests from "./Reject Refund Requests";
import AcceptRefundRequests from "./Accept Refund Requests";
import { HiCalendarDateRange } from "react-icons/hi2";

function RefundRequests() {
  return (
    <div className="bg-gray-100 min-h-[150vh] mx-10 pt-5">
      <Helmet>
        <title>Refund Requests | VERTEX</title>
      </Helmet>
      <h1 className="font-bold text-17 bg-white mb-3 p-4 rounded-md flex justify-between items-center">
        Refund Requests
      </h1>
      <div className="bg-white p-4 rounded-md">
        <SearchBar text={'Select Date'} icon={<HiCalendarDateRange size={23}/>}/>
        <h2 className="font-bold text-17">Refund Requests</h2>
        <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
          <table className="bg-white min-w-full table">
            <thead>
              <tr>
                <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
                  <p className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4"
                      aria-label="Select all categories"
                    />
                    Order
                  </p>
                </th>
                <th className="px-6 py-3 text-left border ">Date</th>
                <th className="px-6 py-3 text-left border">Price</th>
                <th className="px-6 py-3 text-left border">Reasons</th>
                <th className="px-6 py-3 text-left border w-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr key={""}>
                <td className="px-3 py-3 border">
                  <p className="flex items-center gap-3 text-14 text-gray-500">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4"
                      aria-label={`Select ${""}`}
                    />
                    #1234567
                  </p>
                </td>
                <td className="px-6 py-3 border-t text-14 text-gray-500">
                  24 Jan 2023 7:42pm
                </td>
                <td className="px-6 py-3 border-t border-l text-gray-500">
                  120 $
                </td>
                <td className="px-6 py-3 border-t border-l text-gray-500">
                  <p className="bg-customOrange-mediumOrange text-primary rounded-md p-1 text-13">
                    Manufacturing defect
                  </p>
                </td>
                <td className="px-6 py-3 w-10 border-t border-l">
                  <div className="flex items-center gap-3">
                    <AcceptRefundRequests />
                    <RejectRefundRequests />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default RefundRequests;