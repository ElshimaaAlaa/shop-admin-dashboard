import React from "react";
import { Helmet } from "react-helmet";
function Orders() {
  return (
    <div className="bg-gray-100 h-150vh mx-10 pt-5 ">
      <Helmet>
        <title>Orders | VERTEX</title>
      </Helmet>
      <h1 className="font-bold text-17 bg-white mb-3 p-4 rounded-md">
        Received Orders
      </h1>
    </div>
  );
}

export default Orders;
