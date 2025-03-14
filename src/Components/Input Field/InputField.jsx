import React from "react";
import { Field } from "formik";
function InputField({ placeholder, name, type = "text" , readOnly = false }) {
  return (
    <div className="relative w-full">
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 h-16 border-2 border-gray-200 rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary"
        aria-label={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
}
export default InputField;