import React from "react";
import { Field, ErrorMessage } from "formik";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import clsx from "clsx";

function PasswordInput({ name, placeholder, showPassword, togglePasswordVisibility }) {
  return (
    <div className="relative mt-3 w-full">
      <Field name={name}>
        {({ field, meta }) => (
          <div className="relative">
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className={clsx(
                "border-2 outline-none rounded-md p-3 w-full placeholder:text-14 transition-all duration-200",
                {
                  "border-red-500": meta.touched && meta.error,
                  "border-[#28A513]": meta.touched && !meta.error,
                  "border-gray-200": !meta.touched,
                  "focus:border-primary": !meta.touched,
                }
              )}
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
        )}
      </Field>
      <ErrorMessage name={name} component="p" className="text-red-500 text-sm mt-1" />
    </div>
  );
}
export default PasswordInput;