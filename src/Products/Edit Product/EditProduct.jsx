import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProduct } from "../../ApiServices/updateProduct";
import InputField from "../../Components/InputFields/InputField";
import UploadUpdatedProductImages from "../../Components/Upload Image/UploadUpdatedProductImages";
import Footer from "../../Components/Footer/Footer";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import SizeFieldArray from "../Add Product/SizeFieldArray";
import ColorFieldArray from "../Add Product/ColorFieldArray";
import PricingSection from "../Add Product/PricingSection";
import { ClipLoader } from "react-spinners";

// Custom Dropdown Component
const CustomDropdown = ({
  options = [],
  value,
  onFieldChange, // Renamed from onChange to be more explicit
  placeholder = "Select an option",
  name,
  error,
  touched,
  className = "",
  disabled = false,
  icon = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div
        className={`w-full bg-white outline-none border-2 rounded-md h-12 px-3 flex items-center justify-between cursor-pointer transition-all duration-200 ${
          error && touched
            ? "border-red-500"
            : "border-gray-200 hover:border-primary"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className={`${value ? "text-gray-800" : "text-gray-400"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          } ${disabled ? "text-gray-400" : "text-gray-500"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="#71717A"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                  value === option.value ? "bg-primary-50 text-primary-600" : ""
                }`}
                onClick={() => {
                  onFieldChange(name, option.value); // Changed to use onFieldChange
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}

      {error && touched && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

const TagPill = ({ tag, onRemove, isExisting }) => {
  return (
    <div
      className="flex items-center px-3 py-1 rounded-md text-14 font-medium mr-2 mb-2"
      style={{
        backgroundColor: "#EFD9A466",
        color: "#E0A75E",
      }}
    >
      {tag.name || tag}
      {!isExisting && <span className="ml-1 text-xs">(new)</span>}
      <button
        type="button"
        onClick={() => onRemove(tag)}
        className="ml-2 text-red-600 text-15 focus:outline-none hover:scale-125 transition-transform"
        aria-label={`Remove tag ${tag.name || tag}`}
      >
        ×
      </button>
    </div>
  );
};

function EditProduct() {
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const [tagsToRemove, setTagsToRemove] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product || {};

  const [previewImages, setPreviewImages] = useState(
    product?.images?.map(
      (img) => img.src || "/assets/images/default-product.png"
    ) || []
  );
  const [categoryType, setCategoryType] = useState(null);

  const normalizeTags = (tags) => {
    if (!tags) return [];
    return tags.map((tag) => ({
      ...(typeof tag === "object" ? tag : { name: tag }),
      id: tag.id ? parseInt(tag.id) : null,
    }));
  };

  const normalizeColors = (colors) => {
    if (!colors) return [];
    return colors.map((color) => ({
      ...color,
      id: color.id ? parseInt(color.id) : null,
      name:
        typeof color.name === "string"
          ? { ar: color.name, en: color.name }
          : color.name || { ar: "", en: "" },
      existingImage: color.image || null,
      previewImage: color.image || null,
      image: null,
    }));
  };

  const initialValues = {
    name: product.name || "",
    cost: product.cost || "",
    return_percentage: product.return_percentage || "",
    revenue: product.revenue || "",
    description: product.description || "",
    tag_number: product.tag_number || "",
    gender: product.gender || "",
    tags_id: normalizeTags(product.tags || []),
    tagInput: "",
    images: product.images || [],
    category_id: product.category_id || product.category?.id || "",
    price: product.price || 0,
    discount_percentage: product.discount_percentage || 0,
    discount_expire_at: product.discount_expire_at || "",
    stock: product.stock || 0,
    sizes: product.sizes || [],
    colors: normalizeColors(product.colors || []),
    schedule_discount: product.schedule_discount || false,
  };

  const handleRemoveImage = (indexToRemove, setFieldValue, values) => {
    const newImages = [...values.images];
    newImages.splice(indexToRemove, 1);
    setFieldValue("images", newImages);

    const newPreviews = [...previewImages];
    newPreviews.splice(indexToRemove, 1);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();

    // Basic product info
    formData.append("name[ar]", values.name);
    formData.append("name[en]", values.name);
    formData.append("description[ar]", values.description);
    formData.append("description[en]", values.description);
    formData.append("cost", values.cost);
    formData.append("revenue", values.revenue);
    formData.append("tag_number", values.tag_number);
    formData.append("category_id", values.category_id);
    formData.append("return_percentage", values.return_percentage);
    formData.append("gender", values.gender);

    // Handle main product images
    values.images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image);
      } else if (image.src) {
        formData.append(`existing_images[${index}]`, image.src);
      }
    });

    // Pricing info
    formData.append("price", values.price);
    formData.append("discount_percentage", values.discount_percentage);
    if (values.discount_expire_at) {
      formData.append("discount_expire_at", values.discount_expire_at);
    }
    formData.append("stock", values.stock);
    formData.append("schedule_discount", values.schedule_discount);

    // Handle tags
    values.tags_id.forEach((tag, index) => {
      if (!tag.id && !product.tags?.includes(tag.name)) {
        formData.append(`new_tags[${index}]`, tag.name);
      }
    });

    tagsToRemove.forEach((tagName, index) => {
      if (product.tags?.includes(tagName)) {
        formData.append(`tags_to_remove[${index}]`, tagName);
      }
    });

    // Handle colors with their images
    if (values.colors && values.colors.length > 0) {
      values.colors.forEach((color, index) => {
        if (color.id) {
          formData.append(`colors[${index}][id]`, color.id);
        }
        formData.append(`colors[${index}][name][ar]`, color.name?.ar || "");
        formData.append(`colors[${index}][name][en]`, color.name?.en || "");
        formData.append(`colors[${index}][code]`, color.code || "");
        formData.append(`colors[${index}][stock]`, color.stock || 0);
        formData.append(`colors[${index}][price]`, color.price || 0);
        if (color.image instanceof File) {
          formData.append(`colors[${index}][image]`, color.image);
        } else if (color.existingImage) {
          formData.append(
            `colors[${index}][existing_image]`,
            color.existingImage
          );
        }

        formData.append(
          `colors[${index}][schedule_discount]`,
          color.schedule_discount ? "1" : "0"
        );
        if (color.schedule_discount) {
          formData.append(
            `colors[${index}][discount_percentage]`,
            color.discount_percentage || 0
          );
          if (color.discount_expire_at) {
            formData.append(
              `colors[${index}][discount_expire_at]`,
              color.discount_expire_at
            );
          }
        }
      });
    }
    // Handle sizes
    if (values.sizes && values.sizes.length > 0) {
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
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveTag = (tagToRemove, setFieldValue, values) => {
    const newTags = values.tags_id.filter(
      (tag) => tag.name !== tagToRemove.name
    );
    setFieldValue("tags_id", newTags);
    if (product.tags?.includes(tagToRemove.name)) {
      setTagsToRemove((prev) => [...prev, tagToRemove.name]);
    }
    if (tagsToAdd.includes(tagToRemove.name)) {
      setTagsToAdd((prev) => prev.filter((name) => name !== tagToRemove.name));
    }
  };
  const handleAddTag = (newTagName, setFieldValue, values) => {
    if (!newTagName.trim()) return;

    const existingTag = availableTags.find(
      (t) => t.name.toLowerCase() === newTagName.toLowerCase()
    );

    const newTag = existingTag || { name: newTagName };

    if (
      !values.tags_id.some(
        (t) => t.name.toLowerCase() === newTagName.toLowerCase()
      )
    ) {
      setFieldValue("tags_id", [...values.tags_id, newTag]);

      if (!product.tags?.includes(newTagName)) {
        setTagsToAdd((prev) => [...prev, newTagName]);
      }
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

    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags");
        const data = await response.json();
        setAvailableTags(data);
      } catch (error) {
        console.error("Failed to fetch tags", error);
      } finally {
        setIsInitializing(false);
      }
    };
    fetchTags();
  }, []);

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

  useEffect(() => {
    if (initialValues.tagInput && initialValues.tagInput.length > 1) {
      const filtered = availableTags.filter(
        (tag) =>
          tag.name
            .toLowerCase()
            .includes(initialValues.tagInput.toLowerCase()) &&
          !initialValues.tags_id.some(
            (t) => t.name.toLowerCase() === tag.name.toLowerCase()
          )
      );
      setTagSuggestions(filtered);
    } else {
      setTagSuggestions([]);
    }
  }, [initialValues.tagInput, availableTags]);

  const hasColors = product.colors && product.colors.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required";
    if (!values.category_id) errors.category_id = "Required";
    return errors;
  };

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "children", label: "Children" },
  ];

  return (
    <div className={`bg-gray-100 flex flex-col min-h-screen pb-32 relative`}>
      <Helmet>
        <title>Edit Product - VERTEX</title>
        <meta name="description" content="Edit product details in VERTEX" />
      </Helmet>
      <section className="rounded-md p-5 mx-5 bg-white mt-5 mb-3">
        <p className="text-gray-400 text-13">Menu / Products / Edit Product</p>
        <h1 className="text-17 mt-3 font-bold"> Edit Product</h1>
      </section>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, touched, errors }) => (
          <Form className="flex flex-col flex-grow">
            <div className="flex gap-4 mx-5">
              <section className="bg-white p-4 rounded-md w-full">
                <h2 className="font-bold mb-4 text-16">Basic Information</h2>
                <div className="flex gap-2">
                  <InputField
                    placeholder="Product Name"
                    name="name"
                    error={errors.name}
                    touched={touched.name}
                  />
                  <CustomDropdown
                    name="category_id"
                    options={categories.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                    value={values.category_id}
                    onFieldChange={setFieldValue} // Changed to onFieldChange
                    placeholder="Select Category"
                    error={errors.category_id}
                    touched={touched.category_id}
                  />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <InputField name={"tag_number"} placeholder={"Tag Number"} />
                  <CustomDropdown
                    name="gender"
                    options={genderOptions}
                    value={values.gender}
                    onFieldChange={setFieldValue} // Changed to onFieldChange
                    placeholder="Select Gender"
                    error={errors.gender}
                    touched={touched.gender}
                  />
                </div>
                <div className="flex gap-2 mt-3 mb-3">
                  <Field
                    name="return_percentage"
                    placeholder="percentage (upon return)"
                    className={`w-full h-12 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary placeholder:text-gray-400`}
                  />
                  <div className="w-full">
                    <InputField name="stock" placeholder="Stock" />
                  </div>
                </div>

                <div className="w-full mt-3">
                  <div className="flex flex-wrap mb-2">
                    {values.tags_id.length > 0 ? (
                      values.tags_id.map((tag, index) => (
                        <TagPill
                          key={`${tag.id || tag.name}-${index}`}
                          tag={tag}
                          isExisting={product.tags?.includes(tag.name)}
                          onRemove={() =>
                            handleRemoveTag(tag, setFieldValue, values)
                          }
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No tags added yet</p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Add new tag (press enter to add)"
                      className="w-full p-3 border-2 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                      value={values.tagInput || ""}
                      onChange={(e) => {
                        setFieldValue("tagInput", e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "," || e.key === "Enter") {
                          e.preventDefault();
                          const newTagName = e.target.value
                            .trim()
                            .replace(/,+$/, "");
                          if (newTagName) {
                            handleAddTag(newTagName, setFieldValue, values);
                            setFieldValue("tagInput", "");
                            setTagSuggestions([]);
                          }
                        }
                      }}
                    />
                    {tagSuggestions.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-auto">
                        {tagSuggestions.map((tag) => (
                          <div
                            key={tag.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleAddTag(tag.name, setFieldValue, values);
                              setTagSuggestions([]);
                              setFieldValue("tagInput", "");
                            }}
                          >
                            {tag.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Field
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md p-2 h-20 mt-3 placeholder:text-14 focus:border-primary"
                />
              </section>
              <UploadUpdatedProductImages
                previewImages={previewImages}
                onImageChange={(files) => {
                  const imageUrls = files.map((file) =>
                    file instanceof File ? URL.createObjectURL(file) : file
                  );
                  setPreviewImages(imageUrls);
                  setFieldValue("images", files);
                }}
                onRemoveImage={(index) =>
                  handleRemoveImage(index, setFieldValue, values)
                }
                setFieldValue={setFieldValue}
              />
            </div>
            <PricingSection
              isDiscountScheduled={isDiscountScheduled}
              setIsDiscountScheduled={setIsDiscountScheduled}
            />
            {(hasColors || hasSizes) && (
              <div>
                {hasColors && (
                  <ColorFieldArray
                    values={values}
                    setFieldValue={setFieldValue}
                    makeImageOptional={true}
                  />
                )}
                {hasSizes && (
                  <SizeFieldArray
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}
              </div>
            )}
            <Footer
              saveText={
                isLoading ? (
                  <ClipLoader color="#fff" size={22} />
                ) : (
                  "Save Changes"
                )
              }
              cancelText={"Cancel"}
              cancelOnClick={() => navigate("/Home/products")}
              cancelBtnType={"button"}
              saveBtnType={"submit"}
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
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
            onClick={() => navigate("/Dashboard/products")}
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
