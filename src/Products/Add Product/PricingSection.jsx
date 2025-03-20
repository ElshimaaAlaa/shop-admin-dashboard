import React from "react";
import { Field, useFormikContext } from "formik";
import InputField from "../../Components/InputFields/InputField";
const PricingSection = ({ isDiscountScheduled, setIsDiscountScheduled }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <div className="flex gap-6">
      <div className="bg-white p-5 rounded-md mt-5 mx-10 w-full">
        <h2 className="font-bold mb-5">Pricing</h2>
        <div className="flex gap-4">
          <InputField name="price" placeholder="Price (For Piece)" />
          <InputField name="cost" placeholder="Cost" />
          <InputField name="revenue" placeholder="Revenue" />
        </div>
        <div className="flex items-center gap-2 mt-3 mb-3">
          <label className="inline-flex items-center cursor-pointer">
            <Field
              as="input"
              type="checkbox"
              name="schedule_discount"
              className="hidden"
              onChange={(e) => {
                setIsDiscountScheduled(e.target.checked);
                setFieldValue("schedule_discount", e.target.checked);
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
        {isDiscountScheduled && (
          <div className="flex gap-4">
            <InputField name="discount_percentage" placeholder="Discount" />
            <InputField
              name="discount_expire_at"
              type="date"
              placeholder="Discount Expiry Date"
            />
          </div>
        )}
      </div>
      <div className="w-2/4">

      </div>
    </div>
  );
};

export default PricingSection;
