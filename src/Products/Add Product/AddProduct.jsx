import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/Input Field/InputField";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [showDiscountFields, setShowDiscountFields] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    category_id: "",
    tagNumber: "",
    gender: "",
    percentage: "",
    stock: "",
    tags: "",
    description: "",
    price: "",
    cost: "",
    revenue: "",
    discount: "",
    discountDate: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Product Name is required"),
    category: Yup.string().required("Category is required"),
    tagNumber: Yup.string().required("Tag Number is required"),
    gender: Yup.string().required("Gender is required"),
    percentage: Yup.string().required("Percentage is required"),
    stock: Yup.number()
      .positive("Stock must be a positive number")
      .required("Stock is required"),
    tags: Yup.string().required("Tags are required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    cost: Yup.number()
      .positive("Cost must be a positive number")
      .required("Cost is required"),
    revenue: Yup.number()
      .positive("Revenue must be a positive number")
      .required("Revenue is required"),
    discount: showDiscountFields
      ? Yup.number()
          .positive("Discount must be a positive number")
          .required("Discount is required")
      : Yup.number(),
    discountDate: showDiscountFields
      ? Yup.string().required("Discount Date is required")
      : Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="bg-gray-100 flex flex-col h-full relative">
      <h1 className="font-bold rounded-md p-5 mx-10 bg-white mt-10 mb-5 text-lg">
        Add Product
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* Basic Information */}
            <div className="h-78vh overflow-hidden overflow-y-auto">
              <div className="flex gap-5 mx-9">
                <div className="bg-white p-5 rounded-md w-full flex flex-col gap-4">
                  <h2 className="font-bold">Basic Information</h2>
                  <div className="flex items-center gap-4">
                    <InputField name="name" placeholder="Product Name" />
                    <InputField name="category" placeholder="Category" />
                  </div>
                  <div className="flex items-center gap-4">
                    <InputField name="tagNumber" placeholder="Tag Number" />
                    <InputField name="gender" placeholder="Gender" />
                  </div>
                  <div className="flex items-center gap-4">
                    <InputField
                      name="percentage"
                      placeholder="Percentage (upon return)"
                    />
                    <InputField name="stock" placeholder="Stock" />
                  </div>
                  <InputField name="tags" placeholder="Tags" />
                  <InputField name="description" placeholder="Description" />
                </div>

                {/* Product Icon / Image */}
                <div className="">
                  <div className="bg-white p-5 rounded-md   flex- gap-4 w-450">
                    <h2 className="font-bold">Product Icon / Image</h2>
                    <div className="border-2 border-dashed border-gray-200 bg-gray-100 rounded-xl p-3 flex items-center justify-center h-52">
                      <input
                        type="file"
                        name="images"
                        onChange={(event) => {
                          const files = Array.from(event.currentTarget.files);
                          setFieldValue("images", files);
                        }}
                        className="hidden"
                        id="image-upload"
                        multiple
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
                        <p>Upload Your Product Image</p>
                        <p className="text-sm text-gray-400 mt-1 w-60 text-center">
                          Only PNG, SVG Format Allowed. Size: 500KB Max.
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pricing */}
              <div className="mx-8 my-5">
                <div className="bg-white p-5 rounded-md flex flex-col gap-4 w-890">
                  <h2 className="font-bold">Pricing</h2>
                  <div className="flex items-center gap-3">
                    <InputField name="price" placeholder="Price (For piece)" />
                    <InputField name="cost" placeholder="Cost" />
                    <InputField name="revenue" placeholder="Revenue" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      className="h-4 w-4"
                      onClick={() => setShowDiscountFields(!showDiscountFields)}
                    />
                    <p className="text-15 font-bold">Schedule a discount</p>
                  </div>
                  {showDiscountFields && (
                    <div className="flex items-center gap-4">
                      <InputField name="discount" placeholder="Discount" />
                      <InputField
                        name="discountDate"
                        placeholder="Date"
                        type="date"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Footer */}
            <Footer
              saveText={"Save"}
              cancelText={"Cancel"}
              cancelOnClick={() => navigate("/Home/products")}
              saveBtnType={"submit"}
              cancelBtnType={"button"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProduct;
