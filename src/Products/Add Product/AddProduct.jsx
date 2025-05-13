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
import PricingSection from "./PricingSection";
import BasicInformationSection from "./BasicInformationSection";
import SizeFieldArray from "./SizeFieldArray";
import * as Yup from "yup";
import ColorFieldArray from "./ColorFieldArray";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryTags, setSelectedCategoryTags] = useState([]);
  const [categoryType, setCategoryType] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append("name[ar]", values.name);
      formData.append("name[en]", values.name);
      formData.append("description[ar]", values.description);
      formData.append("description[en]", values.description);

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

      // Handle different category types
      if (categoryType === "Color") {
        // Handle colors array (standalone)
        if (values.colors.length > 0) {
          values.colors.forEach((color, index) => {
            formData.append(`colors[${index}][name][ar]`, color.name.ar || "");
            formData.append(`colors[${index}][name][en]`, color.name.en || "");

            Object.entries(color).forEach(([field, fieldValue]) => {
              if (field !== "name" && field !== "previewImage") {
                if (field === "image") {
                  // Use the first product image as default if no color image is provided
                  if (!fieldValue && values.images.length > 0) {
                    formData.append(`colors[${index}][image]`, values.images[0]);
                  } else if (fieldValue instanceof File) {
                    formData.append(`colors[${index}][${field}]`, fieldValue);
                  }
                } else {
                  formData.append(
                    `colors[${index}][${field}]`,
                    fieldValue || ""
                  );
                }
              }
            });
          });
        }
      } else if (categoryType === "Size") {
        // Handle sizes array (standalone)
        if (values.sizes.length > 0) {
          values.sizes.forEach((size, index) => {
            Object.entries(size).forEach(([field, fieldValue]) => {
              formData.append(`sizes[${index}][${field}]`, fieldValue || "");
            });
          });
        }
      } else if (categoryType === "Both") {
        // Handle sizes with nested colors
        if (values.sizes.length > 0) {
          values.sizes.forEach((size, sizeIndex) => {
            // Append size fields
            Object.entries(size).forEach(([field, fieldValue]) => {
              if (field !== "colors") {
                formData.append(
                  `sizes[${sizeIndex}][${field}]`,
                  fieldValue || ""
                );
              }
            });

            // Append nested colors for this size
            if (size.colors && size.colors.length > 0) {
              size.colors.forEach((color, colorIndex) => {
                formData.append(
                  `sizes[${sizeIndex}][colors][${colorIndex}][name][ar]`,
                  color.name.ar || ""
                );
                formData.append(
                  `sizes[${sizeIndex}][colors][${colorIndex}][name][en]`,
                  color.name.en || ""
                );

                Object.entries(color).forEach(([field, fieldValue]) => {
                  if (field !== "name" && field !== "previewImage") {
                    if (field === "image") {
                      // Use the first product image as default if no color image is provided
                      if (!fieldValue && values.images.length > 0) {
                        formData.append(
                          `sizes[${sizeIndex}][colors][${colorIndex}][image]`,
                          values.images[0]
                        );
                      } else if (fieldValue instanceof File) {
                        formData.append(
                          `sizes[${sizeIndex}][colors][${colorIndex}][${field}]`,
                          fieldValue
                        );
                      }
                    } else {
                      formData.append(
                        `sizes[${sizeIndex}][colors][${colorIndex}][${field}]`,
                        fieldValue || ""
                      );
                    }
                  }
                });
              });
            }
          });
        }
      }

      // Handle images
      if (values.images.length > 0) {
        values.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }

      // Handle tags
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

      // Reset sizes and colors when category changes
      setFieldValue("sizes", []);
      setFieldValue("colors", []);
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

  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return (
    <div className={`bg-gray-100 pb-32 min-h-screen relative `}>
      <Helmet>
        <title>Add New Product - VERTEX</title>
        <meta name="description" content="Add a new product to VERTEX" />
      </Helmet>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <Form className="flex flex-col ">
            <sectio className="rounded-md p-4 bg-white mb-3 mt-5 mx-5">
              <p className="text-gray-400 text-12">Menu / Product  / Add Product</p>
              <h1 className="text-17 mt-3 font-bold">Add Product</h1>
            </sectio>
            <div className="flex">
              <BasicInformationSection
                categories={categories}
                selectedCategoryTags={selectedCategoryTags}
                values={values}
                setFieldValue={setFieldValue}
                handleCategoryChange={handleCategoryChange}
                handleTagChange={handleTagChange}
              />
              <div className="bg-white p-4 me-5 rounded-md w-2/4 h-80">
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
              <ColorFieldArray 
                values={values} 
                setFieldValue={setFieldValue} 
                productImages={values.images}
              />
            )}
            {categoryType === "Size" && (
              <SizeFieldArray
                values={values}
                setFieldValue={setFieldValue}
                hasNestedColors={categoryType === "Both"}
                productImages={values.images}
              />
            )}
            {categoryType === "Both" && (
              <SizeFieldArray
                values={values}
                setFieldValue={setFieldValue}
                hasNestedColors={true}
                productImages={values.images}
              />
            )}
            <Footer
              saveText="Save"
              cancelText="Cancel"
              cancelOnClick={() => navigate("/Dashboard/products")}
              saveBtnType="submit"
              cancelBtnType="button"
              isLoading={isLoading || isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col justify-center w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">
            Product added successfully!
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-64"
            onClick={() => navigate("/Dashboard/products")}
            aria-label="Back to products"
          >
            Back to products
          </button>
        </div>
      </SuccessModal>
    </div>
  );
};

export default AddProduct;