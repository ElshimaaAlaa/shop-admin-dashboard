import { Field, ErrorMessage } from "formik";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import clsx from "clsx";

function PasswordInput({ 
  name, 
  placeholder, 
  showPassword, 
  togglePasswordVisibility,
  dir = "ltr" 
}) {
  return (
    <div className="relative mt-3 w-full">
      <Field name={name}>
        {({ field, meta }) => (
          <div className="relative">
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              dir={dir} 
              className={clsx(
                "w-full p-3 h-14 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary placeholder:text-gray-400",
                {
                  "border-red-500": meta.touched && meta.error,
                  "border-[#28A513]": meta.touched && !meta.error,
                  "border-gray-200": !meta.touched,
                  "focus:border-primary": !meta.touched,
                  "pr-10": dir === "ltr", 
                  "pl-10": dir === "rtl", 
                }
              )}
            />
            <button
              type="button"
              className={clsx(
                "absolute top-1/2 transform -translate-y-1/2 cursor-pointer",
                {
                  "right-2": dir === "ltr",
                  "left-2": dir === "rtl",  
                }
              )}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </button>
          </div>
        )}
      </Field>
      <ErrorMessage 
        name={name} 
        component="div" 
        className={clsx("text-red-500 text-sm mt-1", {
          "text-right": dir === "rtl", 
          "text-left": dir === "ltr", 
        })} 
      />
    </div>
  );
}
export default PasswordInput;