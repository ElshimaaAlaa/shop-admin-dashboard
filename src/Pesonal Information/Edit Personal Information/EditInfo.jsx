import { Form, Formik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { FaCircleCheck } from "react-icons/fa6";
import InputField from "../../Components/InputFields/InputField";
import { AiOutlineDelete } from "react-icons/ai";
import { useTranslation } from "react-i18next";
function EditInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const personalInfo = state || {};
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
  const initialValues = {
    name: personalInfo?.name || "",
    email: personalInfo?.email || "",
    phone: personalInfo?.phone || "",
    image: personalInfo?.image || null,
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
        `https://${live_shop_domain}/api/${role}/update-profile`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "ar",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        <title>{t("editPersonalInfo")}</title>
      </Helmet>
      <section>
        <h1 className="font-bold text-[18px]">{t("editPersonalInfo")}</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="my-3 gap-3">
                {selectedImage || personalInfo?.image ? (
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 border rounded-md p-3">
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : personalInfo.image
                      }
                      alt="Profile"
                      className="w-36 h-24 rounded-md object-cover"
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
                        className="cursor-pointer text-14 flex items-center gap-2"
                      >
                        <img
                          src="/assets/images/upload.png"
                          alt="Upload new-image"
                          className="w-5"
                        />
                        {t("uploadPic")}
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
                        <AiOutlineDelete color="#DC2626" size={24} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">{t("noImage")}</p>
                )}
              </div>
              <div className="border p-3 rounded-md bg-gray-50 w-full">
                <div className="flex flex-col md:flex-row gap-2">
                  <InputField placeholder={t("name")} name="name" />
                  <InputField placeholder={t("email")} name="email" />
                </div>
                <div className="mt-3 flex flex-col md:flex-row gap-2">
                  <InputField placeholder={t("phone")} name="phone" />
                  <div className="w-full"></div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3 rtl:flex-row-reverse">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-400 font-bold p-3 w-32 rounded-md"
                  onClick={() => navigate("/Dashboard/MainInfo")}
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-primary font-bold text-white flex items-center justify-center gap-2 rounded-md p-3 w-32"
                >
                  {isLoading ? (
                    <ClipLoader color="#fff" size={22} />
                  ) : (
                    <>
                      <FaCircleCheck /> {t("save")}
                    </>
                  )}
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
            {t("successUpdateProfile")}
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-32 "
            onClick={() => navigate("/Dashboard/MainInfo")}
          >
            {t("done")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditInfo;
