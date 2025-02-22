import React from "react";
import { Field } from "formik";
function InputField({ icon: Icon, placeholder, name, type = "text" }) {
  return (
    <div className="relative w-full">
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="pl-10 w-full p-3 border border-gray-400 rounded-lg outline-none placeholder:text-14"
        aria-label={placeholder}
      />
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <Icon />
      </span>
    </div>
  );
}
export default InputField;