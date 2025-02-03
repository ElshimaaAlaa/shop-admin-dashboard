import React from "react";

function ViewOrder() {
  return (
    <div className="flex gap-10 bg-lightgray p-10 min-h-screen">
      <div>
        <div className="bg-white p-3 border-1 border-gray-100 rounded w-460px mb-2 h-48">
          <p className="font-bold">
            Order ID : <span className="font-light">#34567118</span>
          </p>
        </div>
        <div className="bg-white p-3 border-1 border-gray-100 rounded w-460px mb-2 h-48">
          <h2 className="font-bold">Order Details </h2>
        </div>
        <div className="bg-white p-3 border-1 border-gray-100 rounded  w-460px h-48">
          <h2 className="font-bold">Items List</h2>
        </div>
      </div>
      <div>
        <div>
          <img src="/assets/images/Component 85.png" alt="" width={'69%'} height={''} />
        </div>
        <div className="bg-white p-3 border-1 border-gray-100 rounded mb-3 w-96 mt-3">
          <h2 className="font-bold mb-3" style={{fontSize:"20px"}}>Customer Details </h2>
          <p className="flex items-center gap-3 mb-2" style={{fontSize:"15px"}}>
            <img src="/assets/images/Frame 1984077339 (1).png" alt="" className="h-8 w-8"/>
            Ahmed Mohamed
          </p>
          <p className="flex items-center gap-3 mb-2 underline" style={{fontSize:"15px"}}>
            <img src="/assets/images/Frame 1984077339.png" alt="" className="h-8 w-8" />
            Ahmed Mohamed@gmail.com
          </p>
          <p className="flex items-center gap-3 mb-2 underline" style={{fontSize:"15px"}}>
            <img src="/assets/images/Frame 1984077276.png" alt="" className="h-8 w-8"/>
            +9876543234344
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
