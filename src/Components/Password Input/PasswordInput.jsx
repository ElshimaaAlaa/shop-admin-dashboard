import React from "react";
import { Field } from "formik";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
function PasswordInput({ name, placeholder, showPassword, togglePasswordVisibility }) {
  return (
    <div className="relative mt-5">
      <Field
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="border-2 border-gray-200 outline-none rounded-md p-3 w-full placeholder:text-14 focus:border-2 focus:border-primary "
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
}
export default PasswordInput;