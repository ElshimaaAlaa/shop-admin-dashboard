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
              className={`w-full h-12 p-2 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 placeholder:text-14 focus:border-primary placeholder:text-gray-400`}
              readOnly={readOnly}
            />
          </div>
        )}
      </Field>
    </div>
  );
}
export default InputField;