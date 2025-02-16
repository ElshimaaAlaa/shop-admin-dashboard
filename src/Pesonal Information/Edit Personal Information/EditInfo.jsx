import { Form, Formik, Field } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Name from "../../Svgs/Name";
import Email from "../../Svgs/Email";
import Phone from "../../Svgs/Phone";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { RiDeleteBin6Fill } from "react-icons/ri";

function EditInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const personalInfo = state || {};
  const [imagePreview, setImagePreview] = useState(personalInfo?.image || null); // For image preview

  const intialValues = {
    name: personalInfo?.name || "",
    email: personalInfo?.email || "",
    phone: personalInfo?.phone || "",
    image: null, // For file upload
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
    //   formData.append("phone", values.phone);
      if (values.image) {
        formData.append("image", values.image); // Append the image file
      }
      await updateProfile(formData); // Update profile with form data
      setShowModal(true);
    //   setIsLoading(true)
    } catch (error) {
      console.error("Failed to update profile", error);
      setShowModal(false);
      setIsLoading(false);
    } finally {
    //   setIsLoading(false);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("image", file); // Update Formik field value
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const handleImageDelete = (setFieldValue) => {
    setFieldValue("image", null); // Clear Formik field value
    setImagePreview(null); // Clear image preview
  };

  return (
    <div>
      <Helmet>
        <title>Edit Personal Information</title>
      </Helmet>
      <section>
        <h1 className="font-bold text-2xl">Edit Personal Information</h1>
        <Formik
          initialValues={intialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              {/* Image Section */}
              <div className="flex items-center justify-between my-10 border rounded-md p-5">
                <div className="flex items-center gap-5">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="user-profile"
                      className="rounded-xl h-20 w-20 object-cover"
                    />
                  ) : (
                    <img
                      src="/assets/images/unsplash_et_78QkMMQs.png" // Default image
                      alt="user-profile"
                      className="rounded-xl h-20 w-20 object-cover"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold">{personalInfo?.name}</h2>
                    <p className="text-gray-400 mt-3">Vertex CEO</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex font-semibold items-center gap-3 cursor-pointer">
                    <img
                      src="/assets/images/upload.png"
                      alt="upload-image"
                      className="h-4 w-4"
                    />
                    Upload Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                  </label>
                  <button
                    type="button"
                    className="border rounded-xl border-red-600 bg-red-100 p-3"
                    onClick={() => handleImageDelete(setFieldValue)}
                  >
                    <RiDeleteBin6Fill className="text-red-700 h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="border p-5 rounded-md bg-gray-100 w-130vh">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Field
                      placeholder="Name"
                      className="pl-10 w-450 p-3 border border-gray-400 rounded-lg outline-none"
                      name="name"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <Name />
                    </span>
                  </div>
                  <div className="relative">
                    <Field
                      placeholder="Email"
                      className="pl-10 w-450 p-3 border border-gray-400 rounded-lg outline-none"
                      name="email"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <Email />
                    </span>
                  </div>
                </div>
                <div className="relative mt-4">
                  <Field
                    placeholder="Phone"
                    className="pl-10 w-full p-3 border border-gray-400 rounded-lg outline-none"
                    name="phone"
                  />
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <Phone />
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-500 font-semibold p-3 w-32 rounded-md"
                  onClick={() => navigate('/Home/MainInfo')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white font-semibold rounded-md p-3 w-32"
                >
                  {isLoading ? <ClipLoader color="#fff" size={22} /> : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col w-370 items-center">
          <p className="font-bold mt-5 text-center">
            Profile updated successfully!
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 font-semibold mt-4 w-64"
            onClick={() => setShowModal(false)}
          >
            Done! Updated Successfully
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditInfo;