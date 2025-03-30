import React from "react";
import { FieldArray, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { Plus } from "lucide-react";
import InputField from "../../Components/InputFields/InputField";
import { UploadImageForColor } from "../../Components/Upload Image/UploadImageForColor";

const ColorFieldArray = ({ values, setFieldValue }) => {
  return (
    <div className="bg-white p-5 rounded-md mt-5 mx-10 w-900">
      <h2 className="font-bold mb-5">Inventory</h2>
      <FieldArray name="colors">
        {({ push, remove }) => (
          <>
            {values.colors.map((color, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 mb-4 bg-gray-100 p-5 rounded-md"
              >
                <div className="flex gap-1">
                  <UploadImageForColor
                    previewImage={color.previewImage}
                    name={`colors[${index}]`}
                    setFieldValue={setFieldValue}
                    colorIndex={index}
                  />
                  <InputField 
                    name={`colors[${index}].name.ar`} 
                    placeholder="Color Name (Arabic)"
                    value={color.name?.ar || ""}
                  />
                  <InputField 
                    name={`colors[${index}].name.en`} 
                    placeholder="Color Name (English)"
                    value={color.name?.en || ""}
                  />
                  <InputField
                    name={`colors[${index}].code`}
                    placeholder="Color Code"
                    value={color.code || ""}
                  />
                  <InputField
                    name={`colors[${index}].stock`}
                    placeholder="Stock"
                    value={color.stock || ""}
                  />
                  <InputField
                    name={`colors[${index}].price`}
                    placeholder="Price"
                    value={color.price || ""}
                  />
                  <button
                    type="button"
                    className="text-3xl font-light text-red-500 mb-5"
                    onClick={() => remove(index)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3 mb-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <Field
                      as="input"
                      type="checkbox"
                      name={`colors[${index}].schedule_discount`}
                      className="hidden"
                      checked={color.schedule_discount || false}
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
                {color.schedule_discount && (
                  <div className="flex gap-4">
                    <InputField
                      name={`colors[${index}].discount_percentage`}
                      placeholder="Discount"
                      value={color.discount_percentage || ""}
                    />
                    <InputField
                      name={`colors[${index}].discount_expire_at`}
                      type="date"
                      placeholder="Discount Expiry Date"
                      value={color.discount_expire_at || ""}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="text-primary rounded-md p-2 text-16 font-bold flex items-center gap-2"
                onClick={() =>
                  push({
                    name: { ar: "", en: "" },
                    code: "",
                    stock: "",
                    price: "",
                    image: "/assets/images/default-color.png",
                    previewImage: "/assets/images/default-color.png",
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