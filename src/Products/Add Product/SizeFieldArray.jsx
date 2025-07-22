import { FieldArray, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { Plus } from "lucide-react";
import InputField from "../../Components/InputFields/InputField";
import ColorFieldArray from "./ColorFieldArray";
import { useTranslation } from "react-i18next";
const SizeFieldArray = ({ values, setFieldValue, hasNestedColors }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-4 rounded-md mt-3 mx-5 w-[920px]">
      <h2 className="font-bold mb-3">{t("inventory")}</h2>
      <FieldArray name="sizes">
        {({ push, remove }) => (
          <>
            {values.sizes.map((size, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 mb-4 bg-gray-50 p-4 rounded-md"
              >
                <div className="flex gap-2">
                  <InputField
                    name={`sizes[${index}].name`}
                    placeholder={t("size")}
                    value={size.name || ""}
                  />
                  <InputField
                    name={`sizes[${index}].stock`}
                    placeholder={t("stock")}
                    value={size.stock || ""}
                  />
                  <InputField
                    name={`sizes[${index}].price`}
                    placeholder={t("price")}
                    value={size.price || ""}
                  />
                  <button
                    type="button"
                    className="text-2xl font-light text-red-500"
                    onClick={() => remove(index)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <Field
                      as="input"
                      type="checkbox"
                      name={`sizes[${index}].schedule_discount`}
                      className="hidden"
                      checked={size.schedule_discount || false}
                      onChange={(e) => {
                        setFieldValue(
                          `sizes[${index}].schedule_discount`,
                          e.target.checked
                        );
                      }}
                    />
                    <span className="w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center transition-all duration-200 peer-checked:border-primary">
                      <svg
                        className="w-3 h-3 text-primary opacity-0 transition-all duration-200 peer-checked:opacity-100"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </span>
                  </label>
                  <div className="font-bold text-15">{t("schedule")}</div>
                </div>
                {size.schedule_discount && (
                  <div className="flex gap-2">
                    <InputField
                      name={`sizes[${index}].discount_percentage`}
                      placeholder={t("discount")}
                      value={size.discount_percentage || ""}
                    />
                    <InputField
                      name={`sizes[${index}].discount_expire_at`}
                      type="date"
                      placeholder="Discount Expiry Date"
                      value={size.discount_expire_at || ""}
                    />
                  </div>
                )}
                {/* Nested Colors Section */}
                {hasNestedColors && (
                  <ColorFieldArray
                    values={values}
                    setFieldValue={setFieldValue}
                    sizeIndex={index}
                    nested={true}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="text-primary rounded-md p-2 text-16 font-bold flex items-center gap-2"
                onClick={() =>
                  push({
                    name: "",
                    stock: "",
                    price: "",
                    schedule_discount: false,
                    discount_percentage: "",
                    discount_expire_at: "",
                    ...(hasNestedColors && { colors: [] }),
                  })
                }
                type="button"
              >
                <Plus
                  className="font-bold border-2 border-primary rounded-full"
                  size={18}
                />
                {t("addSize")}
              </button>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};
export default SizeFieldArray;