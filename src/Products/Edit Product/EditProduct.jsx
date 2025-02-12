import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { updateProduct } from "../../ApiServices/updateProduct";

function EditProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [previewImage, setPreviewImage] = useState(state?.image || null);
  const navigate = useNavigate();
  const product = state || {};

  const initialValues = {
    name: product.name,
    description: product.description,
    images: product.images || [],
    category_id: product.category_id || "",
    price: product.price || 0,
    discount_percentage: product.discount_percentage,
    discount_expire_at: product.discount_expire,
    stock: product.stock || 0,
    sizes: product.sizes || [],
    colors: product.colors || [],
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (previewImage) {
      formData.append("image", previewImage);
    }
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
  
    // Log FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
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
    <div className="bg-gray-100 flex flex-col min-h-screen relative">
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
        {({ setFieldValue }) => (
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
                <div className="bg-transparent w-full border-2 border-dotted outline-none h-48 p-3 rounded-xl ">
                  <input
                    name="images"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        setFieldValue("image", file);
                        setPreviewImage(URL.createObjectURL(file));
                      } else {
                        setFieldValue("image", null);
                        setPreviewImage(null);
                      }
                    }}
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src="/assets/images/placeholder_svgrepo.com.png"
                        alt="placeholder-image"
                        className="w-full h-full object-cover rounded-lg"
                      />
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
                <p className="mt-3 flex items-center text-14">
                  <Field type="checkbox" className="mr-2" />
                  Schedule a discount
                </p>
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

              <div className="bg-white rounded-md w-2/4 p-5 h-44">
                <h2 className="font-bold mb-3">Sizes & Colors</h2>
                <Field
                  name="sizes"
                  placeholder="Sizes"
                  className="mb-3 w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 placeholder:text-black"
                />
                <Field
                  name="colors"
                  placeholder="Colors"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 placeholder:text-black"
                />
              </div>
            </div>
            <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
              <button
                type="button"
                className="bg-gray-200 text-gray-500 font-bold p-3 w-40 rounded"
                onClick={() => navigate("/Home/products")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white font-bold rounded p-3 w-40"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader color="#fff" size={22} aria-label="Loading" />
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