import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/InputFields/InputField";
import Footer from "../../Components/Footer/Footer";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop/promotions/store";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

// Validation Schema
const promotionSchema = Yup.object().shape({
  name: Yup.string().required("Promotion name is required"),
  total_price: Yup.number()
    .required("Total price is required")
    .positive("Total price must be positive"),
  start_date: Yup.date().required("Start date is required").nullable(),
  end_date: Yup.date()
    .required("End date is required")
    .nullable()
    .min(Yup.ref("start_date"), "End date must be after start date"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        product_id: Yup.string().required("Product is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .positive("Quantity must be positive")
          .integer("Quantity must be an integer"),
      })
    )
    .min(1, "At least one product is required"),
});

const NewPromotion = ({ products = [], categories = [] }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initial Values
  const initialValues = {
    name: "",
    total_price: "",
    start_date: null,
    end_date: null,
    items: [{ product_id: "", quantity: "" }],
    category_id: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Format the data for API
      const formattedData = {
        ...values,
        start_date: values.start_date.toISOString(),
        end_date: values.end_date.toISOString(),
        items: values.items.reduce((acc, item, index) => {
          return {
            ...acc,
            [`items[${index}][product_id]`]: item.product_id,
            [`items[${index}][quantity]`]: item.quantity,
          };
        }, {}),
      };

      const response = await axios.post(API_BASE_URL, formattedData, {
        headers: {
          "Content-Type": "application/json",
          live_shop_domain: live_shop_domain,
          role: role,
        },
      });

      setSuccess("Promotion created successfully!");
      setError("");
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create promotion");
      setSuccess("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Add New Promotion | vertex</title>
      </Helmet>

      <div className="rounded-md p-5 mx-10 bg-white mt-5">
        <p className="text-12 text-gray-400">Menu / Product / Add Promotion</p>
        <h1 className="mt-3 text-17 font-bold">Add New Promotions</h1>
      </div>

      {error && (
        <div className="mx-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mx-10 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={promotionSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="mx-10 my-3 ">
            <div className="bg-white rounded-md p-4">
              <div>
                <InputField
                  name="name"
                  label="Promotion Name"
                  placeholder="Enter promotion name"
                />
                <input
                  placeholder="Product Number"
                  type="number"
                  min="1"
                  value={values.items.length}
                  onChange={(e) => {
                    const num = parseInt(e.target.value) || 1;
                    const newLength = num > 0 ? num : 1;
                    const newItems = [...values.items];

                    while (newItems.length < newLength) {
                      newItems.push({ product_id: "", quantity: "" });
                    }
                    while (newItems.length > newLength) {
                      newItems.pop();
                    }

                    setFieldValue("items", newItems);
                  }}
                  className="w-full h-14 p-2 mt-3 border-2  rounded-md outline-none"
                />
              </div>
              <div className="bg-customOrange-mediumOrange rounded-md p-4 my-5">
                <FieldArray name="items">
                  {() => (
                    <div className="space-y-4">
                      {values.items.map((item, index) => (
                        <div key={index}>
                          <h4 className="font-medium mb-3 text-primary">
                            Product {index + 1}
                          </h4>
                          <div className="">
                            <div className="flex items-center gap-3 mb-3">
                              <Field
                                as="select"
                                name={`items[${index}].product_id`}
                                className="w-full p-2 border-2 rounded-md outline-none h-14"
                              >
                                <option
                                  value=""
                                  className="text-gray-500 text-14"
                                >
                                  product
                                </option>
                                {products.map((product) => (
                                  <option key={product.id} value={product.id}>
                                    {product.name}
                                  </option>
                                ))}
                              </Field>
                              <Field
                                as="select"
                                name={`items[${index}].category_id`}
                                className="w-full p-2 border-2 rounded-md outline-none h-14"
                              >
                                <option
                                  value=""
                                  className="text-gray-500 text-14"
                                >
                                  Category
                                </option>
                                {products.map((product) => (
                                  <option key={product.id} value={product.id}>
                                    {product.name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            <div>
                              <InputField
                                name={"total_price"}
                                placeholder={"Price"}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>
            <Footer
              saveBtnType={"submit"}
              saveText={"Save"}
              cancelText={"Cancel"}
              cancelBtnType={"button"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

NewPromotion.defaultProps = {
  products: [],
  categories: [],
};

export default NewPromotion;
