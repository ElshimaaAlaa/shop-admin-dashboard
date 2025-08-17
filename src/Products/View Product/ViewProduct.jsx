import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../Components/Header/Header";

const FALLBACK_TEXT = "__";

const InventoryItem = ({ label, value }) => (
  <div>
    <h2 className="text-gray-400 text-15">{label}</h2>
    <p className="text-14 mt-1">{value || FALLBACK_TEXT}</p>
  </div>
);

const ColorItem = React.memo(({ color }) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-10 items-center">
      <div>
        <h2 className="text-gray-400 text-15">{t("productColor")}</h2>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-14 h-7 rounded-md"
            style={{ backgroundColor: color.code }}
            aria-label={t("colorSample")}
          ></div>
        </div>
      </div>
    </div>
  );
});
ColorItem.displayName = "ColorItem";

const SizeItem = React.memo(({ size }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-gray-400 text-15">{t("size")}</h2>
      <p className="text-14 mt-1 text-center bg-customOrange-mediumOrange rounded-md p-1 text-primary">
        {size.name}
      </p>
    </div>
  );
});
SizeItem.displayName = "SizeItem";

function ViewProduct() {
  const [productData, setProductData] = useState({});
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios({
          url: `https://${live_shop_domain}/api/${role}/products/${productId}`,
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
    <div className="bg-gray-100 min-h-screen flex flex-col mx-5">
      <Helmet>
        <title>
          {t("viewProduct")} - {t("vertex")}
        </title>
        <meta name="description" content={t("viewProductDescription")} />
      </Helmet>
      <Header subtitle={t("viewProductHead")} title={t("viewProduct")} className="my-3"/>
      <div className="flex flex-col">
        <div className="flex gap-5">
          {/* Product Basic Information */}
          <section className="bg-white p-4 rounded-md w-full">
            <h2 className="font-bold mb-3 text-16">{t("basicInfo")}</h2>
            <div className="w-full bg-transparent border border-gray-200 rounded-md ps-2 pt-4 pb-2 block">
              <div className="flex items-center px-3 w-560px rtl:w-[510px] justify-between">
                <InventoryItem
                  label={t("productName")}
                  value={productData.name}
                />
                <InventoryItem
                  label={t("categoryName")}
                  value={productData.category?.name}
                />
              </div>
              <div className="flex items-center w-500px rtl:w-[460px] justify-between p-3">
                <InventoryItem
                  label={t("tagNum")}
                  value={productData.tag_number}
                />
                <InventoryItem label={t("gender")} value={productData.gender} />
              </div>
              <div className="flex items-center justify-between w-485px rtl:w-[480px] px-3">
                <InventoryItem
                  label={t("amountPercentage")}
                  value={productData.return_percentage}
                />
                <InventoryItem label={t("stock")} value={productData.stock} />
              </div>
              <div className="p-3">
                <h2 className="text-gray-400 text-15">{t("tags")}</h2>
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
                      {t("noTags")}
                    </span>
                  )}
                </div>
              </div>
              <div className="px-3">
                <InventoryItem
                  label={t("description")}
                  value={productData.description}
                />
              </div>
            </div>
          </section>

          {/* Product Image & Thumbnails */}
          <section className="bg-white rounded-md w-2/4 p-4 h-72">
            <p className="font-bold text-16">{t("productImage")}</p>
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
                <p className="text-gray-400 my-5 text-15">{t("noImage")}</p>
              )}
              {productData.images && productData.images.length > 0 && (
                <div className="thumbnails flex gap-2 mt-3">
                  {productData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={`${t("thumbnail")} ${index + 1}`}
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
          </section>
        </div>

        {/* Stock & Pricing Information */}
        <section className="flex gap-5 my-3">
          <div className="w-full bg-white p-4 rounded-md">
            <h2 className="font-bold mb-3 text-16">{t("pricing")}</h2>
            <div className="bg-transparent border border-gray-200 rounded-md ps-2 pt-2 pb-2 block">
              <div className="flex items-center p-3 w-500px justify-between">
                <InventoryItem
                  label={t("piecePrice")}
                  value={productData.price}
                />
                <InventoryItem label={t("cost")} value={productData.cost} />
              </div>
              <div className="flex items-center gap px-3 w-530px rtl:w-[500px] justify-between">
                <InventoryItem
                  label={t("revenue")}
                  value={`${productData.revenue} $`}
                />
                <InventoryItem
                  label={t("discount")}
                  value={productData.discount_percentage}
                />
              </div>
              <div className="flex items-center p-3">
                <InventoryItem
                  label={t("date")}
                  value={productData.discount_expire_at}
                />
              </div>
            </div>
          </div>
          <div className="w-2/4 h-72"></div>
        </section>
        <div className="flex">
          <div className="w-full">
            {(hasColors || hasSizes) && (
              <section className=" w-full p-4 mb-7 bg-white rounded-md">
                <h2 className="font-bold mb-5 text-16">{t("inventory")}</h2>
                {hasColors && (
                  <div>
                    {productData.colors.map((color, index) => (
                      <div key={color.id || index} className="flex gap-3 mb-3">
                        <div>
                          <img
                            src={
                              color.image || productData.images?.[0]?.src || ""
                            }
                            alt={`${t("color")}: ${color.name}`}
                            className="h-16 w-24 object-cover rounded-xl"
                          />
                        </div>
                        <div className="flex w-full items-center justify-between border-2 border-gray-200 rounded-lg p-2">
                          <ColorItem color={color} />
                          <InventoryItem
                            label={t("stock")}
                            value={color.stock}
                          />
                          <InventoryItem
                            label={t("price")}
                            value={color.price}
                          />
                          <InventoryItem
                            label={t("discount")}
                            value={color.discount_percentage}
                          />
                          <InventoryItem
                            label={t("date")}
                            value={color.discount_expire_at}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {hasSizes && (
                  <div>
                    {productData.sizes.map((size, index) => (
                      <div
                        key={size.id || index}
                        className="flex items-center border-2 border-gray-200 rounded-lg mb-3 p-2 justify-between"
                      >
                        <SizeItem size={size} />
                        <InventoryItem label={t("stock")} value={size.stock} />
                        <InventoryItem label={t("price")} value={size.price} />
                        <InventoryItem
                          label={t("discount")}
                          value={size.discount_percentage}
                        />
                        <InventoryItem
                          label={t("date")}
                          value={size.discount_expire_at}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
          <div className="w-2/4 h-72"></div>
        </div>
      </div>
    </div>
  );
}
export default ViewProduct;