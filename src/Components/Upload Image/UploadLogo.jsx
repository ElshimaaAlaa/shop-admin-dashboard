import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LogoUpload = ({ name, setFieldValue, error }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setFieldValue(name, uploadedFile);
    simulateUpload();
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const handleRemove = () => {
    setFile(null);
    setUploadProgress(0);
    setFieldValue(name, null);
  };

  return (
    <div className="w-full px-6">
      <p className="text-16 font-semibold mb-3">Upload Logo File</p>
      <label
        htmlFor="logo-upload"
        className="flex items-center border-2 border-dashed border-primary rounded-md p-5 cursor-pointer text-gray-500 text-sm"
      >
        <input
          type="file"
          id="logo-upload"
          name={name}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="flex items-center gap-2">
          <img src='/assets/svgs/upload-file_svgrepo.com.svg' alt='upload logo' className='w-6'/>
          Drag & Drop Your logo File Here OR <span className="text-primary font-bold">Browse Files</span>
        </span>
      </label>
      {file && (
        <div className="bg-gray-50 mt-3 rounded-lg p-4 flex items-center justify-between">
          <div className="w-full">
            <p className="text-sm font-semibold text-gray-700 mb-2">{file.name}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{uploadProgress}% done</p>
          </div>
          <button 
            type="button" 
            onClick={handleRemove} 
            className="text-red-500 hover:text-red-700 ml-4"
          >
            <FaTrashAlt size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
export default LogoUpload;