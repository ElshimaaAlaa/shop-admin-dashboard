import { useState } from "react";
import StepIndicator from "./StepIndicator";
import "./setUpStoreStyle.scss";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function StoreProfile({ onNext, onBack }) {
  const intialValues = {};
  const handleSubmit = async (values) => {};
  const validationSchema = Yup.object({});

  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <div className="w-full lg:w-600px md:w-550 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center mb-6 ps-6">
          <div className="bg-white border-[6px] border-primary text-dark font-bold rounded-full h-10 w-10 p-5 flex items-center justify-center text-xs mr-2">
            2/3
          </div>
          <p className="text-15 font-bold">
            Let's Get Started To Set Up Your Own Store .
          </p>
        </div>
        <StepIndicator currentStep={2} />
        <Formik>
          <Form></Form>
        </Formik>
        {/* <h2 className="text-15 font-bold mt-8 mb-4 ps-6">
          Fill The Store Profile
        </h2>

        <div className="space-y-4 mb-6 px-6">
          <div>
            <label className="text-13 font-bold text-gray-600 mb-1 block">
              Store Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-md"
              placeholder="Enter store name"
            />
          </div>

          <div>
            <label className="text-13 font-bold text-gray-600 mb-1 block">
              Store Description
            </label>
            <input
              type="text"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-md"
              placeholder="Enter store description"
            />
          </div> */}

        {/* <div>
            <label className="text-13 font-bold text-gray-600 mb-1 block">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-md min-h-[100px]"
              placeholder="Enter bio"
            />
          </div>
        </div> */}

        <div className="px-6">
          <div className="border border-dashed border-primary rounded-md p-4 mb-6">
            <div className="flex items-center gap-8">
              <p className="text-12 font-bold text-gray-600 flex items-center gap-2">
                <img
                  src="/assets/svgs/upload-file_svgrepo.com.svg"
                  alt="upload file"
                  className="w-5"
                />
                Drag & Drop banner here <span className="ms-3">OR</span>
              </p>
              <label className="text-sm text-primary font-bold cursor-pointer">
                Browse Files
                <input type="file" className="hidden" accept=".svg,.png,.jpg" />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4 my-5 mx-5">
          <button
            onClick={onBack}
            className="flex items-center gap-3 border-2 border-primary text-primary px-6 py-2 rounded-md"
          >
            <FaArrowLeftLong /> Back
          </button>

          <div className="flex items-center">
            <div className="flex space-x-1 mr-4">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>

            <button
              onClick={onNext}
              className="flex items-center gap-3 bg-primary text-white px-6 py-2 rounded-md"
            >
              Next <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
