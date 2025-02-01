import { Formik, Form, Field } from "formik";
import React from "react";

function AddCategory() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative">
      <h1
        className="font-bold mb-6 mx-10 my-10 p-2"
        style={{ fontSize: "20px" }}
      >
        Add Category
      </h1>
      <Formik>
        <Form className="flex flex-col">
          <div className="flex gap-5 mx-10">
            <div className="bg-white p-5 rounded w-full">
              <h2 className="font-bold mb-5">Basic Information</h2>
              <Field
                placeholder="Category Name"
                className="w-full bg-transparent outline-none border border-gray-300 rounded h-12 p-2 block "
              />
              <Field
                placeholder="Description"
                className="w-full bg-transparent outline-none border border-gray-300 rounded p-2 h-24 mt-5"
              />
            </div>
            <div className="bg-white p-5 rounded w-2/5">
              <h2 className="font-bold mb-5">Category Icon / image </h2>
              <Field
                placeholder="Upload Your Category image"
                className="bg-transparent w-full border-2 border-dotted outline-none h-40 p-3"
              />
            </div>
          </div>
          <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
            <button className="bg-gray-200 text-gray-500 font-bold p-3 w-32 rounded">
              Cancel
            </button>
            <button className="bg-primary text-white font-bold rounded p-3 w-32">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
export default AddCategory;
