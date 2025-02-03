import axios from "axios";
import { Formik, Form, Field } from "formik";
import React from "react";
import * as Yup from "yup";

function AddCategory() {
  const intialValues = {
    name: "",
    description: "",
    image: "",
  };
  const validationShcema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image is required"),
  });
  const handleSubmit = async (values) => {
    const items = {
      name: values.name,
      description: values.description,
      image: values.image,
    };
    try {
      const response = await axios({
        url: "https://demo.vrtex.duckdns.org/api/shop/categories/store",
        method: "POST",
        headers: {
          Authorization:
            "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
        },
        data:items,
      });
      if (response.status === 200) {
        console.log("Category added successfully");
      } else {
        console.log("Failed to add category");
      }
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative">
      <h1
        className="font-bold mb-6 mx-10 my-10 p-2"
        style={{ fontSize: "20px" }}
      >
        Add Category
      </h1>
      <Formik
        initialValues={intialValues}
        onSubmit={handleSubmit}
        validationSchema={validationShcema}
      >
        <Form className="flex flex-col">
          <div className="flex gap-5 mx-10">
            <div className="bg-white p-5 rounded w-full">
              <h2 className="font-bold mb-5">Basic Information</h2>
              <Field
                placeholder="Category Name"
                name="name"
                className="w-full bg-transparent outline-none border border-gray-300 rounded h-12 p-2 block "
              />
              <Field
                placeholder="Description"
                name="description"
                className="w-full bg-transparent outline-none border border-gray-300 rounded p-2 h-24 mt-5"
              />
            </div>
            <div className="bg-white p-5 rounded w-2/5">
              <h2 className="font-bold mb-5">Category Icon / image </h2>
              <Field
              name="image"
                placeholder="Upload Your Category image"
                className="bg-transparent w-full border-2 border-dotted outline-none h-40 p-3"
              />
            </div>
          </div>
          <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
            <button className="bg-gray-200 text-gray-500 font-bold p-3 w-32 rounded">
              Cancel
            </button>
            <button className="bg-primary text-white font-bold rounded p-3 w-32" type="submit">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
export default AddCategory;
