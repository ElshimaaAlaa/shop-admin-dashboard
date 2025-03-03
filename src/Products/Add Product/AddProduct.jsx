import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import InputField from "../../Components/Input Field/InputField";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../ApiServices/AddNewProductApi";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { UploadProductImage } from "../../Components/Upload Image/UploadProductImages";
import "./style.scss";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    name: "",
    description: "",
    stock: "",
    price: "",
    category_id: "",
    tag_number: "",
    gender: "",
    discount_percentage: "",
    cost: "",
    revenue: "",
    discount_expire_at: "",
    images: [],
    // tags: [],
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name[ar]", values.name);
      formData.append("name[en]", values.name);
      formData.append("description[ar]", values.description);
      formData.append("description[en]", values.description);
      formData.append("stock", values.stock);
      formData.append("price", values.price);
      formData.append("category_id", values.category_id);
      formData.append("tag_number", values.tag_number);
      formData.append("gender", values.gender);
      formData.append("discount_percentage", values.discount_percentage);
      formData.append("cost", values.cost);
      formData.append("revenue", values.revenue);
      formData.append("discount_expire_at", values.discount_expire_at);

      // if (values.tags && values.tags.length > 0) {
      //   values.tags.forEach((tag, index) => {
      //     formData.append(`tags[${index}]`, tag);
      //   });
      // }

      values.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      console.log("Submitting data:", Object.fromEntries(formData.entries()));

      const productData = await addProduct(formData);
      console.log("Response:", productData);
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
      setErrors({
        submit: error.response?.data?.message || "Submission failed",
      });
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

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

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imageUrls);
    setFieldValue("images", files);
  };

  const handleCategoryChange = (categoryId, setFieldValue) => {
    const selectedCategory = categories.find(category => category.id === categoryId);
    if (selectedCategory && selectedCategory.tags) {
      setTags(selectedCategory.tags);
    } else {
      setTags([]);
    }
    setFieldValue("category_id", categoryId);
  };

  return (
    <div className="bg-gray-100 h-150vh relative">
      <Helmet>
        <title>Add New Product - VERTEX</title>
        <meta name="description" content="Add a new product to VERTEX" />
      </Helmet>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <Form className="flex flex-col">
            <h1 className="font-bold rounded-md p-5 text-lg mx-10 bg-white my-5">
              Add Product
            </h1>
            <div className="flex gap-5 mx-10">
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex gap-4">
                  <InputField name="name" placeholder="Product Name" />
                  <Field
                    name="category_id"
                    as="select"
                    className="w-full p-3 border-2 h-14 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                    onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
                  >
                    <option value="">Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="flex gap-4 mt-3">
                  <InputField name="tag_number" placeholder="Tag Number" />
                  <Field
                    as="select"
                    name="gender"
                    className="w-full p-3 border-2 h-14 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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
                {/* <Field
                  as="select"
                  name="tags"
                  placeholder="Tags"
                  className="w-full p-3 border-2 h-14 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                >
                  <option value="">Tags</option>
                  {tags.length > 0 ? (
                    categories.map((tag, index) => (
                      <option key={index} value={tag}>
                        {tags}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No tags available
                    </option>
                  )}
                </Field> */}
                <Field
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  className="w-full p-3 border-2 h-20 mt-3 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                />
              </div>
              <div className=" bg-white p-5 rounded-md w-2/4 h-80">
                <UploadProductImage
                  previewImages={previewImages}
                  onImageChange={(event) =>
                    handleImageChange(event, setFieldValue)
                  }
                />
              </div>
            </div>
            <div className="bg-white p-5 rounded-md mt-5 mx-10 w-890">
              <h2 className="font-bold mb-5">Pricing</h2>
              <div className="flex gap-4">
                <InputField name="price" placeholder="Price (For Piece)" />
                <InputField name="cost" placeholder="Cost" />
                <InputField name="revenue" placeholder="Revenue" />
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
            <Footer
              saveText="Save"
              cancelText="Cancel"
              cancelOnClick={() => navigate("/Home/products")}
              saveBtnType="submit"
              cancelBtnType="button"
              isLoading={isLoading || isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5">Product added successfully!</p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 w-40 mt-4"
            onClick={() => navigate("/Home/products")}
          >
            Back to products
          </button>
        </div>
      </SuccessModal>
    </div>
  );
};
export default AddProduct;