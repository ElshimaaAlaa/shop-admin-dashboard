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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  return (
    <div className="bg-gray-100 flex flex-col h-150vh">
      <Helmet>
        <title>View Product - VERTEX</title>
        <meta name="description" content="View product details in VERTEX" />
      </Helmet>
      <h1 className="font-bold text-lg bg-white p-4 rounded-md mx-10 my-5">
        View Product
      </h1>
      <div className="flex flex-col">
        <div className="flex gap-5 mx-10">
          {/* Product Basic Information */}
          <div className="bg-white p-5 rounded-md w-full">
            <h2 className="font-bold mb-3">Basic Information</h2>
            <div className="w-full bg-transparent border border-gray-200 rounded-md ps-2 pt-2 pb-2  block">
              <div className="flex items-center gap-x-96 p-3">
                <div>
                  <h2 className="text-gray-400">Product Name</h2>
                  <p className="mt-1 text-14">{productData.name}</p>
                </div>
                <div>
                  <h2 className="text-gray-400">Category Name</h2>
                  <p className="text-14 mt-1">{productData.category?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-400 p-3">
                <div>
                  <h2 className="text-gray-400">Tag Number</h2>
                  <p className="mt-1 text-14">
                    {productData.tag_number || "no tag number available"}
                  </p>
                </div>
                <div>
                  <h2 className="text-gray-400">Gender</h2>
                  <p className="text-14 mt-1">
                    {productData?.gender || "no gender available"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-60 p-3">
                <div>
                  <h2 className="text-gray-400">
                    Amount percentage (upon return)
                  </h2>
                  <p className="mt-1 text-14">
                    {productData.upon_return || "no upon return) available"}
                  </p>
                </div>
                <div>
                  <h2 className="text-gray-400">Stock</h2>
                  <p className="text-14 mt-1">
                    {productData?.stock || 0}
                  </p>
                </div>
              </div>
              <div className="p-3">
                <h2 className="text-gray-500">Tags</h2>
                <p className="mt-1 w-600px text-14">
                  {productData.category?.tags?.length ? (
                    productData.tags.map((tag) => <span key={tag}>{tag}</span>)
                  ) : (
                    <p>No tags available</p>
                  )}
                </p>
              </div>
              <div className="p-3">
                <h2 className="text-gray-400">Description</h2>
                <p className="mt-1 w-600px text-14">
                  {productData.description}
                </p>
              </div>
            </div>
          </div>
          {/* Product Image & Thumbnails */}
          <div className="bg-white rounded-md w-2/4 p-5 h-72">
            <p className="font-bold">Product Icons / Images</p>
            <div className="image-section">
              {mainImage ? (
                <div className="main-image">
                  <img
                    src={mainImage}
                    alt={productData.name}
                    className="h-40 w-full rounded-md mt-3"
                  />
                </div>
              ) : (
                <p className="text-gray-400 my-5 text-15">No images available</p>
              )}
              {productData.images && productData.images.length > 0 && (
                <div className="thumbnails flex gap-2 mt-3">
                  {productData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setMainImage(image.src)}
                      className={`h-12 w-12 object-cover cursor-pointer rounded-md ${
                        mainImage === image.src
                          ? "border-2 border-blue-500"
                          : ""
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
          <div className="w-900 bg-white p-5 rounded-md">
            <h2 className="font-bold mb-3">Pricing</h2>
            <div className="bg-transparent border border-gray-200 rounded-md ps-2 pt-2 pb-2 pe-80 block">
              <div className="flex items-center gap-x-96 p-3">
                <div>
                  <h2 className="text-gray-400">Price (for piece)</h2>
                  <p className="text-14 mt-1">{productData.price}</p>
                </div>
                <div>
                  <h2 className="text-gray-400">Cost</h2>
                  <p className="text-14 mt-1">{productData.cost}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-400 p-3">
                <div>
                  <h2 className="text-gray-400">Revenue</h2>
                  <p className="text-14 mt-1">{productData.revenue} $</p>
                </div>
                <div>
                  <h2 className="text-gray-400">Discount</h2>
                  <p className="text-14 mt-1">
                    {productData.discount_percentage}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3">
                <div>
                  <h2 className="text-gray-400">Date</h2>
                  <p className="mt-1">{productData.discount_expire_at}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewProduct;
