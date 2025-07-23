import { useState } from "react";
import "./style.scss";
import { Formik, Form } from "formik";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { LuCirclePlus } from "react-icons/lu";
import { addCoupon } from "../ApiServices/AddNewCoupon";
import InputField from "../Components/InputFields/InputField";

function AddNewCoupon({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const initialValues = {
    coupon: "",
    discount_value: "",
    start_date: "",
    end_date: "",
    discount_type: "",
    is_active: false,
  };
  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("coupon", values.coupon);
    formData.append("start_date", values.start_date);
    formData.append("end_date", values.end_date);
    formData.append("discount_type", values.discount_type);
    formData.append("discount_value", values.discount_value);
    formData.append("is_active", values.is_active ? 1 : 0);
    try {
      await addCoupon(formData);
      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to add shipping provider(s)"
      );
      console.error("Error adding shipping provider:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay rounded">
      <div
        className="modalContent modal-width rounded-md w-400"
        id="modal-width"
      >
        <div className="modal-content">
          <h3 className="font-bold text-16 px-3 py-5 rtl:text-[18px] flex items-center gap-2 text-primary">
            <LuCirclePlus size={22} />
            {t("addNewCoupon")}
          </h3>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form className="ps-3 rtl:pe-3">
                <div className="space-y-4 mb-4">
                  <InputField name="coupon" placeholder={t("coupon")} />
                  {/* start and end date */}
                  <InputField
                    name={"start_date"}
                    type="date"
                    placeholder="Discount Expiry Date"
                  />
                  <InputField
                    name={"end_date"}
                    type="date"
                    placeholder="Discount Expiry Date"
                  />
                  <InputField name="discount_value" placeholder={t("amount")} />
                  <InputField
                    name="discount_type"
                    placeholder={t("discountType")}
                  />
                  <div className="rounded-md border-1 border-gray-200 bg-gray-50 p-5 mt-3">
                    <h3 className="font-bold text-15 mb-3 rtl:text-[16px]">
                      {t("status")}
                    </h3>
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={values.is_active}
                          onChange={(e) =>
                            setFieldValue("is_active", e.target.checked)
                          }
                          className="hidden"
                        />
                        <span
                          className={`relative w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                            values.is_active
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          }`}
                          onClick={() =>
                            setFieldValue("is_active", !values.is_active)
                          }
                        >
                          {values.is_active && (
                            <svg
                              className="w-3 h-3 text-white"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <p className="text-15 text-gray-500 ml-2 rtl:mr-2 rtl:text-[14px]">
                          {t("publish")}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3  rtl:flex-row-reverse">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-100 text-gray-400 font-bold p-2 w-32 rounded-md"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    className="bg-primary font-bold text-white p-2 w-32 rounded-md"
                  >
                    {isLoading ? (
                      <ClipLoader size={22} color="#fff" />
                    ) : (
                      t("addCoupon")
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default AddNewCoupon;