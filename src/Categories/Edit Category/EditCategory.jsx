import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function EditCategory() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="bg-gray-100 p- min-h-screen flex  flex-col relative">
      <h1 className="font-bold text-xl mb-6 mx-10 my-10">Edit Category</h1>
      <Formik>
        <Form className="flex flex-col">
          <div className="flex gap-5 mx-10">
            <div className="bg-white p-5 rounded-xl w-full">
              <h2 className="font-bold mb-5">Basic Information</h2>
              <Field
                placeholder="Category Name"
                className="w-full bg-transparent outline-none border border-gray-300 rounded-md h-14 p-2 block "
              />
              <Field
                placeholder="Description"
                className="w-full bg-transparent outline-none border border-gray-300 rounded-md p-2 h-32 mt-5"
              />
            </div>
            <div className="bg-white p-5 rounded-xl w-2/4">
              <h2 className="font-bold mb-5">Category Icon / image </h2>
              <Field
                placeholder="Upload Your Category image"
                className="bg-transparent w-full border-2 border-dotted outline-none h-52 p-3"
              />
            </div>
          </div>

          <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
            <button
              className="bg-gray-200 text-gray-500 font-bold p-3 w-32 rounded-xl"
              onClick={() => navigate("/categories")}
            >
              Cancel
            </button>
            <button className="bg-primary text-white font-bold rounded-xl p-3">
              {isLoading ? (
                <ClipLoader color="#fff" size={22} />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
export default EditCategory;