import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Name from "../../Svgs/Name";
import Email from "../../Svgs/Email";
import Phone from "../../Svgs/Phone";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import InputField from "../../Components/Input Field/InputField";
import { RiDeleteBin6Line } from "react-icons/ri";

function EditInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const personalInfo = state || {};

  const initialValues = {
    name: personalInfo?.name || "",
    email: personalInfo?.email || "",
    phone: personalInfo?.phone || "",
    image: null,
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      const response = await axios.post(
        "https://demo.vrtex.duckdns.org/api/update-profile",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "ar",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990`,
          },
        }
      );
      console.log("Profile updated:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Edit Personal Information</title>
      </Helmet>
      <section>
        <h1 className="font-bold text-xl">Edit Personal Information</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="my-10 gap-3">
                {selectedImage || personalInfo?.image ? (
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 border rounded-md p-5">
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : personalInfo.image
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-md object-cover"
                    />
                    <div className="flex items-center gap-5 font-bold">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="imageUpload"
                        onChange={(e) => {
                          setSelectedImage(e.target.files[0]);
                          setFieldValue("image", e.target.files[0]);
                        }}
                        aria-label="Upload new image"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex items-center gap-3"
                      >
                        <img
                          src="/assets/images/upload.png"
                          alt="Upload new-image"
                          className="w-5"
                        />
                        Upload Picture
                      </label>
                      <button
                        type="button"
                        className="bg-red-50 p-2 rounded-md border border-red-400"
                        onClick={() => {
                          setSelectedImage(null);
                          setFieldValue("image", null);
                        }}
                        aria-label="Delete image"
                      >
                        <RiDeleteBin6Line size={20} color="red" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
              </div>
              <div className="border p-5 rounded-md bg-gray-100 w-full mt-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <InputField icon={Name} placeholder="Name" name="name" />
                  <InputField icon={Email} placeholder="Email" name="email" />
                </div>
                <div className="mt-4">
                  <InputField icon={Phone} placeholder="Phone" name="phone" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-500 font-semibold p-3 w-32 rounded-md"
                  onClick={() => navigate("/Home/MainInfo")}
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
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">
            Profile updated successfully!
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-64 font-semibold"
            onClick={() => navigate("/Home/MainInfo")}
          >
            Done ! Updated Successfully
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditInfo;