import { useState } from "react";
import "./PaymentStyle.scss";
import { Formik, Form } from "formik";
import { ClipLoader } from "react-spinners";
import { AddPayment } from "../../ApiServices/AddPaymentMethod";
import { useTranslation } from "react-i18next";
import { LuCirclePlus } from "react-icons/lu";

function AddPaymentMethod({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedpaymentmethod, setSelectedpaymentmethod] = useState([]);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const PaymentMethods = [
    //fetched form end poitn when back end complete it
    { id: 1, name_ar: "Visa", name_en: "Visa", code: "visa" },
    { id: 2, name_ar: "Credit Card", name_en: "Credit Card", code: "Credit" },
    { id: 3, name_ar: "PayPal", name_en: "PayPal", code: "PayPal" },
    { id: 4, name_ar: "Google Pay", name_en: "Google Pay", code: "Google" },
  ];

  const handlePaymentMethodToggle = (paymentmethod) => {
    setSelectedpaymentmethod((prev) => {
      if (prev.some((p) => p.id === paymentmethod.id)) {
        return prev.filter((p) => p.id !== paymentmethod.id);
      } else {
        return [...prev, paymentmethod];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedpaymentmethod.length === 0) {
      setError("Please select at least one payment method");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await Promise.all(
        selectedpaymentmethod.map((payment) =>
          AddPayment({
            name: {
              ar: payment.name_ar,
              en: payment.name_en,
            },
            code: payment.code,
          })
        )
      );
      onClose();
      // window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add payment method");
      console.error("Error adding payment method:", error);
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
            <LuCirclePlus size={22}/>
            {t("addNewPay")}
          </h3>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <Formik initialValues={{}} onSubmit={handleSubmit}>
            <Form className="ps-3 rtl:pe-3">
              <div className="space-y-4 mb-4">
                {PaymentMethods.map((payment) => {
                  const isSelected = selectedpaymentmethod.some(
                    (p) => p.id === payment.id
                  );
                  return (
                    <label
                      key={payment.id}
                      className={`flex items-center cursor-pointer w-full p-3 rounded-lg transition-all duration-200 ${
                        isSelected
                          ? "bg-customOrange-mediumOrange border-2 border-primary"
                          : "bg-gray-50 border border-transparent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => handlePaymentMethodToggle(payment)}
                      />
                      <span
                        className={`w-5 h-5 border-2 border-gray-200 rounded flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-black"
                        }`}
                      >
                        <svg
                          className={`w-3 h-3 text-white transition-all duration-200 ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      </span>
                      <span className="text-16 text-black ms-3">
                        {payment.name_en} ({payment.name_ar})
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="flex justify-end gap-2 mt-3 rtl:flex-row-reverse">
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
                  disabled={isLoading || selectedpaymentmethod.length === 0}
                >
                  {isLoading ? (
                    <ClipLoader size={22} color="#fff" />
                  ) : (
                    t("save")
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default AddPaymentMethod;
