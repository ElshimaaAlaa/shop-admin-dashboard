import React from "react";
import { Formik, Form, Field } from "formik";
function AddProduct() {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen relative">
      {/* Page Title */}
      <h1 className="font-bold mb-3 mx-10 mt-5 p-2" style={{fontSize:"20px"}}>Add Product</h1>

      <Formik>
        <Form className="flex flex-col flex-grow">
          {/* Basic Information & Image Upload */}
          <div className="flex gap-5 mx-10">
            <div className="bg-white p-5 rounded w-full">
              <h2 className="font-bold mb-5">Basic Information</h2>
              <div className="flex gap-5">
                <Field
                  placeholder="Product Name"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded h-14 p-2"
                />
                <Field
                  placeholder="Category"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded h-14 p-2"
                />
              </div>
              <Field
                placeholder="Description"
                className="w-full bg-transparent outline-none border border-gray-300 rounded p-2 h-24 mt-3"
              />
            </div>
            <div className="bg-white p-5 rounded w-2/5">
              <h2 className="font-bold mb-5">Category Icon / Image</h2>
              <Field
                placeholder="Upload Your Category Image"
                className="bg-transparent w-full border-2 border-dotted outline-none h-40 p-3"
              />
            </div>
          </div>

          {/* Stock & Pricing & Sizes */}
          <div className="flex gap-5 mx-10 my-5">
            <div className="bg-white p-5 rounded w-full">
              <h2 className="font-bold mb-5">Stock & Pricing</h2>
              <div className="flex gap-5">
                <Field
                  placeholder="Stock"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded h-14 p-2"
                />
                <Field
                  placeholder="Price"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded h-14 p-2"
                />
              </div>
              <p className="mt-3 font-bold flex items-center" style={{fontSize:"14px"}}>
                <Field type="checkbox" className="mr-2" />
                Schedule a discount
              </p>
              <div className="flex gap-5 mt-3">
                <Field
                  placeholder="Discount"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded p-2 h-14"
                />
                <Field
                  type="date"
                  placeholder="Date"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded h-14 p-2"
                />
              </div>
            </div>

            <div className="bg-white rounded w-2/5 p-5 h-44">
              <h2 className="font-bold mb-3">Sizes & Colors</h2>
              <Field
                placeholder="Sizes"
                className="mb-3 w-full bg-transparent outline-none border border-gray-300 rounded p-2 h- placeholder:text-black"
              />
              <Field
                placeholder="Colors"
                className="w-full bg-transparent outline-none border border-gray-300 rounded p-2 h- placeholder:text-black"
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
export default AddProduct;