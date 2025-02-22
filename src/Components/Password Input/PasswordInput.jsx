import React from "react";
import { Field } from "formik";
import Password from "../../Svgs/Password";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
function PasswordInput({ name, placeholder, showPassword, togglePasswordVisibility }) {
  return (
    <div className="relative mt-5">
      <Field
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="passwordInput pl-10 w-full placeholder:text-14 "
      />
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <Password />
      </span>
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