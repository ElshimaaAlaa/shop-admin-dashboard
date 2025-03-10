import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { updateCategory } from "../../ApiServices/updateCategory";
import Footer from "../../Components/Footer/Footer";
import { ImageUpload } from "../../Components/Upload Image/UploadUpdatedImage";
import InputField from "../../Components/Input Field/InputField";

function EditCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(state?.image || null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const category = state || {};

  const initialTagsEn = category?.tags?.en || [];
  const initialTagsAr = category?.tags?.ar || [];

  const initialValues = {
    name: category?.name || "",
    description: category?.description || "",
    type: category?.type || "",
    image: null,
    tagsEn: initialTagsEn,
    tagsAr: initialTagsAr, // Old Arabic tags
    newTagEn: "", // For adding new English tags
    newTagAr: "", // For adding new Arabic tags
  };

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

      // Combine old and new tags for submission
      const allTagsEn = values.tagsEn;
      const allTagsAr = values.tagsAr;

      // Append English tags to FormData
      allTagsEn.forEach((tag, index) => {
        formData.append(`tags[en][${index}]`, tag);
      });

      // Append Arabic tags to FormData
      allTagsAr.forEach((tag, index) => {
        formData.append(`tags[ar][${index}]`, tag);
      });

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

  // Tag Component
  const Tag = ({ tag, onDelete }) => (
    <div className="flex items-center bg-customOrange-mediumOrange text-primary rounded-md px-3 py-1 m-1">
      <span>{tag}</span>
      <button
        type="button"
        onClick={onDelete}
        className="ml-2 text-lg text-red-600"
        aria-label="Delete tag"
      >
        ×
      </button>
    </div>
  );

  return (
    <div className="bg-gray-100 h-150vh flex flex-col relative">
      <Helmet>
        <title>Edit Category - VERTEX</title>
        <meta name="description" content="Edit category details in VERTEX" />
      </Helmet>
      <h1 className="font-bold rounded-md p-5 text-lg mx-4 md:mx-10 bg-white mt-5 mb-5">
        Edit Category
      </h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-5 mx-4 md:mx-10">
              {/* Basic Information Section */}
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
                  <InputField
                    name="name"
                    placeholder="Category Name"
                    aria-label="Category name"
                  />
                  <Field
                    name="type"
                    as="select"
                    className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md h-14 p-2 block placeholder:text-14 focus:border-primary"
                    aria-label="Category type"
                    value={values.type}
                  >
                    <option value="">Choose Type</option>
                    <option value="1">Standard</option>
                    <option value="2">Color-Only</option>
                    <option value="3">Size-Only</option>
                    <option value="4">Color & Size</option>
                  </Field>
                </div>
                {/* English Tags */}
                <div className="mb-3 p-2 flex w-full bg-transparent outline-none border-2 border-gray-200 rounded-md placeholder:text-14 focus:border-primary">
                  <div className="flex">
                    {values.tagsEn.map((tag, index) => (
                      <Tag
                        key={`en-${index}`}
                        tag={tag}
                        onDelete={() => {
                          const updatedTags = values.tagsEn.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("tagsEn", updatedTags);
                        }}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    name="newTagEn"
                    placeholder="Enter Tag Name"
                    value={values.newTagEn}
                    onChange={(e) => setFieldValue("newTagEn", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && values.newTagEn.trim()) {
                        e.preventDefault();
                        setFieldValue("tagsEn", [
                          ...values.tagsEn,
                          values.newTagEn.trim(),
                        ]);
                        setFieldValue("newTagEn", "");
                      }
                    }}
                    className="w-full bg-transparent outline-none placeholder:text-14"
                  />
                </div>
                {/* Arabic Tags */}
                <div className="mb-3 p-2 flex w-full bg-transparent outline-none border-2 border-gray-200 rounded-md placeholder:text-14 focus:border-primary">
                  <div className="flex ">
                    {/* Display old and new Arabic tags together */}
                    {values.tagsAr.map((tag, index) => (
                      <Tag
                        key={`ar-${index}`}
                        tag={tag}
                        onDelete={() => {
                          const updatedTags = values.tagsAr.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("tagsAr", updatedTags);
                        }}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    name="newTagAr"
                    placeholder="Enter Tag Name"
                    value={values.newTagAr}
                    onChange={(e) => setFieldValue("newTagAr", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && values.newTagAr.trim()) {
                        e.preventDefault();
                        setFieldValue("tagsAr", [
                          ...values.tagsAr,
                          values.newTagAr.trim(),
                        ]);
                        setFieldValue("newTagAr", "");
                      }
                    }}
                    className="w-full bg-transparent outline-none placeholder:text-14"
                  />
                </div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md p-2 h-36 mt-3 placeholder:text-14 focus:border-primary"
                  aria-label="Category description"
                />
              </div>
              {/* Image Upload Section */}
              <div className="bg-white p-5 rounded-md w-full md:w-1/2 h-80">
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
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-64"
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