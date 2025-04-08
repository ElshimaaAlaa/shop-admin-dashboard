import React from "react";
import { Helmet } from "react-helmet";
function CustomerDetail() {
  return (
    <div className="bg-gray-100 min-h-[150vh] pb-10 mx-10 pt-5">
      <Helmet>
        <title>Customers Details | VERTEX</title>
      </Helmet>

      <div className="bg-white mb-3 p-4 rounded-md flex justify-between items-center">
        <h1 className="font-bold text-17">Customers Details</h1>
      </div>
    </div>
  );
}

export default CustomerDetail;
