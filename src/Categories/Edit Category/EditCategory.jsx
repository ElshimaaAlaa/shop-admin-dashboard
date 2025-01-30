import React from "react";
import { Formik, Form, Field } from "formik";
function EditCategory() {
  return (
    <div className="bg-gray-100 p- h-80vh flex  flex-col relative">
      <h1 className="font-bold mb-6 text-1xl mx-10 my-10">Edit Category</h1>
      <Formik>
        <Form className="flex flex-col">
          <div className="flex gap-5 mx-10">
            <div className="bg-white p-5 rounded w-full">
              <h2 className="font-bold mb-5">Basic Information</h2>
              <Field
                placeholder="Category Name"
                className="w-full bg-transparent outline-none border border-gray-300 rounded h-11 p-2 block "
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

          <div className="flex gap-5 items-center pt-8 border-t-1 px-5 justify-end bg-white rounded absolute bottom-0 w-full">
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
export default EditCategory;