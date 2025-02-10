import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { updateCategory } from "../../ApiServices/updateCategory";

function EditCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(state?.image || null);
  const [showModal, setShowModal] = useState(false);
  const category = state || {};

  const initialValues = {
    name: category?.name || "",
    description: category?.description || "",
    image: null,
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name[ar]", values.name);
      formData.append("name[en]", values.name);
      formData.append("description[ar]", values.description);
      formData.append("description[en]", values.description);
      if (values.image) {
        formData.append("image", values.image);
      }
      await updateCategory(formData, category.id);
      setIsLoading(false);
      setShowModal(true);
      navigate("/Home/categories", { replace: true });
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to update category:", error);
    }
  };

  return (
    <div className="bg-gray-100 p- min-h-screen flex flex-col relative">
      <Helmet>
        <title>Edit Category - VERTEX</title>
        <meta name="description" content="Edit category details in VERTEX" />
      </Helmet>
      <h1 className="font-bold text-xl mb-6 mx-10 my-10">Edit Category</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="flex flex-col">
            <div className="flex gap-5 mx-10">
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <Field
                  name="name"
                  placeholder="Category Name"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md h-14 p-2 block"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md p-2 h-32 mt-5"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">{errors.description}</div>
                )}
              </div>
              <div className="bg-white p-5 rounded-md w-2/4">
                <h2 className="font-bold mb-5">Category Icon / Image</h2>
                <div className="border-2 border-dotted border-gray-300 rounded-md p-3 h-52 flex items-center justify-center">
                  <input
                    type="file"
                    name="image"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        setFieldValue("image", file);
                        setPreviewImage(URL.createObjectURL(file));
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
                className="bg-primary text-white font-bold rounded-md p-3 w-40"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader color="#fff" size={22} />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col w-400">
          <p className="font-bold mt-5">Category updated successfully!</p>
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
export default EditCategory;