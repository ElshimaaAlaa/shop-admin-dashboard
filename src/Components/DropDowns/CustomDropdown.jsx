import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  name,
  error,
  touched,
  className = "",
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const translatedPlaceholder =  t("selectOption");

  const selectedOption = options.find((opt) => opt.value === value);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const translatedOptions = options.map(option => ({
    ...option,
    label: t(option.label) 
  }));

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div
        className={`w-full bg-transparent outline-none border-2 rounded-lg h-12 p-2 flex items-center justify-between cursor-pointer ${
          error && touched ? "border-red-500" : "border-gray-200"
        } focus:border-2 focus:border-primary`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {selectedOption ? t(selectedOption.label) : translatedPlaceholder}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {translatedOptions.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                value === option.value ? "bg-primary bg-opacity-10" : ""
              }`}
              onClick={() => {
                onChange(name, option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && touched && (
        <div className="text-red-500 text-xs mt-1">{t(error)}</div>
      )}
    </div>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  className: PropTypes.string,
};

CustomDropdown.defaultProps = {
  placeholder: "", 
};

export default CustomDropdown;