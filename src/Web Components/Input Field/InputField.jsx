import React from "react";
import { Field } from "formik";
function InputField({ placeholder, name, type = "text", readOnly = false }) {
  return (
    <div className="relative w-full">
      <Field name={name}>
        {({ field, meta }) => (
          <div className="relative">
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`w-80 lg:w-400 md:w-400 sm:w-390 s:w-390 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14
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
export default InputField;