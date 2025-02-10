import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addCategory } from "../../ApiServices/AddNewCategoryApi";
import { ClipLoader } from "react-spinners";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { Helmet } from "react-helmet";

function AddCategory() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    formData.append("name[ar]", values.name);
    formData.append("name[en]", values.name); 
    formData.append("description[ar]", values.description);
    formData.append("description[en]", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }
    try {
      await addCategory(formData);
      console.log("Category added successfully");
      setShowModal(true);
    } catch (error) {
      console.error("Failed to add category", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-lightgray min-h-screen relative">
      <Helmet>
        <title>Add Category | Vertex Dashboard</title>
      </Helmet>
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
                      const file = event.currentTarget.files[0];
                      if (file) {
                        setFieldValue("image", file); // Set the file in Formik's state
                        setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <img
                          src="/assets/images/upload-file_svgrepo.com.png"
                          alt="upload-image-file"
                          className="mb-2"
                        />
                        <p className="">Upload Your Category Image</p>
                        <p className="text-sm text-gray-300 mt-2 w-60 text-center">
                          Only PNG, SVG Format Allowed. Size: 500KB Max.
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center border-t justify-end bg-white rounded p-5 w-full mt-5 absolute bottom-0">
              <button
                type="button"
                className="bg-gray-200 text-gray-500 font-bold p-3 w-32 rounded-md"
                onClick={() => navigate("/Home/categories")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white font-bold rounded-md p-3 w-32"
              >
                {isLoading ? <ClipLoader color="#fff" size={22} /> : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center w-400">
          <p className="font-bold mt-5">Category added successfully!</p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 font-semibold mt-4"
            onClick={() => navigate("/Home/categories")}
          >
            Back to Categories
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default AddCategory;