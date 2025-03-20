import React from "react";
import InputField from "../../Components/InputFields/InputField";
import { VscPercentage } from "react-icons/vsc";
import { Field } from "formik";
import './style.scss';
const BasicInformationSection = ({
  categories,
  selectedCategoryTags,
  values,
  setFieldValue,
  handleCategoryChange,
  handleTagChange,
}) => (
  <div className="bg-white p-5 rounded-md w-full">
    <h2 className="font-bold mb-5">Basic Information</h2>
    <div className="flex gap-4">
      <InputField name="name" placeholder="Product Name" />
      <Field
        name="category_id"
        as="select"
        className="w-full p-3 border-2 bg-transparent border-gray-200 rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary"
        onChange={(e) => {
          const categoryId = e.target.value;
          handleCategoryChange(categoryId, setFieldValue);
        }}
      >
        <option value="">Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Field>
    </div>
    <div className="flex gap-4 mt-3">
      <InputField name="tag_number" placeholder="Tag Number" />
      <Field
        as="select"
        name="gender"
        className="w-full p-3 border-2 bg-transparent border-gray-200 rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary"
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="children">Children</option>
      </Field>
    </div>
    <div className="flex gap-4 mt-3 mb-3">
      <div className="relative flex items-center w-810 border-2 bg-transparent border-gray-200 rounded-md  focus-within:border-primary">
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
      <div className="flex flex-wrap gap-2 w-full h-14 p-3 border-2 bg-transparent border-gray-200 rounded-md outline-none placeholder:text-14 focus:border-2 focus:border-primary">
        {selectedCategoryTags.length === 0 && (
          <p className="text-14 text-gray-400">Select Tags</p>
        )}
        {selectedCategoryTags.map((tag, index) => (
          <label key={index} className="flex items-center">
            <input
              type="checkbox"
              name="tags_ids"
              value={index}
              checked={values.tags_ids.includes(index)}
              onChange={() => handleTagChange(index, setFieldValue, values)}
              className="mr-2 custom-checkbox"
            />
            {tag}
          </label>
        ))}
      </div>
    </div>
    <Field
      as="textarea"
      placeholder="Description"
      name="description"
      className="w-full p-3 border-2 h-20 mt-3 bg-transparent border-gray-200 rounded-lg outline-none placeholder:text-14 focus:border-2 focus:border-primary"
    />
  </div>
);
export default BasicInformationSection;
