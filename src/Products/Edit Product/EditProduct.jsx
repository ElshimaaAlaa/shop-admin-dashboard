import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { updateProduct } from "../../ApiServices/updateProduct";

function EditProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [previewImages, setPreviewImages] = useState(
    state?.images?.map((img) => img.src) || []
  );
  const navigate = useNavigate();
  const product = state || {};

  const initialValues = {
    name: product.name || "",
    description: product.description || "",
    images: product.images || [],
    category_id: product.category_id || "",
    price: product.price || 0,
    discount_percentage: product.discount_percentage || 0,
    discount_expire_at: product.discount_expire_at || "",
    stock: product.stock || 0,
    sizes: product.sizes || [],
    colors: product.colors || [],
  };

  const handleImageChange = (event, setFieldValue) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages((prev) => [...prev, ...newImages]);
      setFieldValue("images", files); // Update Formik's values
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name[ar]", values.name);
    formData.append("name[en]", values.name);
    formData.append("description[ar]", values.description);
    formData.append("description[en]", values.description);

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
      <h1 className="font-bold mb-3 mx-10 mt-5 p-2 text-xl">Edit Product</h1>
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
                <div className="flex gap-5">
                  <Field
                    placeholder="Product Name"
                    name="name"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  <Field
                    placeholder="Category"
                    name="category_id"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                </div>
                <Field
                  placeholder="Description"
                  name="description"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h-32 mt-3"
                />
              </div>
              <div className="bg-white p-5 rounded-md w-2/4">
                <h2 className="font-bold mb-4">Category Icon / Image</h2>
                <div className="bg-transparent w-full border-2 border-dotted outline-none h-48 p-3 rounded-xl overflow-y-scroll">
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
                    className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
                  >
                    {previewImages.length > 0 ? (
                      <>
                        {/* Main Image Preview */}
                        <img
                          src={previewImages[0]}
                          alt="main-product-image"
                          className="object-contain rounded-md"
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
            <div className="flex gap-5 mx-10 my-5">
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Stock & Pricing</h2>
                <div className="flex gap-5">
                  <Field
                    name="stock"
                    placeholder="Stock"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  <Field
                    name="price"
                    placeholder="Price"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                </div>
                <div className="flex gap-5 mt-3">
                  <Field
                    name="discount_percentage"
                    placeholder="Discount"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h-14"
                  />
                  <Field
                    type="date"
                    name="discount_expire_at"
                    placeholder="Date"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                </div>
              </div>
              <div className=" rounded-md w-2/4 p-5 h-44">
                {/* <h2 className="font-bold mb-3">Sizes & Colors</h2>
                <FieldArray name="sizes">
                  {({ push, remove, form }) => (
                    <div className="mb-3">
                      {form.values.sizes.map((size, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Field
                            name={`sizes[${index}]`}
                            placeholder="Size"
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 placeholder:text-black"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Add Size
                      </button>
                    </div>
                  )}
                </FieldArray>
                <FieldArray name="colors">
                  {({ push, remove, form }) => (
                    <div>
                      {form.values.colors.map((color, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Field
                            name={`colors[${index}]`}
                            placeholder="Color"
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 placeholder:text-black"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Add Color
                      </button>
                    </div>
                  )}
                </FieldArray> */}
              </div>
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
