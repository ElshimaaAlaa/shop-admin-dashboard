import React, { useState, useRef, useEffect } from "react";
import { Field } from "formik";
import "./style.scss";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  name,
  error,
  touched,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div
        className={`w-full bg-transparent outline-none border-2 rounded-md h-12 p-2 flex items-center justify-between cursor-pointer ${
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
          stroke="#71717A"
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

const CategoryField = ({
  field,
  form,
  categories = [],
  handleCategoryChange,
}) => {
  const options = [
    { value: "", label: "Category" },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
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
      className="h-12"
    />
  );
};

const GenderField = ({ field, form }) => {
  const options = [
    { value: "", label: "Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "children", label: "Children" },
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
      className="h-12"
    />
  );
};

const InputField = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;

  return (
    <div className="w-full">
      <input
        {...field}
        {...props}
        className={`w-full h-12 p-3 border-2 bg-transparent rounded-md outline-none placeholder:text-14 ${
          touched[name] && errors[name] ? "border-red-500" : "border-gray-200"
        } focus:border-2 focus:border-primary`}
      />
      {touched[name] && errors[name] && (
        <div className="text-red-500 text-xs mt-1">{errors[name]}</div>
      )}
    </div>
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
  touched = {},
}) => {
  const tagsIds = values.tags_ids || [];
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const tagsDropdownRef = useRef(null);

  const handleClickOutsideTags = (event) => {
    if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(event.target)) {
      setIsTagsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideTags);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideTags);
    };
  }, []);

  return (
    <div className="bg-white p-5 rounded-md w-full mx-5">
      <h2 className="font-bold mb-3 text-16">Basic Information</h2>
      <div className="flex gap-2">
        <Field name="name" component={InputField} placeholder="Product Name" />
        <Field
          name="category_id"
          component={CategoryField}
          categories={categories}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="flex gap-2 mt-3">
        <Field name="tag_number" component={InputField} placeholder="Tag Number" />
        <Field name="gender" component={GenderField} />
      </div>
      <div className="flex gap-2 mt-3 mb-3">
        <div className="relative flex w-full items-center bg-transparent rounded-md focus-within:border-primary">
          <Field
            name="return_percentage"
            component={InputField}
            placeholder="percentage (upon return)"
            className="outline-none ms-32 placeholder:text-14"
          />
        </div>
        <div className="w-full">
          <Field name="stock" component={InputField} placeholder="Stock" />
        </div>
      </div>
      <div className="mt-3 relative" ref={tagsDropdownRef}>
        <div
          className={`w-full min-h-14 p-3 border-2 bg-transparent rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary ${
            errors.tags_ids && touched.tags_ids
              ? "border-red-500"
              : "border-gray-200"
          } cursor-pointer flex items-center justify-between`}
          onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
        >
          <div>
            {tagsIds.length === 0 ? (
              <p className="text-14 text-gray-400">Select Tags</p>
            ) : (
              <p className="text-14 text-black">
                {tagsIds.length} tag(s) selected
              </p>
            )}
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isTagsDropdownOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="#71717A"
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
        
        {isTagsDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {selectedCategoryTags.length === 0 ? (
              <div className="px-4 py-2 text-gray-400">No tags available</div>
            ) : (
              selectedCategoryTags.map((tag, index) => (
                <label
                  key={index}
                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    name="tags_ids"
                    value={index}
                    checked={tagsIds.includes(index)}
                    onChange={() =>
                      handleTagChange(index, setFieldValue, {
                        ...values,
                        tags_ids: tagsIds,
                      })
                    }
                    className="mr-2 custom-checkbox"
                  />
                  {tag}
                </label>
              ))
            )}
          </div>
        )}
        
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