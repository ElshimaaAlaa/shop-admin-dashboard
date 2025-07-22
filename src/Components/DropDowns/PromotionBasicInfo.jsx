import PropTypes from "prop-types";
import { Field, FieldArray } from "formik";
import { RiDeleteBinLine } from "react-icons/ri";
import InputField from "../InputFields/InputField";
import CategoryDropdownField from "./CategoryDropdownField";
import ProductDropdownField from "./ProductDropdownField";
import { useTranslation } from "react-i18next";

const PromotionBasicInfo = ({
  products,
  categories,
  values,
  setFieldValue,
  errors,
  touched,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-md p-5 w-full">
      <h2 className="text-16 font-bold mb-4">{t("basicInfo")}</h2>
      <div className="flex flex-col gap-2">
        <InputField name="name" placeholder={t("promoName")} />
        <InputField name="quantity" placeholder={t("quantity")} />

        <div className="">
          <input
            placeholder={t("productNum")}
            type="number"
            min="1"
            value={values.items.length}
            onChange={(e) => {
              const num = parseInt(e.target.value) || 1;
              const newLength = num > 0 ? num : 1;
              const newItems = [...values.items];

              while (newItems.length < newLength) {
                newItems.push({ product_id: "", quantity: "", category_id: "" });
              }
              while (newItems.length > newLength) {
                newItems.pop();
              }

              setFieldValue("items", newItems);
            }}
            className="w-full h-14 p-2 border-2 rounded-lg outline-none focus:border-primary"
          />
        </div>

        <div className="bg-customOrange-mediumOrange rounded-lg p-4 mb-5 mt-3">
          <FieldArray name="items">
            {({ remove }) => (
              <div className="space-y-4">
                {values.items.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-15 mb-3 text-primary">
                        {t("product")} {index + 1}
                      </h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="font-bold text-red-600 text-sm"
                        >
                          <RiDeleteBinLine size={19} height={40} />
                        </button>
                      )}
                    </div>
                    <div className="">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-full">
                          <Field
                            name={`items[${index}].product_id`}
                            component={ProductDropdownField}
                            products={products}
                          />
                        </div>
                        <div className="w-full">
                          <Field
                            name={`items[${index}].category_id`}
                            component={CategoryDropdownField}
                            categories={categories}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <InputField
                          name={`items[${index}].quantity`}
                          placeholder={t("enterQ")}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
        </div>
      </div>
    </div>
  );
};
PromotionBasicInfo.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};
export default PromotionBasicInfo;