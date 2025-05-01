import React, { useState } from "react";
import InputField from "../../Components/InputFields/InputField";
import { VscPercentage } from "react-icons/vsc";
import { Field } from "formik";
import './style.scss';

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  name,
  error,
  touched,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`w-full bg-transparent outline-none border-2 rounded-md h-[54px] p-2 flex items-center justify-between cursor-pointer ${
          error && touched ? "border-red-500" : "border-gray-200"
        } focus:border-2 focus:border-primary`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
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
          {options.map((option) => (
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
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

const CategoryField = ({ field, form, categories = [], handleCategoryChange }) => {
  const options = [
    { value: "", label: "Category" },
    ...categories.map(category => ({
      value: category.id,
      label: category.name
    }))
  ];

  return (
    <CustomDropdown
      options={options}
      value={field.value}
      onChange={(name, value) => {
        form.setFieldValue(name, value);
        handleCategoryChange(value, form.setFieldValue);
      }}
      name={field.name}
      placeholder="Category"
      error={form.errors[field.name]}
      touched={form.touched[field.name]}
    />
  );
};

const GenderField = ({ field, form }) => {
  const options = [
    { value: "", label: "Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "children", label: "Children" }
  ];

  return (
    <CustomDropdown
      options={options}
      value={field.value}
      onChange={form.setFieldValue}
      name={field.name}
      placeholder="Gender"
      error={form.errors[field.name]}
      touched={form.touched[field.name]}
    />
  );
};

const BasicInformationSection = ({
  categories = [],
  selectedCategoryTags = [],
  values = { tags_ids: [] },
  setFieldValue,
  handleCategoryChange,
  handleTagChange,
  errors = {},
  touched = {}
}) => {
  const tagsIds = values.tags_ids || [];

  return (
    <div className="bg-white p-5 rounded-md w-full mx-7">
      <h2 className="font-bold mb-3 text-16">Basic Information</h2>
      <div className="flex gap-4">
        <InputField name="name" placeholder="Product Name" />
        <Field 
          name="category_id" 
          component={CategoryField} 
          categories={categories} 
          handleCategoryChange={handleCategoryChange} 
        />
      </div>
      <div className="flex gap-4 mt-3">
        <InputField name="tag_number" placeholder="Tag Number" />
        <Field name="gender" component={GenderField} />
      </div>
      <div className="flex gap-4 mt-3 mb-3">
        <div className="relative flex items-center w-810 border-2 bg-transparent border-gray-200 rounded-md focus-within:border-primary">
          <span className="h-full w-10 text-center pt-4 ps-2 bg-gray-100 absolute rounded-tl-md rounded-bl-md">
            <VscPercentage className="text-xl text-gray-600 font-bold" />
          </span>
          <Field
            name="return_percentage"
            placeholder="percentage (upon return)"
            className="outline-none ms-12 placeholder:text-14"
          />
        </div>
        <div className="w-full">
          <InputField name="stock" placeholder="Stock" />
        </div>
      </div>
      <div className="mt-3">
        <div className={`flex flex-wrap gap-2 w-full min-h-14 p-3 border-2 bg-transparent rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary ${
          errors.tags_ids && touched.tags_ids ? "border-red-500" : "border-gray-200"
        }`}>
          {selectedCategoryTags.length === 0 && (
            <p className="text-14 text-gray-400">Select Tags</p>
          )}
          {selectedCategoryTags.map((tag, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                name="tags_ids"
                value={index}
                checked={tagsIds.includes(index)}
                onChange={() => handleTagChange(index, setFieldValue, { ...values, tags_ids: tagsIds })}
                className="mr-2 custom-checkbox"
              />
              {tag}
            </label>
          ))}
        </div>
        {errors.tags_ids && touched.tags_ids && (
          <div className="text-red-500 text-xs mt-1">{errors.tags_ids}</div>
        )}
      </div>
      <Field
        as="textarea"
        placeholder="Description"
        name="description"
        className="w-full p-3 border-2 h-20 mt-3 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
      />
    </div>
  );
};

export default BasicInformationSection;