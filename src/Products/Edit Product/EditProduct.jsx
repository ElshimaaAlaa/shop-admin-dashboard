import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProduct } from "../../ApiServices/updateProduct";
import InputField from "../../Components/Input Field/InputField";
import UploadUpdatedProductImages from "../../Components/Upload Image/UploadUpdatedProductImages";
import Footer from "../../Components/Footer/Footer";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import ColorFieldArray from "../Add Product/ColorFieldArray"
import SizeFieldArray from "../Add Product/SizeFieldArray";
function EditProduct() {
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const [previewImages, setPreviewImages] = useState(
    state?.images?.map((img) => img.src) || []
  );
  const navigate = useNavigate();
  const product = state || {};
  const [categoryType, setCategoryType] = useState(null); // State to track category type

  // Log the product object for debugging
  useEffect(() => {
    console.log("Product from API:", product);
  }, [product]);

  // Determine category type based on the selected category
  useEffect(() => {
    if (product.category_id) {
      const selectedCategory = categories.find(
        (cat) => cat.id === product.category_id
      );
      if (selectedCategory) {
        setCategoryType(selectedCategory.type_name); // Set category type
      }
    }
  }, [product.category_id, categories]);

  const initialValues = {
    name: product.name || "",
    cost: product.cost || "",
    return_percentage: product.return_percentage || "",
    revenue: product.revenue || "",
    description: product.description || "",
    tag_number: product.tag_number || "",
    gender: product.gender || "",
    tags_id: product.tags_id || [], // Ensure tags are initialized
    images: product.images || [],
    category_id: product.category?.id || "", // Ensure category_id is initialized
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

    // Append name and description fields (ensure they are not empty)
    formData.append("name[ar]", values.name || "Default Arabic Name");
    formData.append("name[en]", values.name || "Default English Name");
    formData.append("description[ar]", values.description || "Default Arabic Description");
    formData.append("description[en]", values.description || "Default English Description");

    // Append other fields
    formData.append("cost", values.cost || "");
    formData.append("revenue", values.revenue || "");
    formData.append("tag_number", values.tag_number || "");
    formData.append("category_id", values.category_id || "");

    // Append images
    if (values.images && values.images.length > 0) {
      values.images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append(`images[${index}]`, image);
        } else if (image.src) {
          formData.append(`images[${index}]`, image.src);
        }
      });
    }

    formData.append("price", values.price || "");
    formData.append("discount_percentage", values.discount_percentage || "");
    formData.append("discount_expire_at", values.discount_expire_at || "");
    formData.append("stock", values.stock || "");

    // Append tags_id as a JSON array (if required by the backend)
    if (values.tags_id && values.tags_id.length > 0) {
      formData.append("tags_id", JSON.stringify(values.tags_id));
    } else {
      formData.append("tags_id", "[]"); // Send an empty array if no tags are provided
    }

    // Append colors
    if (categoryType === "Color" || categoryType === "Both") {
      values.colors.forEach((color, index) => {
        Object.entries(color).forEach(([field, fieldValue]) => {
          formData.append(`colors[${index}][${field}]`, fieldValue);
        });
      });
    }

    // Append sizes
    if (categoryType === "Size" || categoryType === "Both") {
      values.sizes.forEach((size, index) => {
        Object.entries(size).forEach(([field, fieldValue]) => {
          formData.append(`sizes[${index}][${field}]`, fieldValue);
        });
      });
    }

    // Debugging: Log the formData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await updateProduct(product.id, formData);
      navigate("/Home/products", { replace: true });
    } catch (error) {
      console.error("Failed to update product:", error.response?.data || error);
      alert(
        `Failed to update product: ${error.response?.data?.message || "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (files) => {
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imageUrls);
  };

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    getCategories();
  }, []);

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
                    name="category_id"
                    as="select"
                    className="w-full p-3 border-2 h-14 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                    value={values.category_id} // Use the value prop to control the selected option
                    onChange={(e) => {
                      const categoryId = e.target.value;
                      setFieldValue("category_id", categoryId);
                      const selectedCategory = categories.find(
                        (cat) => cat.id === Number(categoryId)
                      );
                      if (selectedCategory) {
                        setCategoryType(selectedCategory.type_name);
                      } else {
                        setCategoryType(null);
                      }
                    }}
                  >
                    <option value="">Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <InputField name={"tag_number"} placeholder={"Tag Number"} />
                  <Field
                    as="select"
                    name="gender"
                    className="w-full p-3 border-2 h-14 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="children">Children</option>
                  </Field>
                </div>
                <div className="flex gap-4 mt-3 mb-3">
                  <div className="flex items-center w-full border-2 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus-within:border-primary">
                    <span className="text-lg h-full w-10 text-center pt-3 font-bold text-gray-600 bg-gray-200">
                      %
                    </span>
                    <Field
                      name="return_percentage"
                      placeholder="percentage (upon return)"
                      className="outline-none ms-2"
                    />
                  </div>
                  <InputField name="stock" placeholder="Stock" />
                </div>
                <InputField
                  name={"tags_id"}
                  placeholder={"Tags"}
                  value={values.tags?.join(", ")} // Display tags as a comma-separated string
                  onChange={(e) => {
                    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
                    setFieldValue("tags_id", tagsArray);
                  }}
                />
                <Field
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  className="w-full bg-transparent outline-none border-2 border-gray-300 rounded-md p-2 h-20 mt-3 placeholder:text-14 focus:border-primary"
                />
              </div>
              <UploadUpdatedProductImages
                previewImages={previewImages}
                onImageChange={handleImageChange}
                setFieldValue={setFieldValue}
              />
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

            {/* Conditional Rendering for Colors and Sizes */}
            {categoryType === "Color" && (
              <ColorFieldArray
                values={values}
                setFieldValue={setFieldValue}
              />
            )}
            {categoryType === "Size" && (
              <SizeFieldArray
                values={values}
                setFieldValue={setFieldValue}
              />
            )}
            {categoryType === "Both" && (
              <>
                <ColorFieldArray
                  values={values}
                  setFieldValue={setFieldValue}
                />
                <SizeFieldArray
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </>
            )}

            <Footer
              saveText={"Save Changes"}
              cancelText={"Cancel"}
              cancelOnClick={() => navigate("/Home/products")}
              cancelBtnType={"button"}
              saveBtnType={"submit"}
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProduct;