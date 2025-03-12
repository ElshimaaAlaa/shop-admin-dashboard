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
  const [selectedCategoryTags, setSelectedCategoryTags] = useState([]);
  const [categoryType, setCategoryType] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [isDiscountScheduled, setIsDiscountScheduled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

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
    color_name: "",
    color_code: "",
    color_stock: "",
    color_price: "",
    color_discount_percentage: "",
    color_discount_expire_at: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name[ar]", values.name);
      formData.append("name[en]", values.name);
      formData.append("category_id", values.category_id);
      formData.append("tag_number", values.tag_number);
      formData.append("gender", values.gender);
      formData.append("return_percentage", values.return_percentage);
      formData.append("stock", values.stock);
      formData.append("description[ar]", values.description);
      formData.append("description[en]", values.description);
      formData.append("price", values.price);
      formData.append("cost", values.cost);
      formData.append("revenue", values.revenue);
      formData.append("discount_percentage", values.discount_percentage);
      formData.append("discount_expire_at", values.discount_expire_at);

      // Append colors if category type is "Color" or "Both"
      if (categoryType === "Color" || categoryType === "Both") {
        colors.forEach((color, index) => {
          formData.append(`colors[${index}][name]`, color.name);
          formData.append(`colors[${index}][code]`, color.code);
          formData.append(`colors[${index}][stock]`, color.stock);
          formData.append(`colors[${index}][price]`, color.price);
          formData.append(
            `colors[${index}][discount_percentage]`,
            color.discount_percentage
          );
          formData.append(
            `colors[${index}][discount_expire_at]`,
            color.discount_expire_at
          );
        });
      }

      // Append sizes if category type is "Size" or "Both"
      if (categoryType === "Size" || categoryType === "Both") {
        sizes.forEach((size, index) => {
          formData.append(`sizes[${index}][name]`, size.name);
          formData.append(`sizes[${index}][stock]`, size.stock);
          formData.append(`sizes[${index}][price]`, size.price);
          formData.append(
            `sizes[${index}][discount_percentage]`,
            size.discount_percentage
          );
          formData.append(
            `sizes[${index}][discount_expire_at]`,
            size.discount_expire_at
          );
        });
      }

      values.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      values.tags_ids.forEach((tagId, index) => {
        formData.append(`tags_ids[${index}]`, tagId);
      });

      console.log("Submitted data:", Object.fromEntries(formData.entries()));
      const productData = await addProduct(formData);
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
      setCategoryType(selectedCategory.type_name); // Ensure this is set correctly
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
      ? values.tags_ids.filter((id) => id !== tagId) // Remove tag if already selected
      : [...values.tags_ids, tagId]; // Add tag if not selected

    setFieldValue("tags_ids", selectedTags);
  };

  const addColor = () => {
    setColors([
      ...colors,
      {
        name: "",
        code: "",
        stock: "",
        price: "",
        discount_percentage: "",
        discount_expire_at: "",
      },
    ]);
  };

  const removeColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const addSize = () => {
    setSizes([
      ...sizes,
      {
        name: "",
        stock: "",
        price: "",
        discount_percentage: "",
        discount_expire_at: "",
      },
    ]);
  };

  const removeSize = (index) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  return (
    <div className="bg-gray-100 overflow-y-auto h-150vh relative">
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
                    className="w-full p-3 border-2 bg-transparent border-gray-200 rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                    onChange={(e) => {
                      const categoryId = e.target.value;
                      handleCategoryChange(categoryId, setFieldValue);
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
                <div className="flex gap-4 mt-3">
                  <InputField name="tag_number" placeholder="Tag Number" />
                  <Field
                    as="select"
                    name="gender"
                    className="w-full p-3 border-2 bg-transparent border-gray-200 rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="children">Children</option>
                  </Field>
                </div>
                <div className="flex gap-4 mt-3 mb-3">
                  <div className="flex items-center w-full border-2 bg-transparent border-gray-200 rounded-md outline-none placeholder:text-14 focus-within:border-primary">
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
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2 w-full h-14 p-3 border-2 bg-transparent border-gray-200 rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary">
                    {selectedCategoryTags.length === 0 && (
                      <p className="text-14 text-gray-400">No Tags Available</p>
                    )}
                    {selectedCategoryTags.map((tag, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          name="tags_ids"
                          value={index}
                          checked={values.tags_ids.includes(index)}
                          onChange={() =>
                            handleTagChange(index, setFieldValue, values)
                          }
                          className="mr-2"
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                </div>
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
                <div>Schedule a discount</div>
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
            {/* Inventory Fields for Colors */}
            {categoryType === "Color" && (
              <div className="bg-white p-5 rounded-md mt-5 mx-10 w-890">
                <h2 className="font-bold mb-5">Inventory</h2>
                {colors.map((color, index) => (
                  <div key={index} className="flex flex-col gap-4 mb-4">
                    <button onClick={() => removeColor(index)}>x</button>
                    <div className="flex gap-4">
                      <InputField
                        name={`colors[${index}].name`}
                        placeholder="Color Name"
                        value={color.name}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index].name = e.target.value;
                          setColors(newColors);
                        }}
                      />
                      <InputField
                        name={`colors[${index}].code`}
                        placeholder="Color Code (e.g., #FFFFFF)"
                        value={color.code}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index].code = e.target.value;
                          setColors(newColors);
                        }}
                      />
                    </div>
                    <div className="flex gap-4">
                      <InputField
                        name={`colors[${index}].stock`}
                        placeholder="Stock"
                        value={color.stock}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index].stock = e.target.value;
                          setColors(newColors);
                        }}
                      />
                      <InputField
                        name={`colors[${index}].price`}
                        placeholder="Price"
                        value={color.price}
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index].price = e.target.value;
                          setColors(newColors);
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-3 mb-3">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="schedule_discount"
                          className="hidden"
                          onChange={(e) => {
                            setIsDiscountScheduled(e.target.checked);
                            setFieldValue(
                              "schedule_discount",
                              e.target.checked
                            );
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
                      <div>Schedule a discount</div>
                    </div>
                    {isDiscountScheduled && (
                      <div className="flex gap-4">
                        <InputField
                          name={`colors[${index}].discount_percentage`}
                          placeholder="Discount"
                          value={color.discount_percentage}
                          onChange={(e) => {
                            const newColors = [...colors];
                            newColors[index].discount_percentage =
                              e.target.value;
                            setColors(newColors);
                          }}
                        />
                        <InputField
                          name={`colors[${index}].discount_expire_at`}
                          type="date"
                          placeholder="Discount Expiry Date"
                          value={color.discount_expire_at}
                          onChange={(e) => {
                            const newColors = [...colors];
                            newColors[index].discount_expire_at =
                              e.target.value;
                            setColors(newColors);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  className="bg-primary text-white rounded-md p-2 text-14 w-40 mt-4"
                  onClick={addColor}
                >
                  Add Color
                </button>
              </div>
            )}
            {categoryType === "Size" && (
              <div className="bg-white p-5 rounded-md mt-5 mx-10 w-890">
                <h2 className="font-bold mb-5">Inventory</h2>
                {sizes.map((size, index) => (
                  <div key={index} className="flex flex-col gap-4 mb-4">
                    <button onClick={() => removeSize(index)}>x</button>
                    <div className="flex gap-4">
                      <InputField
                        name={`sizes[${index}].name`}
                        placeholder="Size Name"
                        value={size.name}
                        onChange={(e) => {
                          const newSizes = [...sizes];
                          newSizes[index].name = e.target.value;
                          setSizes(newSizes);
                        }}
                      />
                      <InputField
                        name={`sizes[${index}].stock`}
                        placeholder="Stock"
                        value={size.stock}
                        onChange={(e) => {
                          const newSizes = [...sizes];
                          newSizes[index].stock = e.target.value;
                          setSizes(newSizes);
                        }}
                      />
                    </div>
                    <div className="flex gap-4">
                      <InputField
                        name={`sizes[${index}].price`}
                        placeholder="Price"
                        value={size.price}
                        onChange={(e) => {
                          const newSizes = [...sizes];
                          newSizes[index].price = e.target.value;
                          setSizes(newSizes);
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-3 mb-3">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="schedule_discount"
                          className="hidden"
                          onChange={(e) => {
                            setIsDiscountScheduled(e.target.checked);
                            setFieldValue(
                              "schedule_discount",
                              e.target.checked
                            );
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
                      <div>Schedule a discount</div>
                    </div>
                    {isDiscountScheduled && (
                      <div className="flex gap-4">
                        <InputField
                          name={`sizes[${index}].discount_percentage`}
                          placeholder="Discount"
                          value={size.discount_percentage}
                          onChange={(e) => {
                            const newSizes = [...sizes];
                            newSizes[index].discount_percentage =
                              e.target.value;
                            setSizes(newSizes);
                          }}
                        />
                        <InputField
                          name={`sizes[${index}].discount_expire_at`}
                          type="date"
                          placeholder="Discount Expiry Date"
                          value={size.discount_expire_at}
                          onChange={(e) => {
                            const newSizes = [...sizes];
                            newSizes[index].discount_expire_at = e.target.value;
                            setSizes(newSizes);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  className="bg-primary text-white rounded-md p-2 text-14 w-40 mt-4"
                  onClick={addSize}
                >
                  Add Size
                </button>
              </div>
            )}
            {categoryType === "Both" && (
              <>
                <div className="bg-white p-5 rounded-md mt-5 mx-10 w-890">
                  <h2 className="font-bold mb-5">Colors</h2>
                  {colors.map((color, index) => (
                    <div key={index} className="flex flex-col gap-4 mb-4">
                      <button onClick={() => removeColor(index)}>x</button>
                      <div className="flex gap-4">
                        <InputField
                          name={`colors[${index}].name`}
                          placeholder="Color Name"
                          value={color.name}
                          onChange={(e) => {
                            const newColors = [...colors];
                            newColors[index].name = e.target.value;
                            setColors(newColors);
                          }}
                        />
                        <InputField
                          name={`colors[${index}].code`}
                          placeholder="Color Code (e.g., #FFFFFF)"
                          value={color.code}
                          onChange={(e) => {
                            const newColors = [...colors];
                            newColors[index].code = e.target.value;
                            setColors(newColors);
                          }}
                        />
                      </div>
                      <div className="flex gap-4">
                        <InputField
                          name={`colors[${index}].stock`}
                          placeholder="Stock"
                          value={color.stock}
                          onChange={(e) => {
                            const newColors = [...colors];
                            newColors[index].stock = e.target.value;
                            setColors(newColors);
                          }}
                        />
                        <InputField
                          name={`colors[${index}].price`}
                          placeholder="Price"
                          value={color.price}
                          onChange={(e) => {
                            const newColors = [...colors];
                            newColors[index].price = e.target.value;
                            setColors(newColors);
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-3 mt-3 mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="schedule_discount"
                            className="hidden"
                            onChange={(e) => {
                              setIsDiscountScheduled(e.target.checked);
                              setFieldValue(
                                "schedule_discount",
                                e.target.checked
                              );
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
                        <div>Schedule a discount</div>
                      </div>
                      {isDiscountScheduled && (
                        <div className="flex gap-4">
                          <InputField
                            name={`colors[${index}].discount_percentage`}
                            placeholder="Discount"
                            value={color.discount_percentage}
                            onChange={(e) => {
                              const newColors = [...colors];
                              newColors[index].discount_percentage =
                                e.target.value;
                              setColors(newColors);
                            }}
                          />
                          <InputField
                            name={`colors[${index}].discount_expire_at`}
                            type="date"
                            placeholder="Discount Expiry Date"
                            value={color.discount_expire_at}
                            onChange={(e) => {
                              const newColors = [...colors];
                              newColors[index].discount_expire_at =
                                e.target.value;
                              setColors(newColors);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    className="bg-primary text-white rounded-md p-2 text-14 w-40 mt-4"
                    onClick={addColor}
                  >
                    Add Color
                  </button>
                </div>
                <div className="bg-white p-5 rounded-md mt-5 mx-10 w-890">
                  <h2 className="font-bold mb-5">Sizes</h2>
                  {sizes.map((size, index) => (
                    <div key={index} className="flex flex-col gap-4 mb-4">
                      <button onClick={() => removeSize(index)}>x</button>
                      <div className="flex gap-4">
                        <InputField
                          name={`sizes[${index}].name`}
                          placeholder="Size Name"
                          value={size.name}
                          onChange={(e) => {
                            const newSizes = [...sizes];
                            newSizes[index].name = e.target.value;
                            setSizes(newSizes);
                          }}
                        />
                        <InputField
                          name={`sizes[${index}].stock`}
                          placeholder="Stock"
                          value={size.stock}
                          onChange={(e) => {
                            const newSizes = [...sizes];
                            newSizes[index].stock = e.target.value;
                            setSizes(newSizes);
                          }}
                        />
                      </div>
                      <div className="flex gap-4">
                        <InputField
                          name={`sizes[${index}].price`}
                          placeholder="Price"
                          value={size.price}
                          onChange={(e) => {
                            const newSizes = [...sizes];
                            newSizes[index].price = e.target.value;
                            setSizes(newSizes);
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-3 mt-3 mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="schedule_discount"
                            className="hidden"
                            onChange={(e) => {
                              setIsDiscountScheduled(e.target.checked);
                              setFieldValue(
                                "schedule_discount",
                                e.target.checked
                              );
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
                        <div>Schedule a discount</div>
                      </div>
                      {isDiscountScheduled && (
                        <div className="flex gap-4">
                          <InputField
                            name={`sizes[${index}].discount_percentage`}
                            placeholder="Discount"
                            value={size.discount_percentage}
                            onChange={(e) => {
                              const newSizes = [...sizes];
                              newSizes[index].discount_percentage =
                                e.target.value;
                              setSizes(newSizes);
                            }}
                          />
                          <InputField
                            name={`sizes[${index}].discount_expire_at`}
                            type="date"
                            placeholder="Discount Expiry Date"
                            value={size.discount_expire_at}
                            onChange={(e) => {
                              const newSizes = [...sizes];
                              newSizes[index].discount_expire_at =
                                e.target.value;
                              setSizes(newSizes);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    className="bg-primary text-white rounded-md p-2 text-14 w-40 mt-4"
                    onClick={addSize}
                  >
                    Add Size
                  </button>
                </div>
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
