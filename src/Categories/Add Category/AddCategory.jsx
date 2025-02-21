import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addCategory } from "../../ApiServices/AddNewCategoryApi";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { Helmet } from "react-helmet";
import "./style.scss";
import Footer from "../../Components/Footer/Footer";

const ImageUpload = ({ previewImage, onImageChange }) => {
  return (
    <div className="border-2 border-dotted border-gray-300 rounded-md p-3 h-56 flex items-center justify-center">
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
          <img
            src={previewImage}
            alt="preview"
            className="w-400 h-48 object-fill rounded-md"
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
  );
};
function AddCategory() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const initialValues = {
    name: "",
    description: "",
    image: null,
    type: "",
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
    formData.append("type", values.type);
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
    <div className="bg-gray-100 h-full relative">
      <Helmet>
        <title>Add Category | Vertex Dashboard</title>
      </Helmet>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col ">
            <h1 className="font-bold rounded-md p-5 text-xl mx-10 bg-white mt-10 mb-5 ">
              Add Category
            </h1>
            <div className="flex gap-5 mx-10 ">
              <div className="bg-white p-5 rounded-xl w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex items-center gap-4">
                  <Field
                    placeholder="Category Name"
                    name="name"
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-md h-14 p-2 block"
                  />
                  <Field
                    placeholder="Type"
                    as="select"
                    name="type"
                    className="w-full bg-transparent outline-none  border border-gray-300 rounded-md h-14 p-2 block focus:border-2 focus:border-primary"
                  >
                    <option className="option">Type</option>
                    <option value="1" className="option">
                      Standard
                    </option>
                    <option value="2" className="option">
                      Color-Only
                    </option>
                    <option value="3" className="option">
                      Size-Only
                    </option>
                    <option value="4" className="option">
                      Color & Size
                    </option>
                  </Field>
                </div>
                <Field
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md p-2 h-32 mt-5"
                />
              </div>
              <div className="bg-white p-4 rounded-md w-2/4">
                <h2 className="font-bold mb-5">Category Icon / Image</h2>
                <ImageUpload previewImage={previewImage} onImageChange={(event)=>{
                  const file = event.currentTarget.files[0];
                  if(file){
                    setPreviewImage(URL.createObjectURL(file));
                    setFieldValue("image", file);
                  }
                }}/>
              </div>
            </div>
            <Footer
              saveText={"Save"}
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
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
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