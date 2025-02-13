// ViewProduct.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

function ViewProduct() {
  const [productData, setProductData] = useState({});
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios({
          url: `https://demo.vrtex.duckdns.org/api/shop/products/${productId}`,
          method: "GET",
          headers: {
            Authorization:
              "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
          },
        });
        console.log("Product Data:", response.data.data);
        if (response.status === 200) {
          setProductData(response.data.data);
          setMainImage(response.data.data.images[0]?.src);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Retrieve sizes and colors from attributes (or fallback to top-level if needed)
  const sizes = productData.attributes?.sizes || productData.sizes || [];
  const colors = productData.attributes?.colors || productData.colors || [];

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <Helmet>
        <title>View Product - VERTEX</title>
        <meta name="description" content="View product details in VERTEX" />
      </Helmet>
      <h1 className="font-bold text-xl mb-6 mx-10 my-10">View Product</h1>
      <div className="flex flex-col">
        <div className="flex gap-5 mx-10">
          {/* Product Basic Information */}
          <div className="bg-white p-5 rounded-md w-full">
            <h2 className="font-bold mb-3">Basic Information</h2>
            <div className="w-full bg-transparent border border-gray-300 h-56 rounded-md p-2 block">
              <div className="flex items-center gap-96 p-3">
                <div>
                  <h2 className="text-gray-500">Product Name</h2>
                  <p className="mt-1 text-14">{productData.name}</p>
                </div>
                <div>
                  <h2 className="text-gray-500">Category</h2>
                  <p className="text-14 mt-1">{productData.category?.name}</p>
                </div>
              </div>
              <div className="p-3">
                <h2 className="text-gray-500">Description</h2>
                <p className="mt-1 w-600px text-14">{productData.description}</p>
              </div>
            </div>
          </div>
          {/* Product Image & Thumbnails */}
          <div className="bg-white rounded-md w-2/4 p-5">
            <p className="font-bold">Product Image</p>
            <div className="image-section">
              {mainImage ? (
                <div className="main-image">
                  <img
                    src={mainImage}
                    alt={productData.name}
                    className="h-40 w-360px mt-2"
                  />
                </div>
              ) : (
                <p>No image available</p>
              )}
              {productData.images && productData.images.length > 0 && (
                <div className="thumbnails flex gap-2 mt-3">
                  {productData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setMainImage(image.src)}
                      className={`h-12 w-12 object-cover cursor-pointer ${
                        mainImage === image.src ? "border-2 border-blue-500" : ""
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Stock & Pricing Information */}
        <div className="flex gap-5 my-10 mx-10">
          <div className="bg-white p-5 rounded-md w-full">
            <h2 className="font-bold mb-3">Stock & Pricing</h2>
            <div className="w-full bg-transparent border border-gray-300 rounded-md p-2 block">
              <div className="flex items-center gap-96 p-3">
                <div>
                  <h2 className="text-gray-500">Stock</h2>
                  <p className="text-14 mt-1">{productData.stock}</p>
                </div>
                <div>
                  <h2 className="text-gray-500">Price</h2>
                  <p className="text-14 mt-1">{productData.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-360px p-3">
                <div>
                  <h2 className="text-gray-500">Discount</h2>
                  <p className="mt-1">{productData.discount_percentage} %</p>
                </div>
                <div>
                  <h2 className="text-gray-500">Expiration Date</h2>
                  <p className="mt-1">{productData.discount_expire_at}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Sizes & Colors */}
          <div className="bg-white rounded-md w-2/4 p-5 h-48">
            <h2 className="font-bold">Sizes & Colors</h2>
            <div className="mt-3 border-1 p-2 rounded-md flex justify-between items-center">
              <p className="text-14">Sizes</p>
              <div className="flex gap-2">
                {sizes && sizes.length > 0 ? (
                  sizes.map((size, index) => (
                    <span
                      key={index}
                      className="text-customOrange-darkOrange bg-customOrange-mediumOrange p-2 h-9 w-8 text-center rounded"
                    >
                      {size}
                    </span>
                  ))
                ) : (
                  <span>No sizes available</span>
                )}
              </div>
            </div>
            <div className="mt-3 border-1 p-2 rounded-md flex justify-between items-center">
              <p className="text-14">Colors</p>
              <div className="flex gap-2">
                {colors && colors.length > 0 ? (
                  colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-7 h-7 rounded-md"
                      style={{ backgroundColor: color }}
                    />
                  ))
                ) : (
                  <span>No colors available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
