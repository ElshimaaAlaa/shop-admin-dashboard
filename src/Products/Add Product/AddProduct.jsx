import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import InputField from "../../Components/Input Field/InputField";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../ApiServices/AddNewProductApi";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import UploadProductImages from "../../Components/Upload Image/UploadProductImages";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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
    tags: [], //is an array of tags
    images: [], // is an array of images
    upon_return: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    stock: Yup.number().required("Stock is required"),
    price: Yup.number().required("Price is required"),
    category_id: Yup.number().required("Category is required"),
    tag_number: Yup.string().required("Tag number is required"),
    gender: Yup.string().required("Gender is required"),
    discount_percentage: Yup.number().required("Discount is required"),
    cost: Yup.number().required("Cost is required"),
    revenue: Yup.number().required("Revenue is required"),
    discount_expire_at: Yup.date().required("Discount expiry date is required"),
    tags: Yup.array()
      .of(Yup.string().required("Tag is required"))
      .min(1, "At least one tag is required"),
    images: Yup.array()
      .of(Yup.mixed().required("At least one image is required"))
      .min(1, "At least one image is required"),
  });

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
      values.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });

      if (values.images && values.images.length > 0) {
        values.images.forEach((image, index) => {
          formData.append("images[]", image);
        });
      }

      console.log("Submitting data:", Object.fromEntries(formData.entries()));

      // end point to add the product
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

  // Handle image selection
  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue("images", files); // Update Formik's images field

    // Create URLs for preview
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImage(imageUrls); // Update preview images
  };

  // Handle category selection
  const handleCategoryChange = (e, setFieldValue) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId); // Update selected category ID
    setFieldValue("category_id", categoryId); // Update Formik value
  };

  return (
    <div className="bg-gray-100 h-150vh relative">
      <Helmet>
        <title>Add New Product - VERTEX</title>
        <meta name="description" content="Add a new product to VERTEX" />
      </Helmet>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <Form className="flex flex-col">
            <h1 className="font-bold rounded-md p-5 text-lg mx-10 bg-white my-5">
              Add Product
            </h1>
            <div className="flex gap-5 mx-10">
              {/* Basic Information Section */}
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex gap-4">
                  <InputField name="name" placeholder="Product Name" />
                  <Field
                    name="category_id"
                    as="select"
                    className="w-full p-3 border-2 h-14 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                    onChange={(e) => handleCategoryChange(e, setFieldValue)}
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
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center w-full border-2 h-14 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus-within:border-primary">
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
                    <Field
                      as="select"
                      className="flex gap-3 mt-2 border-2 border-gray-200 w-full rounded-md p-3 h-14 text-gray-600 text-15"
                    >
                      <option>Tags</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.tags}>
                          {category.tags}
                        </option>
                      ))}
                    </Field>
                <Field
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  className="w-full p-3 border-2 h-20 mt-3 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                />
              </div>
              <div className="bg-white p-4 rounded-md w-2/4 h-80">
                <UploadProductImages
                  previewImage={previewImage}
                  onImageChange={(event) =>
                    handleImageChange(event, setFieldValue)
                  }
                />
              </div>
            </div>
            {/* Pricing Section */}
            <div className="bg-white p-5 rounded-md mt-5 mx-10 w-890">
              <h2 className="font-bold mb-5">Pricing</h2>
              <div className="flex gap-4">
                <InputField name="price" placeholder="Price (For Piece)" />
                <InputField name="cost" placeholder="Cost" />
                <InputField name="revenue" placeholder="Revenue" />
              </div>
              <div className="flex items-center gap-3 mt-3 mb-3">
                <Field
                  as="input"
                  type="checkbox"
                  name="schedule_discount"
                  className="w-4 h-4 border-2"
                  onChange={(e) => {
                    setIsDiscountScheduled(e.target.checked);
                    setFieldValue("schedule_discount", e.target.checked);
                  }}
                />
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
      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5">Product added successfully!</p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 font-semibold mt-4"
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
