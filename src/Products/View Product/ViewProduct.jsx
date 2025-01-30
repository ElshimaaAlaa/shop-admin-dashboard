import React from "react";
import { Formik, Form, Field } from "formik";
function ViewProduct() {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <h1 className="font-bold mb-6 text-2xl mx-10 my-10">View Product</h1>
      <div className="flex flex-col">
        <div className="flex gap-5 mx-10">
          <div className="bg-white p-5 rounded w-full">
            <h2 className="font-bold mb-5">Basic Information</h2>
            <div className="w-full bg-transparent border border-gray-300 rounded h- p-2 block ">
              <div className="flex justify-between items-center p-3">
                <div>
                  <h2 className="text-gray-500">Category Name</h2>
                  <p className="font-bold mt-1">T-Shirt</p>
                </div>
                <div>
                  <h2 className="text-gray-500">Category</h2>
                  <p className="font-bold mt-1">Category</p>
                </div>
              </div>
              <div className="p-3">
                <h2 className="text-gray-500">Discription</h2>
                <p className="mt-1" style={{ width: "70%" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded w-2/5">
            <img src="/assets/images/product.png" alt="product-image" />
          </div>
        </div>
        <div className="flex gap-5 my-10 mx-10">
          <div className="bg-white p-5 rounded w-full">
            <h2 className="font-bold mb-5">Stock & Pricing </h2>
            <div className="w-full bg-transparent border border-gray-300 rounded h- p-2 block ">
              <div className="flex justify-between items-center p-3">
                <div>
                  <h2 className="text-gray-500">Stock</h2>
                  <p className="font-bold mt-1">100</p>
                </div>
                <div>
                  <h2 className="text-gray-500">Price</h2>
                  <p className="font-bold mt-1">200</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="p-3">
                  <h2 className="text-gray-500">Discount</h2>
                  <p className="mt-1" style={{ width: "" }}>
                    10%
                  </p>
                </div>
                <div className="p-3">
                  <h2 className="text-gray-500">Date</h2>
                  <p className="mt-1" style={{ width: "" }}>
                    12/2/2024
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded w-2/5 p-5">
            <h2>Sizes & Colors</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
