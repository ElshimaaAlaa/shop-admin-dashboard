import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProduct } from "../../ApiServices/updateProduct";
import InputField from "../../Components/InputFields/InputField";
import UploadUpdatedProductImages from "../../Components/Upload Image/UploadUpdatedProductImages";
import Footer from "../../Components/Footer/Footer";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { VscPercentage } from "react-icons/vsc";
import SizeFieldArray from "../Add Product/SizeFieldArray";
import ColorFieldArray from "../Add Product/ColorFieldArray";
import PricingSection from "../Add Product/PricingSection";
function EditProduct() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState("h-auto");

  const { state } = useLocation();
  const [previewImages, setPreviewImages] = useState(
    state?.images?.map((img) => img.src) || []
  );
  const navigate = useNavigate();
  const product = state || {};
  const [categoryType, setCategoryType] = useState(null);
  useEffect(() => {
    if (product.category_id) {
      const selectedCategory = categories.find(
        (cat) => cat.id === product.category_id
      );
      if (selectedCategory) {
        setCategoryType(selectedCategory.type_name);
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
    tags_id: product.tags || [],
    images: product.images || [],
    category_id: product.category?.id || "",
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
    formData.append("category_id", values.category_id);
    values.images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image);
      }
    });
    formData.append("price", values.price);
    formData.append("discount_percentage", values.discount_percentage);
    formData.append("discount_expire_at", values.discount_expire_at);
    formData.append("stock", values.stock);
    if (values.tags_id && values.tags_id.length > 0) {
      formData.append("tags_id", JSON.stringify(values.tags_id));
    } else {
      formData.append("tags_id", "[]");
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
    try {
      await updateProduct(product.id, formData);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to update product:", error.response?.data || error);
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
  useEffect(() => {
    if (categoryType === "Both") {
      setDynamicHeight("h-400vh");
    } else if (categoryType === "Color" || categoryType === "Size") {
      setDynamicHeight("h-300vh");
    } else {
      setDynamicHeight("h-150vh");
    }
  }, [categoryType]);
  return (
    <div className={`bg-gray-100 flex flex-col ${dynamicHeight} relative`}>
      <Helmet>
        <title>Edit Product - VERTEX</title>
        <meta name="description" content="Edit product details in VERTEX" />
      </Helmet>
      <h1 className="font-bold rounded-md p-5 text-17 mx-10 bg-white my-3">
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
                        console.log(
                          "Selected Category Type:",
                          selectedCategory.type_name
                        ); // Debugging
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
                  <div className="relative flex items-center w-810 border-2 bg-transparent border-gray-200 rounded-md  focus-within:border-primary">
                    <span className="h-full w-10 text-center pt-4 ps-2 bg-gray-100 absolute rounded-tl-md rounded-bl-md">
                      <VscPercentage className="text-xl text-gray-600 font-bold" />
                    </span>
                    <Field
                      name="return_percentage"
                      placeholder="percentage (upon return)"
                      className="outline-none ms-12 placeholder:text-14"
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="stock" placeholder="Stock" />
                  </div>
                </div>
                <InputField
                  name={"tags_id"}
                  placeholder={"Tags"}
                  value={values.tags?.join(", ")}
                  onChange={(e) => {
                    const tagsArray = e.target.value
                      .split(",")
                      .map((tag) => tag.trim());
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
            <PricingSection values={values} setFieldValue={setFieldValue} />
            {categoryType === "Color" && (
              <ColorFieldArray values={values} setFieldValue={setFieldValue} />
            )}
            {categoryType === "Size" && (
              <SizeFieldArray values={values} setFieldValue={setFieldValue} />
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
      {/* Success Modal */}
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col justify-center w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">
            Product updated successfully!
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-64"
            onClick={() => navigate("/Home/products")}
            aria-label="Back to products"
          >
            Back to products
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditProduct;