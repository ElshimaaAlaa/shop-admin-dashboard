import React, { useEffect, useState } from "react";
function ViewProduct(productId) {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const ViewProductDetails = async () => {
      try {
        const data = await ViewProduct();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    ViewProductDetails();
  }, [productId]);
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <h1 className="font-bold text-xl mb-6 mx-10 my-10">View Product</h1>
      <div className="flex flex-col">
        <div className="flex gap-5 mx-10">
          <div className="bg-white p-5 rounded-xl w-full">
            <h2 className="font-bold mb-3">Basic Information</h2>
            <div className="w-full bg-transparent border border-gray-300 rounded-xl p-2 block h-36 ">
              <div className="flex items-center gap-96 p-3">
                <div>
                  <h2 className="text-gray-500">Products Name</h2>
                  <p className="font-bold mt-1">{productData}</p>
                </div>
                <div>
                  <h2 className="text-gray-500">Category</h2>
                  <p className="font-bold mt-1">{productData}</p>
                </div>
              </div>
              <div className="p-3">
                <h2 className="text-gray-500">Discription</h2>
                <p className="mt-1 w-600px">{productData}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl w-2/4 h-56 p-5">
            <p className="font-bold">Product Icon / image </p>
            <div className="flex justify-center">
              <img
                src="/assets/images/product.png"
                alt="product-image"
                className="h-40 w-360px mt-2"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 my-10 mx-10">
          <div className="bg-white p-5 rounded-xl w-full">
            <h2 className="font-bold mb-3">Stock & Pricing </h2>
            <div className="w-full bg-transparent border border-gray-300 rounded-xl p-2 block ">
              <div className="flex items-center gap-96  p-3">
                <div>
                  <h2 className="text-gray-500">Stock</h2>
                  <p className="font-bold mt-1">{productData}</p>
                </div>
                <div>
                  <h2 className="text-gray-500">Price</h2>
                  <p className="font-bold mt-1">{productData}</p>
                </div>
              </div>
              <div className="flex items-center gap-360px  p-3">
                <div>
                  <h2 className="text-gray-500">Discount</h2>
                  <p className="mt-1">{productData}</p>
                </div>
                <div className="">
                  <h2 className="text-gray-500">Date</h2>
                  <p className="mt-1">{productData} </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl w-2/4 p-5 h-44">
            <h2 className="font-bold">Sizes & Colors</h2>
            <div className="mt-3 border-1 p-2 rounded-md">
              <p className="text-12">Sizes</p>
            </div>
            <div className="mt-3 border-1 p-2 rounded-md">
              <p className="text-12">Colors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewProduct;