import { Field, useFormikContext } from "formik";
import InputField from "../../Components/InputFields/InputField";
import { useTranslation } from "react-i18next";
const PricingSection = ({ isDiscountScheduled, setIsDiscountScheduled }) => {
  const { setFieldValue } = useFormikContext();
  const { t } = useTranslation();
  return (
    <div className="flex gap-6 mx-5">
      <div className="bg-white p-4 rounded-md mt-3 w-full">
        <h2 className="font-bold text-16 mb-3">{t("pricing")}</h2>
        <div className="flex gap-2">
          <InputField name="price" placeholder={t("piecePrice")} />
          <InputField name="cost" placeholder={t("cost")} />
          <InputField name="revenue" placeholder={t("revenue")} />
        </div>
        <div className="flex items-center gap-2 mt-3 mb-3">
          <label className="inline-flex items-center cursor-pointer">
            <Field
              as="input"
              type="checkbox"
              name="schedule_discount"
              className="hidden"
              checked={isDiscountScheduled}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setIsDiscountScheduled(isChecked);
                setFieldValue("schedule_discount", isChecked);
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
          <div className="font-bold text-15">{t("schedule")}</div>
        </div>
        {isDiscountScheduled && (
          <div className="flex gap-2">
            <InputField name="discount_percentage" placeholder={t("discount")} />
            <InputField
              name="discount_expire_at"
              type="date"
              placeholder="Discount Expiry Date"
            />
          </div>
        )}
      </div>
      <div className="w-2/4"></div>
    </div>
  );
};

export default PricingSection;
