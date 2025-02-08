import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { addProduct } from "../../ApiServices/AddNewProductApi";

function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const intialValues = {
    name: "",
    description: "",
    images: [],
    price: 0,
    discount: 0,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.array().min(1, "At least one image is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    discount: Yup.number()
      .positive("Discount must be a positive number")
      .required("Discount is required"),
  });
  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image);
    try {
      await addProduct(formData);
      console.log("product added successfully");
    } catch (error) {
      console.error("Failed to add product", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen relative">
      <h1 className="font-bold text-xl mb-3 mx-10 mt-5 p-2">Add Product</h1>
      <Formik
        initialValues={intialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col flex-grow">
          {/* Basic Information & Image Upload */}
          <div className="flex gap-5 mx-10">
            <div className="bg-white p-5 rounded-xl w-full">
              <h2 className="font-bold mb-5">Basic Information</h2>
              <div className="flex gap-5">
                <Field
                  placeholder="Product Name"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                />
                <Field
                  placeholder="Category"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                />
              </div>
              <Field
                placeholder="Description"
                className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h-32 mt-3"
              />
            </div>
            <div className="bg-white p-5 rounded-xl w-2/4">
              <h2 className="font-bold mb-5">Category Icon / Image</h2>
              <div className="border-2 border-dotted border-gray-300 rounded-xl p-3 h-52 flex items-center justify-center">
                <input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    // setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
                >
                  <img
                    src="/assets/images/upload-file_svgrepo.com.png"
                    alt="upload-image-file"
                    className="mb-2"
                  />
                  <p className="">Upload Your Product Image</p>
                  <p className="text-sm text-gray-300 mt-2 w-60 text-center">
                    Only PNG, SVG Format Allowed. Size: 500KB Max.
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Stock & Pricing & Sizes */}
          <div className="flex gap-5 mx-10 my-5">
            <div className="bg-white p-5 rounded-xl w-full">
              <h2 className="font-bold mb-5">Stock & Pricing</h2>
              <div className="flex gap-5">
                <Field
                  placeholder="Stock"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                />
                <Field
                  placeholder="Price"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                />
              </div>
              <p className="mt-3 flex items-center text-11">
                <Field type="checkbox" className="mr-1 w-3 h-2" />
                Schedule a discount
              </p>
              <div className="flex gap-5 mt-3">
                <Field
                  placeholder="Discount"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h-14"
                />
                <Field
                  type="date"
                  placeholder="Date"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl w-2/4 p-5 h-44">
              <h2 className="font-bold mb-3">Sizes & Colors</h2>
              <Field
                placeholder="Sizes"
                className="mb-3 w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h- placeholder:text-black"
              />
              <Field
                placeholder="Colors"
                className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h- placeholder:text-black"
              />
            </div>
          </div>

          <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
            <button className="bg-gray-200 text-gray-500 font-bold p-3 w-32 rounded-xl">
              Cancel
            </button>
            <button className="bg-primary text-white font-bold rounded-xl p-3 w-32">
              {isLoading ? <ClipLoader color="#fff" size={22} /> : "Save"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
export default AddProduct;