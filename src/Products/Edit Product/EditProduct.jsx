import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { updateProduct } from "../../ApiServices/updateProduct";
import InputField from "../../Components/Input Field/InputField";

function EditProduct() {
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [previewImages, setPreviewImages] = useState(
    state?.images?.map((img) => img.src) || []
  );
  const navigate = useNavigate();
  const product = state || {};
  const initialValues = {
    name: product.name || "",
    cost: product.cost || "",
    revenue: product.revenue || "",
    description: product.description || "",
    tag_number: product.tag_number || "",
    gender: product.gender || "",
    tags: product.tags || [],
    images: product.images || [],
    category_id: product.category_id || "",
    price: product.price || 0,
    discount_percentage: product.discount_percentage || 0,
    discount_expire_at: product.discount_expire_at || "",
    stock: product.stock || 0,
    sizes: product.sizes || [],
    colors: product.colors || [],
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name[ar]", values.name);
    formData.append("name[en]", values.name);
    formData.append("description[ar]", values.description);
    formData.append("description[en]", values.description);
    formData.append("cost", values.cost);
    formData.append("revenue", values.revenue);
    formData.append("tag_number", values.tag_number);

    if (values.images && values.images.length > 0) {
      values.images.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    formData.append("category_id", values.category_id);
    formData.append("price", values.price);
    formData.append("discount_percentage", values.discount_percentage);
    formData.append("discount_expire_at", values.discount_expire_at);
    formData.append("stock", values.stock);

    values.sizes.forEach((size, index) => {
      formData.append(`sizes[${index}]`, size);
    });

    values.colors.forEach((color, index) => {
      formData.append(`colors[${index}]`, color);
    });

    try {
      await updateProduct(product.id, formData);
      navigate("/Home/products", { replace: true });
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col h-150vh relative">
      <Helmet>
        <title>Edit Product - VERTEX</title>
        <meta name="description" content="Edit product details in VERTEX" />
      </Helmet>
      <h1 className="font-bold rounded-md p-5 text-lg mx-10 bg-white my-4">
        Edit Product
      </h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col flex-grow">
            <div className="flex gap-5 mx-10">
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex gap-4">
                  <InputField placeholder="Product Name" name="name" />
                  <Field
                    placeholder="Category"
                    name="category_id"
                    className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md h-14 p-2 placeholder:text-14 focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <InputField name={"tag_number"} placeholder={"Tag Number"} />
                  <Field
                    name="gender"
                    as="select"
                    className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md h-14 p-2 placeholder:text-14 focus:border-primary"
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                </div>
                <div className="flex gap-4 mt-3 mb-3">
                  <div className="flex items-center w-full border-2 h-14 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus-within:border-primary">
                    <span className="text-lg h-full w-10 text-center pt-3 font-bold text-gray-600 bg-gray-200">
                      %
                    </span>
                    <Field
                      name="upon_return"
                      placeholder="percentage (upon return)"
                      className="outline-none ms-2"
                    />
                  </div>
                  <InputField name="stock" placeholder="Stock" />
                </div>
                <InputField name={"tags"} placeholder={"Tags"} />
                <Field
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  className="w-full bg-transparent outline-none border-2 border-gray-300 rounded-md p-2 h-20 mt-3 placeholder:text-14 focus:border-primary"
                />
              </div>
              <div className="bg-white p-5 rounded-md w-2/4 h-80">
                <h2 className="font-bold mb-3">Category Icon / Image</h2>
                <div className="bg-transparent w-full border-2 border-dashed outline-none h-48 p-1 rounded-md">
                  <input
                    type="file"
                    name="images"
                    onChange={(event) => {
                      const files = Array.from(event.currentTarget.files);
                      setFieldValue("images", files);
                      setPreviewImages(0);
                    }}
                    className="hidden"
                    id="image-upload"
                    multiple
                  />
                  <label
                    htmlFor="image-upload"
                    className="text-gray-500 cursor-pointer flex flex-col gap-2"
                  >
                    {previewImages.length > 0 ? (
                      <>
                        {/* Main Image Preview */}
                        <img
                          src={previewImages[0]}
                          alt="main-product-image"
                          className="w-full h-44 rounded-md mt-1"
                        />
                        {/* Thumbnails */}
                        <div className="flex gap-2 mt-2">
                          {previewImages.map((image, index) => (
                            <div
                              key={index}
                              className={`thumbnail-container ${
                                index === 0 ? "border-2 border-blue-500" : ""
                              }`}
                              onClick={() => setPreviewImages([image])}
                            >
                              <img
                                src={image}
                                alt={`thumbnail-${index}`}
                                className="h-12 w-12 object-cover rounded-md cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src="/assets/images/upload-file_svgrepo.com.png"
                          alt="upload-image-file"
                          className="mb-2"
                        />
                        <p>Upload Your Product Image</p>
                        <p className="text-sm text-gray-300 mt-2 w-60 text-center">
                          Only PNG, SVG Format Allowed. Size: 500KB Max.
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            {/* Pricing Section */}
            <div className="bg-white p-5 rounded-md mt-5 mx-10 w-890">
              <h2 className="font-bold mb-5">Pricing</h2>
              <div className="flex gap-4">
                <InputField name="price" placeholder="Price (For Piece)" />
                <InputField name="cost" placeholder="Cost" />
                <InputField
                  name="revenue"
                  placeholder="Revenue"
                  readOnly={true}
                />
              </div>
              <div className="flex items-center gap-3 mt-3 mb-3">
                <label className="inline-flex items-center cursor-pointer">
                  <Field
                    as="input"
                    type="checkbox"
                    name="schedule_discount"
                    className="hidden"
                    onChange={(e) => {
                      setIsDiscountScheduled(e.target.checked);
                      setFieldValue("schedule_discount", e.target.checked);
                    }}
                  />
                  <span className="w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center transition-all duration-200 peer-checked:border-orange-500">
                    <svg
                      className="w-3 h-3 text-primary opacity-0 transition-all duration-200 peer-checked:opacity-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  </span>
                </label>
                <p className="font-bold text-15">Schedule a discount</p>
              </div>
              {isDiscountScheduled && (
                <div className="flex gap-4">
                  <InputField
                    name="discount_percentage"
                    placeholder="Discount"
                  />
                  <InputField
                    name="discount_expire_at"
                    type="date"
                    placeholder="Discount Expiry Date"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
              <button
                type="button"
                className="bg-gray-200 text-gray-500 font-bold p-3 w-40 rounded-md"
                onClick={() => navigate("/Home/products")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white font-bold rounded-md p-3 w-40"
              >
                {isLoading ? (
                  <ClipLoader color="#fff" size={22} />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default EditProduct;
