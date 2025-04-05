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

const TagPill = ({ tag, onRemove }) => {
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return `#${'00000'.substring(0, 6 - c.length)}${c}`;
  };

  const bgColor = stringToColor(tag.id?.toString() || tag.toString());
  const textColor = parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 1.5 
    ? '#000000' 
    : '#ffffff';

  return (
    <div 
      className="flex items-center px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {tag.name || tag}
      <button 
        type="button" 
        onClick={() => onRemove(tag)}
        className="ml-2 focus:outline-none hover:scale-125 transition-transform"
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
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState("h-auto");
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state || {};

  const [previewImages, setPreviewImages] = useState(
    state?.images?.map((img) => img.src) || []
  );
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

  const normalizeTags = (tags) => {
    if (!tags) return [];
    return tags.map(tag => 
      typeof tag === 'object' ? tag : { id: tag, name: `Tag ${tag}` }
    );
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
    colors: product.colors
      ? product.colors.map((color) => ({
          id: color.id || null,
          name: {
            ar: typeof color.name === 'object' 
                ? color.name.ar 
                : (color.name || ''),
            en: typeof color.name === 'object' 
                ? color.name.en 
                : (color.name || '')
          },
          code: color.code || "",
          stock: color.stock || 0,
          price: color.price || 0,
          image: color.image || null,
          previewImage: color.image?.src || color.image?.url || product.images[0]?.src || '',
          schedule_discount: color.schedule_discount || false,
          discount_percentage: color.discount_percentage || 0,
          discount_expire_at: color.discount_expire_at || "",
        }))
      : [],
    schedule_discount: product.schedule_discount || false,
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    
    // Basic product information
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
    
    // Handle images
    values.images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images[${index}]`, image);
      }
    });
    
    // Pricing information
    formData.append("price", values.price);
    formData.append("discount_percentage", values.discount_percentage);
    if (values.discount_expire_at) {
      formData.append("discount_expire_at", values.discount_expire_at);
    }
    formData.append("stock", values.stock);
    formData.append("schedule_discount", values.schedule_discount);
    
    // Handle tags - send as tags_ids[] array with indexes
    values.tags_id.forEach((tag, index) => {
      if (tag.id) {
        formData.append(`tags_ids[${index}]`, tag.id);
      }
    });
    
    // Handle colors
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
      console.error("Failed to update product:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (files) => {
    const imageUrls = files.map((file) => 
      file instanceof File ? URL.createObjectURL(file) : file
    );
    setPreviewImages(imageUrls);
  };

  const handleRemoveImage = (indexToRemove, setFieldValue, values) => {
    const newImages = [...values.images];
    newImages.splice(indexToRemove, 1);
    setFieldValue("images", newImages);
    
    const newPreviews = [...previewImages];
    newPreviews.splice(indexToRemove, 1);
    setPreviewImages(newPreviews);
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

    // Fetch available tags from API
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        setAvailableTags(data);
      } catch (error) {
        console.error('Failed to fetch tags', error);
      }
    };
    fetchTags();
  }, []);

  const hasColors = product.colors && product.colors.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;

  useEffect(() => {
    if (hasSizes && hasColors) {
      setDynamicHeight("h-[400vh]");
    } else if (hasSizes || hasColors) {
      setDynamicHeight("h-[300vh]");
    } else {
      setDynamicHeight("h-[150vh]");
    }
  }, [hasColors, hasSizes]);

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
        {({ setFieldValue, values, setTouched, touched }) => (
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
                    value={values.category_id}
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
                    <option value="">Select Category</option>
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
                    value={values.gender}
                  >
                    <option value="">Select Gender</option>
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
                
                {/* Enhanced Tags Input */}
                <div className="w-full mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  
                  {/* Display existing tags as pills */}
                  <div className="flex flex-wrap mb-2">
                    {values.tags_id.length > 0 ? (
                      values.tags_id.map((tag, index) => (
                        <TagPill
                          key={tag.id || index}
                          tag={tag}
                          onRemove={(tagToRemove) => {
                            const newTags = values.tags_id.filter((t, i) => 
                              i !== index // Remove by index to handle potential duplicates
                            );
                            setFieldValue("tags_id", newTags);
                          }}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No tags added yet</p>
                    )}
                  </div>

                  {/* Tag input field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Add tags (press comma or enter to add)"
                      className="w-full p-3 border-2 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                      value={values.tagInput || ""}
                      onChange={(e) => {
                        setFieldValue("tagInput", e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === ',' || e.key === 'Enter') {
                          e.preventDefault();
                          const newTagName = e.target.value.trim().replace(/,+$/, '');
                          if (newTagName) {
                            // Check if this is an existing tag
                            const existingTag = availableTags.find(t => 
                              t.name.toLowerCase() === newTagName.toLowerCase()
                            );
                            
                            const newTag = existingTag || { name: newTagName };
                            
                            // Only add if not already present
                            if (!values.tags_id.some(t => 
                              (t.id && t.id === newTag.id) || 
                              (t.name && t.name.toLowerCase() === newTagName.toLowerCase())
                            )) {
                              setFieldValue("tags_id", [...values.tags_id, newTag]);
                            }
                            setFieldValue("tagInput", "");
                          }
                        }
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 text-sm">, or Enter</span>
                    </div>
                  </div>
                </div>

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
                onRemoveImage={(index) => handleRemoveImage(index, setFieldValue, values)}
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