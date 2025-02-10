import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { addProduct } from "../../ApiServices/AddNewProductApi";

function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);

  // Initial form values
  const intialValues = {
    name: "", // Arabic name
    name_en: "", // English name
    description: "", // Arabic description
    description_en: "", // English description
    images: [], // Array of images
    category_id: "", // Category ID
    price: 0, // Product price
    discount: 0, // Discount percentage
    discount_expire_at: "", // Discount expiry date
    stock: 0, // Stock quantity
    sizes: [], // Array of sizes
    colors: [], // Array of colors
  };

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name (Arabic) is required"),
    name_en: Yup.string().required("Name (English) is required"),
    description: Yup.string().required("Description (Arabic) is required"),
    description_en: Yup.string().required("Description (English) is required"),
    images: Yup.array()
      .min(1, "At least one image is required")
      .required("Images are required"),
    category_id: Yup.string().required("Category ID is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    discount: Yup.number()
      .positive("Discount must be a positive number")
      .required("Discount is required"),
    discount_expire_at: Yup.string().required("Discount expiry date is required"),
    stock: Yup.number()
      .positive("Stock must be a positive number")
      .required("Stock is required"),
    sizes: Yup.array().of(Yup.string().required("Size is required")),
    colors: Yup.array().of(Yup.string().required("Color is required")),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();

    // Append name and description in both Arabic and English
    formData.append("name[ar]", values.name);
    formData.append("name[en]", values.name_en);
    formData.append("description[ar]", values.description);
    formData.append("description[en]", values.description_en);

    // Append images
    values.images.forEach((image, index) => {
      formData.append("images[]", image);
    });

    // Append other fields
    formData.append("category_id", values.category_id);
    formData.append("price", values.price);
    formData.append("discount_percentage", values.discount);
    formData.append("discount_expire_at", values.discount_expire_at);
    formData.append("stock", values.stock);

    // Append sizes and colors
    values.sizes.forEach((size, index) => {
      formData.append(`sizes[${index}]`, size);
    });
    values.colors.forEach((color, index) => {
      formData.append(`colors[${index}]`, color);
    });

    try {
      await addProduct(formData);
      console.log("Product added successfully");
    } catch (error) {
      console.error("Failed to add product", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen relative">
      <h1 className="font-bold text-xl mb-3 mx-10 mt-5 p-2">Add Product</h1>
      <Formik
        initialValues={intialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="flex flex-col flex-grow">
            {/* Basic Information & Image Upload */}
            <div className="flex gap-5 mx-10">
              <div className="bg-white p-5 rounded-xl w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex gap-5">
                  <Field
                    name="name"
                    placeholder="Product Name (Arabic)"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                  <Field
                    name="name_en"
                    placeholder="Product Name (English)"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  {errors.name_en && touched.name_en && (
                    <div className="text-red-500 text-sm">{errors.name_en}</div>
                  )}
                </div>
                <div className="flex gap-5 mt-3">
                  <Field
                    name="description"
                    placeholder="Description (Arabic)"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h-32"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm">{errors.description}</div>
                  )}
                  <Field
                    name="description_en"
                    placeholder="Description (English)"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h-32"
                  />
                  {errors.description_en && touched.description_en && (
                    <div className="text-red-500 text-sm">{errors.description_en}</div>
                  )}
                </div>
                <Field
                  name="category_id"
                  placeholder="Category ID"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2 mt-3"
                />
                {errors.category_id && touched.category_id && (
                  <div className="text-red-500 text-sm">{errors.category_id}</div>
                )}
              </div>
              <div className="bg-white p-5 rounded-xl w-2/4">
                <h2 className="font-bold mb-5">Product Icon / Image</h2>
                <div className="border-2 border-dotted border-gray-300 rounded-xl p-3 h-52 flex items-center justify-center">
                  <input
                    type="file"
                    name="images"
                    onChange={(event) => {
                      const files = Array.from(event.currentTarget.files);
                      setFieldValue("images", files);
                    }}
                    className="hidden"
                    id="image-upload"
                    multiple
                  />
                  <label
                    htmlFor="image-upload"
                    className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
                  >
                    <img
                      src="/assets/images/upload-file_svgrepo.com.png"
                      alt="upload-image-file"
                      className="mb-2"
                    />
                    <p className="">Upload Your Product Image</p>
                    <p className="text-sm text-gray-300 mt-2 w-60 text-center">
                      Only PNG, SVG Format Allowed. Size: 500KB Max.
                    </p>
                  </label>
                </div>
                {errors.images && touched.images && (
                  <div className="text-red-500 text-sm">{errors.images}</div>
                )}
              </div>
            </div>

            {/* Stock & Pricing */}
            <div className="flex gap-5 mx-10 my-5">
              <div className="bg-white p-5 rounded-xl w-full">
                <h2 className="font-bold mb-5">Stock & Pricing</h2>
                <div className="flex gap-5">
                  <Field
                    name="stock"
                    placeholder="Stock"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  {errors.stock && touched.stock && (
                    <div className="text-red-500 text-sm">{errors.stock}</div>
                  )}
                  <Field
                    name="price"
                    placeholder="Price"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  {errors.price && touched.price && (
                    <div className="text-red-500 text-sm">{errors.price}</div>
                  )}
                </div>
                <div className="flex gap-5 mt-3">
                  <Field
                    name="discount"
                    placeholder="Discount Percentage"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  {errors.discount && touched.discount && (
                    <div className="text-red-500 text-sm">{errors.discount}</div>
                  )}
                  <Field
                    name="discount_expire_at"
                    type="date"
                    placeholder="Discount Expiry Date"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  {errors.discount_expire_at && touched.discount_expire_at && (
                    <div className="text-red-500 text-sm">{errors.discount_expire_at}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Sizes & Colors */}
            <div className="flex gap-5 mx-10 my-5">
              <div className="bg-white p-5 rounded-xl w-full">
                <h2 className="font-bold mb-5">Sizes & Colors</h2>
                <FieldArray name="sizes">
                  {({ push: pushSize, remove: removeSize }) => (
                    <div>
                      {values.sizes.map((size, index) => (
                        <div key={index} className="flex gap-5 mb-3">
                          <Field
                            name={`sizes[${index}]`}
                            placeholder="Size"
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                          />
                          <button
                            type="button"
                            onClick={() => removeSize(index)}
                            className="bg-red-500 text-white p-2 rounded-xl"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => pushSize("")}
                        className="bg-green-500 text-white p-2 rounded-xl"
                      >
                        Add Size
                      </button>
                    </div>
                  )}
                </FieldArray>
                {errors.sizes && touched.sizes && (
                  <div className="text-red-500 text-sm">{errors.sizes}</div>
                )}
                <FieldArray name="colors">
                  {({ push: pushColor, remove: removeColor }) => (
                    <div>
                      {values.colors.map((color, index) => (
                        <div key={index} className="flex gap-5 mb-3">
                          <Field
                            name={`colors[${index}]`}
                            placeholder="Color"
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                          />
                          <button
                            type="button"
                            onClick={() => removeColor(index)}
                            className="bg-red-500 text-white p-2 rounded-xl"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => pushColor("")}
                        className="bg-green-500 text-white p-2 rounded-xl"
                      >
                        Add Color
                      </button>
                    </div>
                  )}
                </FieldArray>
                {errors.colors && touched.colors && (
                  <div className="text-red-500 text-sm">{errors.colors}</div>
                )}
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
            {/* <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
              <button
                type="button"
                className="bg-gray-200 text-gray-500 font-bold p-3 w-32 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white font-bold rounded-xl p-3 w-32"
              >
                {isLoading ? <ClipLoader color="#fff" size={22} /> : "Save"}
              </button>
            </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProduct;