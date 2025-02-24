import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchCategories } from "../../ApiServices/AllCategoriesApi";
import { addProduct } from "../../ApiServices/AddNewProductApi";
import "./AddProduct.scss";
import Footer from "../../Components/Footer/Footer";
import InputField from "../../Components/Input Field/InputField";

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
    discount: "",
    stock: "",
    price: "",
    const: "",
    revenue: "",
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
          formData.append("images[]", image);
        }
      });
      values.images.forEach((image, index) => {
        if (index !== mainImageIndex) {
          formData.append("images[]", image);
        }
      });
    }
    formData.append("category_id", values.category_id);
    formData.append("price", values.price);
    formData.append("discount_percentage", values.discount);
    formData.append("discount_expire_at", values.discount_expire_at);
    formData.append("stock", values.stock);
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
    <div className="bg-gray-100 flex flex-col h-full relative">
      <Helmet>
        <title>Add Product - VERTEX</title>
        <meta name="description" content="Add new product to VERTEX" />
      </Helmet>
      <h1 className="font-bold rounded-md p-5 mx-10 bg-white mt-10 mb-5 text-lg ">
        Add Product
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="flex flex-col flex-grow">
            {/* Basic Information & Image Upload */}
            <div className="flex gap-5 mx-10">
              <div className="bg-white p-5 rounded-md w-full flex flex-col gap-4">
                <h2 className="font-bold">Basic Information</h2>
                <div className="flex items-center gap-4">
                  <InputField name={"name"} placeholder={"Name"} />
                  <InputField name={"category"} placeholder={"Category"} />
                </div>
                <div className="flex items-center gap-4">
                  <InputField name={"tags"} placeholder={"Tag Number"} />
                  <InputField name={"gender"} placeholder={"Gender"} />
                </div>
                <div className="flex items-center gap-4">
                  <InputField
                    name={"percentage"}
                    placeholder={"percentage (upon return)"}
                  />
                  <InputField name={"stock"} placeholder={"Stock"} />
                </div>
                <InputField name={"tags"} placeholder={"Tag"} />
                <InputField name={"description"} placeholder={"Description"} />
              </div>
              <div className="bg-white p-5 rounded-md w-2/4 h-72">
                <h2 className="font-bold mb-5">Product Icon / Image</h2>
                <div className="border-2 border-dashed border-gray-200 bg-gray-100 rounded-xl p-3 flex items-center justify-center h-52 ">
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
                        <p className="text-sm text-gray-400 mt-1 w-60 text-center">
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
            <div className="mx-10 my-5">
              <div className="bg-white p-5 rounded-md w-890 flex flex-col gap-4">
                <h2 className="font-bold">Pricing</h2>
                <div className="flex items-center gap-3">
                  <InputField placeholder="Price (For Price)" name="price" />
                  <InputField placeholder="Cost" name="cost" />
                  <InputField placeholder="Revenue" name="revenue" />
                </div>
                <div className="flex items-center gap-2">
                  <Field type="checkbox" className="h-4 w-4" />
                  <p className="text-15 font-bold">Schedule a discount</p>
                </div>
                <div className="flex items-center gap-4">
                  <InputField placeholder="Discount" name="discount" />
                  <InputField placeholder="Date" type="date" name="date" />
                </div>
              </div>
            </div>
            <Footer
              saveText={"Save"}
              cancelText={"Cancel"}
              cancelOnClick={() => navigate("/Home/products")}
              saveBtnType={"submit"}
              cancelBtnType={"button"}
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default AddProduct;
