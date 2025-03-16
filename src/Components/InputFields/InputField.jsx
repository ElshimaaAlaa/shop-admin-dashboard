import React from "react";
import { Field } from "formik";
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
              className={`w-full p-3 border-2 rounded-md outline-none transition-all duration-200
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
          </div>
        )}
      </Field>
    </div>
  );
}
export default AuthInputField;