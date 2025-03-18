import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Helmet } from "react-helmet";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../ApiServices/AddNewProductApi";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { UploadProductImage } from "../../Components/Upload Image/UploadProductImages";
import "./style.scss";
import ColorFieldArray from "./ColorFieldArray";
import PricingSection from "./PricingSection";
import BasicInformationSection from "./BasicInformationSection";
import SizeFieldArray from "./SizeFieldArray";
import * as Yup from "yup";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryTags, setSelectedCategoryTags] = useState([]);
  const [categoryType, setCategoryType] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState("h-auto");

  const initialValues = {
    name: "",
    category_id: "",
    tag_number: "",
    gender: "",
    return_percentage: "",
    stock: "",
    tags_ids: [],
    description: "",
    price: "",
    cost: "",
    revenue: "",
    discount_percentage: "",
    discount_expire_at: "",
    images: [],
    colors: [],
    sizes: [],
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    category_id: Yup.string().required("Category is required"),
    tag_number: Yup.string().required("Tag number is required"),
    gender: Yup.string().required("Gender is required"),
    return_percentage: Yup.number().required("Return percentage is required"),
    stock: Yup.number().required("Stock is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    cost: Yup.number().required("Cost is required"),
    revenue: Yup.number().required("Revenue is required"),
    discount_percentage: Yup.number().when("isDiscountScheduled", {
      is: true,
      then: Yup.number().required("Discount percentage is required"),
    }),
  })
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("name[ar]", values.name);
      formData.append("name[en]", values.name);
      formData.append("description[ar]", values.description);
      formData.append("description[en]", values.description);

      // Append other basic fields
      Object.entries(values).forEach(([key, value]) => {
        if (
          key !== "colors" &&
          key !== "sizes" &&
          key !== "images" &&
          key !== "tags_ids" &&
          key !== "name" &&
          key !== "description"
        ) {
          formData.append(key, value);
        }
      });

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
      // Append images
      values.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      // Append tags
      values.tags_ids.forEach((tagId, index) => {
        formData.append(`tags_ids[${index}]`, tagId);
      });
      await addProduct(formData);
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

  const handleCategoryChange = (categoryId, setFieldValue) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === Number(categoryId)
    );
    if (selectedCategory) {
      const arabicTags = selectedCategory.tags?.ar || [];
      const englishTags = selectedCategory.tags?.en || [];
      const combinedTags = [...arabicTags, ...englishTags];
      setSelectedCategoryTags(combinedTags);
      setFieldValue("category_id", categoryId);
      setCategoryType(selectedCategory.type_name);
    } else {
      setSelectedCategoryTags([]);
      setFieldValue("category_id", "");
      setCategoryType(null);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imageUrls);
    setFieldValue("images", files);
  };

  const handleTagChange = (tagId, setFieldValue, values) => {
    const selectedTags = values.tags_ids.includes(tagId)
      ? values.tags_ids.filter((id) => id !== tagId)
      : [...values.tags_ids, tagId];
    setFieldValue("tags_ids", selectedTags);
  };

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
    <div className={`bg-gray-100 ${dynamicHeight} relative`}>
      <Helmet>
        <title>Add New Product - VERTEX</title>
        <meta name="description" content="Add a new product to VERTEX" />
      </Helmet>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <Form className="flex flex-col">
            <h1 className="font-bold rounded-md p-5 text-17 mx-10 bg-white my-5">
              Add Product
            </h1>
            <div className="flex gap-5 mx-10">
              <BasicInformationSection
                categories={categories}
                selectedCategoryTags={selectedCategoryTags}
                values={values}
                setFieldValue={setFieldValue}
                handleCategoryChange={handleCategoryChange}
                handleTagChange={handleTagChange}
              />
              <div className="bg-white p-5 rounded-md w-2/4 h-80">
                <UploadProductImage
                  previewImages={previewImages}
                  onImageChange={(event) =>
                    handleImageChange(event, setFieldValue)
                  }
                />
              </div>
            </div>
            <PricingSection
              isDiscountScheduled={isDiscountScheduled}
              setIsDiscountScheduled={setIsDiscountScheduled}
            />
            {categoryType === "Color" && (
              <ColorFieldArray values={values} setFieldValue={setFieldValue} />
            )}
            {categoryType === "Size" && (
              <SizeFieldArray values={values} setFieldValue={setFieldValue} />
            )}
            {categoryType === "Both" && (
              <>
                <ColorFieldArray
                  values={values}
                  setFieldValue={setFieldValue}
                />
                <SizeFieldArray values={values} setFieldValue={setFieldValue} />
              </>
            )}
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