import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import { addProduct } from "../../ApiServices/AddNewProductApi";
import "./AddProduct.scss";
import { ClipLoader } from "react-spinners";

function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const navigate = useNavigate();
  // Fetch categories on mount
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };
    getCategories();
  }, []);

  const initialValues = {
    name: "",
    description: "",
    images: [],
    category_id: "",
    price: "",
    discount: "",
    discount_expire_at: "",
    stock: "",
    sizes: [],
    colors: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
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
    discount_expire_at: Yup.string().required(
      "Discount expiry date is required"
    ),
    stock: Yup.number()
      .positive("Stock must be a positive number")
      .required("Stock is required"),
    sizes: Yup.array().of(Yup.string().required("Size is required")),
    colors: Yup.array().of(
      Yup.string()
        .matches(
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[a-zA-Z]+$/,
          "Color must be a valid name or hex code"
        )
        .required("Color is required")
    ),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("name[ar]", values.name);
    formData.append("name[en]", values.name);
    formData.append("description[ar]", values.description);
    formData.append("description[en]", values.description);

    if (Array.isArray(values.images)) {
      values.images.forEach((image, index) => {
        if (index === mainImageIndex) {
          formData.append("images[]", image); // Main image
        }
      });
      values.images.forEach((image, index) => {
        if (index !== mainImageIndex) {
          formData.append("images[]", image); // Other images
        }
      });
    }

    formData.append("category_id", values.category_id);
    formData.append("price", values.price);
    formData.append("discount_percentage", values.discount);
    formData.append("discount_expire_at", values.discount_expire_at);
    formData.append("stock", values.stock);
    // Append sizes array
    if (Array.isArray(values.sizes)) {
      values.sizes.forEach((size, index) => {
        formData.append(`sizes[${index}]`, size);
      });
    }
    // Append colors array
    if (Array.isArray(values.colors)) {
      values.colors.forEach((color, index) => {
        formData.append(`colors[${index}]`, color);
      });
    }
    // Debug: log all FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await addProduct(formData);
      console.log("Product added successfully");
      navigate("/Home/Products");
    } catch (error) {
      console.error("Failed to add product", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col h-115vh relative">
      <Helmet>
        <title>Add Product - VERTEX</title>
        <meta name="description" content="Add new product to VERTEX" />
      </Helmet>
      <h1 className="font-bold text-xl mb-3 mx-10 mt-5 p-2">Add Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="flex flex-col flex-grow">
            {/* Basic Information & Image Upload */}
            <div className="flex gap-5 mx-10">
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex gap-5">
                  <Field
                    name="name"
                    placeholder="Product Name"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                  <Field
                    as="select"
                    name="category_id"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  {errors.category_id && touched.category_id && (
                    <div className="text-red-500 text-sm">
                      {errors.category_id}
                    </div>
                  )}
                </div>
                <div className="flex gap-5 mt-3">
                  <Field
                    name="description"
                    placeholder="Description"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h-32"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm">
                      {errors.description}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white p-5 rounded-md w-2/4">
                <h2 className="font-bold mb-5">Product Icon / Image</h2>
                <div className="border-2 border-dotted border-gray-300 rounded-xl p-3 flex items-center justify-center h-52 overflow-y-scroll">
                  <input
                    type="file"
                    name="images"
                    onChange={(event) => {
                      const files = Array.from(event.currentTarget.files);
                      setFieldValue("images", files);
                      setMainImageIndex(0);
                    }}
                    className="hidden"
                    id="image-upload"
                    multiple
                  />
                  <label
                    htmlFor="image-upload"
                    className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
                  >
                    {values.images.length > 0 ? (
                      <>
                        {/* Main Image Preview */}
                        <img
                          src={URL.createObjectURL(
                            values.images[mainImageIndex]
                          )}
                          alt="main-product-image"
                          className="object-contain rounded-md"
                        />
                        {/* Thumbnails */}
                        <div className="flex gap-2 mt-2">
                          {values.images.map((image, index) => (
                            <div
                              key={index}
                              className={`thumbnail-container ${
                                index === mainImageIndex
                                  ? "border-2 border-blue-500"
                                  : ""
                              }`}
                              onClick={() => setMainImageIndex(index)}
                            >
                              <img
                                src={URL.createObjectURL(image)}
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
                {errors.images && touched.images && (
                  <div className="text-red-500 text-sm">{errors.images}</div>
                )}
              </div>
            </div>
            {/* Stock & Pricing */}
            <div className="flex gap-5 mx-10 my-5">
              <div className="bg-white p-5 rounded-md w-full">
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
                    <div className="text-red-500 text-sm">
                      {errors.discount}
                    </div>
                  )}
                  <Field
                    name="discount_expire_at"
                    type="date"
                    placeholder="Discount Expiry Date"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                  />
                  {errors.discount_expire_at && touched.discount_expire_at && (
                    <div className="text-red-500 text-sm">
                      {errors.discount_expire_at}
                    </div>
                  )}
                </div>
              </div>
              {/* Sizes & Colors */}
              <div className="bg-transparent p-3 w-2/4 h-52">
                {/* <h2 className="font-bold mb-5">Sizes & Colors</h2>
                <FieldArray name="sizes">
                  {({ push, remove }) => (
                    <div className="sizes-colors-container">
                      <h3>Sizes</h3>
                      {values.sizes.map((size, index) => (
                        <div
                          key={index}
                          className="input-container flex items-center gap-5"
                        >
                          <Field
                            name={`sizes[${index}]`}
                            placeholder="Size (e.g., M, L)"
                            className="input-field border-1 rounded-md border-gray-200 outline-none p-1 mt-2"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="add-remove-button text-14 bg-red-500 text-white rounded-md w-6 h-6 font-bold"
                          >
                            X
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="add-button text-gray-500 text-14"
                      >
                        + Add Size
                      </button>
                    </div>
                  )}
                </FieldArray>
                <FieldArray name="colors">
                  {({ push, remove }) => (
                    <div className="sizes-colors-container">
                      <h3 className="text-14">Colors</h3>
                      {values.colors.map((color, index) => (
                        <div
                          key={index}
                          className="input-container flex items-center gap-5"
                        >
                          <Field
                            name={`colors[${index}]`}
                            placeholder="Color (e.g., Red or #FF0000)"
                            className="input-field border-1 rounded-md border-gray-200 outline-none p-1 mt-2"
                          />
                          {color && (
                            <div
                              className="color-preview"
                              style={{ backgroundColor: color }}
                            ></div>
                          )}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="add-remove-button text-14 bg-red-500 text-white rounded-md w-6 h-6 font-bold"
                          >
                            X
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="add-button text-gray-500 text-14"
                      >
                        + Add Color
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
                {isLoading ? <ClipLoader color="#fff" size={22} /> : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default AddProduct;