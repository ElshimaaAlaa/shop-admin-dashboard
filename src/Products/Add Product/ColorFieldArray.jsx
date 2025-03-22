import React from "react";
import { FieldArray, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { Plus } from "lucide-react";
import InputField from "../../Components/InputFields/InputField";

const ColorFieldArray = ({ values, setFieldValue }) => {
  return (
    <div className="bg-white p-5 rounded-md mt-5 mx-10 w-890">
      <h2 className="font-bold mb-5">Inventory</h2>
      <FieldArray name="colors">
        {({ push, remove }) => (
          <>
            {values.colors.map((color, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 mb-4 bg-gray-100 p-5 rounded-md"
              >
                <div className="flex gap-2">
                  {/* Upload Image for Color */}
                  <UploadImageForColor
                    name={`colors[${index}].image`}
                    previewImage={color.previewImage}
                    onImageChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        const previewURL = URL.createObjectURL(file);
                        setFieldValue(`colors[${index}].image`, file);
                        setFieldValue(
                          `colors[${index}].previewImage`,
                          previewURL
                        );
                      }
                    }}
                  />

                  {/* Color Name */}
                  <InputField
                    name={`colors[${index}].name`}
                    placeholder="Color"
                  />

                  {/* Color Code */}
                  <InputField
                    name={`colors[${index}].code`}
                    placeholder="Color Code (e.g., #FFFFFF)"
                  />

                  {/* Stock */}
                  <InputField
                    name={`colors[${index}].stock`}
                    placeholder="Stock"
                  />

                  {/* Price */}
                  <InputField
                    name={`colors[${index}].price`}
                    placeholder="Price"
                  />

                  {/* Remove Color Button */}
                  <button
                    type="button"
                    className="text-2xl font-light text-red-500 ms-3"
                    onClick={() => remove(index)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>

                {/* Schedule Discount Checkbox */}
                <div className="flex items-center gap-2 mt-3 mb-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <Field
                      as="input"
                      type="checkbox"
                      name={`colors[${index}].schedule_discount`}
                      className="hidden"
                      onChange={(e) => {
                        setFieldValue(
                          `colors[${index}].schedule_discount`,
                          e.target.checked
                        );
                      }}
                    />
                    <span className="w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center transition-all duration-200 peer-checked:border-orange-500">
                      <svg
                        className="w-3 h-3 text-primary opacity-0 transition-all duration-200 peer-checked:opacity-100"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </span>
                  </label>
                  <div className="font-bold text-15">Schedule a discount</div>
                </div>

                {/* Discount Fields - Show only if schedule discount is checked */}
                {color.schedule_discount && (
                  <div className="flex gap-4">
                    <InputField
                      name={`colors[${index}].discount_percentage`}
                      placeholder="Discount"
                    />
                    <InputField
                      name={`colors[${index}].discount_expire_at`}
                      type="date"
                      placeholder="Discount Expiry Date"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add Color Button */}
            <div className="flex justify-end">
              <button
                className="text-primary rounded-md p-2 text-16 font-bold flex items-center gap-2"
                onClick={() =>
                  push({
                    name: "",
                    code: "",
                    stock: "",
                    price: "",
                    image: null,
                    previewImage: null,
                    schedule_discount: false,
                    discount_percentage: "",
                    discount_expire_at: "",
                  })
                }
                type="button"
              >
                <Plus className="font-bold border-2 border-primary rounded-full" size={18} />
                Add Color
              </button>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default ColorFieldArray;

// UploadImageForColor Component
export const UploadImageForColor = ({ previewImage, onImageChange, name }) => {
  return (
    <div className="border-2 w-72 border-dashed bg-white border-primary rounded-md p-1 flex items-center justify-center">
      <input
        type="file"
        name={name}
        onChange={onImageChange}
        className="hidden"
        id={`image-upload-${name}`}
        aria-label="Upload product image"
      />
      <label
        htmlFor={`image-upload-${name}`}
        className="text-gray-500 cursor-pointer flex flex-col items-center gap-2"
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="preview"
            className="w-full h-full object-fill rounded-md"
          />
        ) : (
          <img
            src="/assets/svgs/upload-file_svgrepo.com.svg"
            alt="upload-image-file"
            className="mt-3 mb-3 w-6"
          />
        )}
      </label>
    </div>
  );
};