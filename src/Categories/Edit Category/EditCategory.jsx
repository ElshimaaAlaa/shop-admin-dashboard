import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { updateCategory } from "../../ApiServices/updateCategory";
import Footer from "../../Components/Footer/Footer";

const ImageUpload = ({ previewImage, onImageChange }) => {
  return (
    <div className="rounded-md h-56 flex items-center justify-center">
      <input
        type="file"
        name="image"
        onChange={onImageChange}
        className="hidden"
        id="image-upload"
        aria-label="Upload category image"
      />
      <label
        htmlFor="image-upload"
        className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
      >
        {previewImage ? (
          <>
            <img
              src={previewImage}
              alt="Category preview"
              className="w-400 h-44 object-cover rounded-md"
            />
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center text-16 gap-3 text-primary rounded-md p-3 border border-primary w-400"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("image-upload").click();
                }}
                aria-label="Upload another image"
              >
                <img
                  src="/assets/images/upload-minimalistic_svgrepo.com.png"
                  alt="Upload another-image"
                  className="h-5"
                />
                Upload Another Image
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src="/assets/images/upload-file_svgrepo.com.png"
              alt="Upload category-image"
              className="mb-2"
            />
            <p>Upload Your Category Image</p>
          </>
        )}
      </label>
    </div>
  );
};
function EditCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(state?.image || null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const category = state || {};

  const initialValues = {
    name: category?.name || "",
    description: category?.description || "",
    type: category?.type || "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Type is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name[ar]", values.name);
      formData.append("name[en]", values.name);
      formData.append("description[ar]", values.description);
      formData.append("description[en]", values.description);
      formData.append("type", values.type);
      if (values.image) {
        formData.append("image", values.image);
      }
      await updateCategory(formData, category.id);
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to update category. Please try again.");
      console.error("Failed to update category:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-full flex flex-col relative">
      <Helmet>
        <title>Edit Category - VERTEX</title>
        <meta name="description" content="Edit category details in VERTEX" />
      </Helmet>
      <h1 className="font-bold rounded-md p-5 text-xl mx-4 md:mx-10 bg-white mt-10 mb-5">
        Edit Category
      </h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched, values }) => (
          <Form className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-5 mx-4 md:mx-10">
              {/* Basic Information Section */}
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <Field
                    name="name"
                    placeholder="Category Name"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-md h-14 p-2 block"
                    aria-label="Category name"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                  <Field
                    name="type"
                    as="select"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-md h-14 p-2 block"
                    aria-label="Category type"
                  >
                    <option value="1" selected={values.type === "1"}>
                      Standard
                    </option>
                    <option value="2" selected={values.type === "2"}>
                      Color-Only
                    </option>
                    <option value="3" selected={values.type === "3"}>
                      Size-Only
                    </option>
                    <option value="4" selected={values.type === "4"}>
                      Color & Size
                    </option>
                  </Field>
                </div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md p-2 h-36 mt-5"
                  aria-label="Category description"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">
                    {errors.description}
                  </div>
                )}
              </div>
              {/* Image Upload Section */}
              <div className="bg-white p-5 rounded-md w-full md:w-1/2">
                <h2 className="font-bold mb-5">Category Icon / Image</h2>
                <ImageUpload
                  previewImage={previewImage}
                  onImageChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (file) {
                      setFieldValue("image", file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-5">{error}</div>
            )}
            <Footer
              saveText={"Save Changes"}
              cancelText={"Cancel"}
              cancelOnClick={() => navigate("/Home/categories")}
              saveBtnType={"submit"}
              cancelBtnType={"button"}
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col justify-center w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">
            Category updated successfully!
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 font-semibold mt-4 w-64"
            onClick={() => navigate("/Home/categories")}
            aria-label="Back to categories"
          >
            Back to Categories
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditCategory;