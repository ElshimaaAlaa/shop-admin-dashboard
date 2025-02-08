import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addCategory } from "../../ApiServices/AddNewCategoryApi";
import { ClipLoader } from "react-spinners";

function AddCategory() {
  const navigate = useNavigate();
  const [isLoading , setIsLoading] = useState(false);
  const initialValues = {
    name: "",
    description: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image);

    try {
      await addCategory(formData);
      console.log("Category added successfully");
      navigate("/categories");
    } catch (error) {
      console.error("Failed to add category", error);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-lightgray min-h-screen relative">
      <h1 className="font-bold mb-3 pt-8 pb-4 text-xl mx-10">Add Category</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col">
            <div className="flex gap-5 mx-10">
              <div className="bg-white p-5 rounded-xl w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <Field
                  placeholder="Category Name"
                  name="name"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl h-14 p-2 block"
                />
                <Field
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-xl p-2 h-32 mt-5"
                />
              </div>
              <div className="bg-white p-5 rounded-xl w-2/4">
                <h2 className="font-bold mb-5">Category Icon / Image</h2>
                <div className="border-2 border-dotted border-gray-300 rounded-xl p-3 h-52 flex items-center justify-center">
                  <input
                    type="file"
                    name="image"
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
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
                    <p className="">Upload Your Category Image</p>
                    <p className="text-sm text-gray-300 mt-2 w-60 text-center">
                      Only PNG, SVG Format Allowed. Size: 500KB Max.
                    </p>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
              <button
                type="button"
                className="bg-gray-200 text-gray-500 font-bold p-3 w-32 rounded-xl"
                onClick={() => navigate("/categories")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white font-bold rounded-xl p-3 w-32"
              >
                {isLoading ? <ClipLoader color="#fff" size={22}/> : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddCategory;