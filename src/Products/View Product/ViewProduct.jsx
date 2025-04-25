import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const FALLBACK_TEXT = "__";
const InventoryItem = ({ label, value }) => (
  <div>
    <h2 className="text-gray-400 text-15">{label}</h2>
    <p className="text-14 mt-1">{value || FALLBACK_TEXT}</p>
  </div>
);
const ColorItem = React.memo(({ color }) => (
  <div className="flex gap-10 items-center">
    <div>
      <h2 className="text-gray-400 text-15">Color</h2>
      <div
        className="w-14 h-7 mt-1 rounded-md"
        style={{ backgroundColor: color.code }}
      ></div>
    </div>
  </div>
));

function ViewProduct() {
  const [productData, setProductData] = useState({});
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios({
          url: `${API_BASE_URL}${live_shop_domain}/api/${role}/products/${productId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "en",
          },
        });
        if (response.status === 200) {
          setProductData(response.data.data);
          setMainImage(response.data.data.images?.[0]?.src);
          console.log("Product Data:", response.data.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    fetchProductDetails();
  }, [live_shop_domain, productId, role]);

  const hasColors = productData.colors && productData.colors.length > 0;
  const hasSizes = productData.sizes && productData.sizes.length > 0;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col mx-7">
      <Helmet>
        <title>View Product - VERTEX</title>
        <meta name="description" content="View product details in VERTEX" />
      </Helmet>
      <div className="bg-white p-4 rounded-md mt-5 mb-3">
        <p className="text-gray-400 text-12">Menu / Products / View Product</p>
        <h1 className="text-17 mt-3 font-bold">View Product</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-5">
          {/* Product Basic Information */}
          <div className="bg-white p-5 rounded-md w-full">
            <h2 className="font-bold mb-3 text-16">Basic Information</h2>
            <div className="w-full bg-transparent border border-gray-200 rounded-md ps-2 pt-4 pb-2 block">
              <div className="flex items-center px-3 w-560px justify-between">
                <InventoryItem label="Product Name" value={productData.name} />
                <InventoryItem
                  label="Category Name"
                  value={productData.category?.name}
                />
              </div>
              <div className="flex items-center w-500px justify-between p-3">
                <InventoryItem
                  label="Tag Number"
                  value={productData.tag_number}
                />
                <InventoryItem label="Gender" value={productData.gender} />
              </div>
              <div className="flex items-center justify-between w-485px px-3">
                <InventoryItem
                  label="Amount percentage (upon return)"
                  value={productData.return_percentage}
                />
                <InventoryItem label="Stock" value={productData.stock} />
              </div>
              <div className="p-3">
                <h2 className="text-gray-400 text-15">Tags</h2>
                <div className="flex flex-wrap items-center gap-2 ">
                  {productData.tags?.length ? (
                    productData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-customOrange-mediumOrange text-primary rounded-md px-3 py-1 mt-2 text-14"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="bg-customOrange-mediumOrange text-primary mt-1 text-14 w-fit text-center p-2 rounded-md">
                      No tags available
                    </span>
                  )}
                </div>
              </div>
              <div className="px-3">
                <InventoryItem
                  label="Description"
                  value={productData.description}
                />
              </div>
            </div>
          </div>
          {/* Product Image & Thumbnails */}
          <div className="bg-white rounded-md w-2/4 p-5 h-72">
            <p className="font-bold text-16">Product Icons / Images</p>
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
                <p className="text-gray-400 my-5 text-15">
                  No images available
                </p>
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
        <div className="flex gap-5 my-3">
          <div className="w-full bg-white p-5 rounded-md">
            <h2 className="font-bold mb-3 text-16">Pricing</h2>
            <div className="bg-transparent border border-gray-200 rounded-md ps-2 pt-2 pb-2  block">
              <div className="flex items-center p-3 w-500px justify-between">
                <InventoryItem
                  label="Price(for piece)"
                  value={productData.price}
                />
                <InventoryItem label="Cost" value={productData.cost} />
              </div>
              <div className="flex items-center gap px-3 w-530px justify-between">
                <InventoryItem
                  label="Revenue"
                  value={`${productData.revenue} $`}
                />
                <InventoryItem
                  label="Discount"
                  value={productData.discount_percentage}
                />
              </div>
              <div className="flex items-center p-3">
                <InventoryItem
                  label="Date"
                  value={productData.discount_expire_at}
                />
              </div>
            </div>
          </div>
          <div className="w-2/4 h-72"></div>
        </div>
        {(hasColors || hasSizes) && (
          <div className="w-[920px] p-5 mb-7 bg-white rounded-md">
            <h2 className="font-bold mb-5 text-16">Inventory</h2>
            {hasColors && (
              <div>
                <div>
                  {productData.colors.map((color, index) => (
                    <div key={color.id || index} className="flex gap-3">
                      <div>
                        <img
                          src={
                            color.image || productData.images?.[0]?.src || ""
                          }
                          alt={`Color: ${color.name}`}
                          className="h-20 w-24 object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex w-full items-center justify-between mb-3 border-2 border-gray-200 rounded-lg p-2">
                        <ColorItem color={color} />
                        <InventoryItem label="Stock" value={color.stock} />
                        <InventoryItem label="Price" value={color.price} />
                        <InventoryItem
                          label="Discount"
                          value={color.discount_percentage}
                        />
                        <InventoryItem
                          label="Date"
                          value={color.discount_expire_at}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {hasSizes && (
              <div>
                {productData.sizes.map((size, index) => (
                  <div
                    key={size.id || index}
                    className="flex items-center border-2 border-gray-200 rounded-lg mb-3 p-2 justify-between"
                  >
                    <div>
                      <h3 className="text-gray-400 text-15">Size</h3>
                      <p className="text-14 mt-1 bg-customOrange-mediumOrange rounded-md p-1 text-primary">
                        {size.name}
                      </p>
                    </div>
                    <InventoryItem label="Stock" value={size.stock} />
                    <InventoryItem label="Price" value={size.price} />
                    <InventoryItem
                      label="Discount"
                      value={size.discount_percentage}
                    />
                    <InventoryItem
                      label="Date"
                      value={size.discount_expire_at}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default ViewProduct;
