import React from "react";
import { Field, ErrorMessage } from "formik";
import { FaCircleCheck } from "react-icons/fa6";

function AuthInputField({ placeholder, name, type = "text", readOnly = false }) {
  return (
    <div className="relative w-full">
      <Field name={name}>
        {({ field, meta }) => (
          <div className="relative">
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`w-full p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14
                ${
                  meta.touched && meta.error
                    ? "border-red-500"
                    : meta.touched && !meta.error
                    ? "border-[#28A513]"
                    : "border-gray-200"
                }
                ${meta.touched ? "focus:border-2" : "focus:border-primary"}
                ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}
              `}
              readOnly={readOnly}
            />
            {meta.touched && !meta.error && (
              <FaCircleCheck color="#28A513" className="w-5 h-5 absolute right-3 top-4" />
            )}
          </div>
        )}
      </Field>
      <ErrorMessage name={name} component="p" className="text-red-500 text-sm mt-1" />
    </div>
  );
}
export default AuthInputField;