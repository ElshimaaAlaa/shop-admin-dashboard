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
              className={`w-full h-14 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary placeholder:text-gray-400`}
              readOnly={readOnly}
            />
          </div>
        )}
      </Field>
    </div>
  );
}
export default InputField;
