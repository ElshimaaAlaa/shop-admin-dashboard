import React from "react";
import { FieldArray, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { Plus } from "lucide-react";
import InputField from "../../Components/InputFields/InputField";
import { UploadImageForColor } from "../../Components/Upload Image/UploadImageForColor";

const ColorFieldArray = ({ values, setFieldValue, sizeIndex, nested, makeImageOptional = false }) => {
  const colorsPath = nested ? `sizes[${sizeIndex}].colors` : "colors";
  const colors = nested ? values.sizes[sizeIndex]?.colors : values.colors;
  const defaultProductImage = values.images?.[0]?.previewImage || values.images?.[0]?.image;

  return (
    <div className={`${nested ? 'ml-8 pl-4 border-l-2 border-gray-200' : 'bg-white p-5 rounded-md mt-5 mx-7 w-[915px]'}`}>
      {!nested && <h2 className="font-bold mb-5">Inventory</h2>}
      <FieldArray name={colorsPath}>
        {({ push, remove }) => (
          <>
            {colors?.map((color, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 mb-4 bg-gray-50 p-5 rounded-md"
              >
                <div className="flex gap-1">
                  <UploadImageForColor
                    name={`${colorsPath}[${index}]`}
                    previewImage={color.previewImage || color.existingImage}
                    setFieldValue={setFieldValue}
                    colorIndex={index}
                    defaultProductImage={defaultProductImage}
                    existingImage={color.existingImage}
                    isOptional={makeImageOptional}
                  />
                  <InputField 
                    name={`${colorsPath}[${index}].name.ar`} 
                    placeholder="Color Name (Ar)"
                    value={color.name?.ar || ""}
                    onChange={(e) => {
                      setFieldValue(`${colorsPath}[${index}].name.ar`, e.target.value);
                    }}
                  />
                  <InputField 
                    name={`${colorsPath}[${index}].name.en`} 
                    placeholder="Color Name (En)"
                    value={color.name?.en || ""}
                    onChange={(e) => {
                      setFieldValue(`${colorsPath}[${index}].name.en`, e.target.value);
                    }}
                  />
                  <InputField
                    name={`${colorsPath}[${index}].code`}
                    placeholder="Color Code"
                    value={color.code || ""}
                  />
                  <InputField
                    name={`${colorsPath}[${index}].stock`}
                    placeholder="Stock"
                    value={color.stock || ""}
                  />
                  <InputField
                    name={`${colorsPath}[${index}].price`}
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
                      name={`${colorsPath}[${index}].schedule_discount`}
                      className="hidden"
                      checked={color.schedule_discount || false}
                      onChange={(e) => {
                        setFieldValue(
                          `${colorsPath}[${index}].schedule_discount`,
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
                      name={`${colorsPath}[${index}].discount_percentage`}
                      placeholder="Discount"
                      value={color.discount_percentage || ""}
                    />
                    <InputField
                      name={`${colorsPath}[${index}].discount_expire_at`}
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
                    image: null,
                    previewImage: null,
                    existingImage: null,
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