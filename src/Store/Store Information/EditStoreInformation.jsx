import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Field, Form, Formik } from "formik";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import InputField from "../../Components/Input Field/InputField";
import Name from "../../Svgs/Name";

function EditStoreInformation() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {};
  const handleSubmit = async (values) => {};
  return (
    <div>
      <Helmet>
        <title>Edit Store Information</title>
      </Helmet>
      <section>
        <h1 className="font-bold text-xl">Edit Store Information</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="border p-5 rounded-md bg-gray-100 w-full mt-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <InputField placeholder="Name" name="name" />
                  <InputField placeholder="Location" name="location" />
                </div>
                <div className="mt-4">
                  <Field
                    as="textarea"
                    placeholder="Bio"
                    name="pio"
                    className="border-2 border-gray-200 w-full outline-none p-3 rounded-md h-20 placeholder:text-14 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row md:flex-row items-end justify-between border border-gray-200 rounded-md mt-6 p-5">
                <div>
                  <p className="text-1xl font-bold mb-3 mt-5">Banners</p>
                  <img
                    src="/assets/svgs/Frame 1984077803.svg"
                    alt="upload-file"
                    className="w-52"
                  />
                </div>
                <div className="flex items-center gap-10 mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/svgs/download-8_svgrepo.com.svg"
                      alt="download-file"
                      className="w-6"
                    />
                    <p className="font-semibold text-16">Upload New Logo</p>
                  </div>
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
            Store Information updated successfully!
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
export default EditStoreInformation;
