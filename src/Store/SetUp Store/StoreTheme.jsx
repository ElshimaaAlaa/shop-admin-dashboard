import { useState } from "react";
import StepIndicator from "./StepIndicator";
import { Trash2 } from "lucide-react";
import "./setUpStoreStyle.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function ThemeStore({ onNext }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(85);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setProgress(85);
    }
  };
  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <div className="w-full lg:w-750 md:w-600px bg-white rounded-lg shadow-lg ">
        <div className="flex justify-center my-10">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center mb-6 ps-6">
          <div className="bg-white border-[6px] border-primary text-dark font-bold rounded-full h-10 w-10 p-5 flex items-center justify-center text-xs mr-2">
            1/3
          </div>
          <p className="text-15 font-bold">
            Let's Get Started To Set Up Your Own Store .
          </p>
        </div>
        <StepIndicator currentStep={1} />
        <h2 className="text-16 font-bold  mb-4 ps-6">Upload Logo File</h2>
        <div className="px-6">
          <div className="border border-dashed border-primary rounded-md p-4 mb-3">
            <div className="flex items-center gap-8">
              <p className="text-12 font-bold text-gray-600 flex items-center gap-2">
                <img
                  src="/assets/svgs/upload-file_svgrepo.com.svg"
                  alt="upload file"
                  className="w-5"
                />
                Drag & Drop Your logo file here <span className="ms-3">OR</span>
              </p>
              <label className="text-sm text-primary font-bold cursor-pointer">
                Browse Files
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".svg,.png,.jpg"
                />
              </label>
            </div>
          </div>
          {file && (
            <div className="bg-gray-100 p-4 rounded-md border-2 border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-13 font-bold">File Name.SVG</p>
                <button onClick={handleRemoveFile}>
                  {Trash2 ? (
                    <Trash2 className="h-5 w-5 text-red-600" />
                  ) : (
                    <span>🗑️</span>
                  )}
                </button>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{progress}% done</p>
            </div>
          )}
        </div>

        <h2 className="text-15 font-bold mt-5 ps-6">
          Enter Your Store Theme Colors
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-3 px-6">
          <div>
            <p className="text-sm mb-2 bg-gray-100 p-3 rounded-md border-2 border-gray-200">
              Primary Color
            </p>
          </div>
          <div>
            <p className="text-sm mb-2  bg-gray-100 p-3 rounded-md border-2 border-gray-200">
              Secondary Color
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4 my-5 mx-5">
          <button
            onClick={() => navigate("/StoreProfile")}
            className="flex items-center gap-3 bg-primary text-white px-6 py-2 rounded-md"
          >
            Next
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
}
