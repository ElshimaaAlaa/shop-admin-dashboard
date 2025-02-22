import React from "react";
import { Field } from "formik";
function InputField({ placeholder, name, type = "text" }) {
  return (
    <div className="relative w-full">
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-400 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
        aria-label={placeholder}
      />
    </div>
  );
}
export default InputField;