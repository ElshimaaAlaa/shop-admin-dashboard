import React from "react";
import { Helmet } from "react-helmet";
import CreditCard from "../../Svgs/CreditCard";
import Paypal from "../../Svgs/Paypal";
import Visa from "../../Svgs/Visa";
import GooglePay from "../../Svgs/GooglePay";

function Info() {
  const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo") || "{}");
  const paymentMethod = localStorage.getItem("payment_method") || "";
  const renderPaymentMethodIcon = () => {
    switch (paymentMethod.toLowerCase()) {
      case "credit card":
        return <CreditCard className="w-8 h-8" />;
      case "paypal":
        return <Paypal className="w-8 h-8" />;
      case "visa":
        return <Visa className="w-8 h-8" />;
      case "google pay":
        return <GooglePay className="w-8 h-8" />;
      default:
        return null;
    }
  };

  const formatPaymentMethodText = () => {
    switch (paymentMethod.toLowerCase()) {
      case "credit card":
        return "Credit Card";
      case "paypal":
        return "PayPal";
      case "visa":
        return "Visa";
      case "google pay":
        return "Google Pay";
      default:
        return paymentMethod;
    }
  };

  return (
    <div>
      <Helmet>
        <title>Store Payment Information</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="font-bold text-[20px]">Payment Information</h1>
        <button
          className="text-white font-semibold flex items-center justify-center gap-2 bg-primary p-3 w-24 rounded-md"
          aria-label="Edit personal information"
        >
          <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-6" />
          Edit
        </button>
      </div>
      <section className="border border-gray-200 p-5 rounded-md">
        <h4 className="font-semibold text-16 mb-3">Personal Information</h4>
        <div className="flex flex-col md:flex-row gap-x-96 mb-3">
          <div>
            <h3 className="text-gray-400 text-15">Name</h3>
            <p className="font-medium text-15 mt-1">{paymentInfo.name || "Not provided"}</p>
          </div>
          <div>
            <h3 className="text-gray-400 text-15">Email</h3>
            <p className="font-medium text-15 mt-1">{paymentInfo.email || "Not provided"}</p>
          </div>
        </div>
        <div className="mb-3">
          <h3 className="text-gray-400 text-15">Phone</h3>
          <p className="font-medium text-15 mt-1">{paymentInfo.phone || "Not provided"}</p>
        </div>

        <h4 className="font-semibold text-16 mb-3">Payment Method</h4>
        <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2 w-44">
          {renderPaymentMethodIcon()}
          <p className="font-bold">{formatPaymentMethodText()}</p>
        </div>
        <h4 className="font-semibold text-16 my-4">Payment Info</h4>
        <div className="flex flex-col md:flex-row  gap-x-72 mb-4">
          <div>
            <h3 className="text-gray-400 text-15">Card Holder Name</h3>
            <p className="font-medium text-15 mt-1">
              {paymentInfo.card_holder_name || "Not provided"}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 text-15">Card number</h3>
            <p className="font-medium text-15 mt-1">
              {paymentInfo.card_number || "Not provided"}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-x-96 mb-4">
          <div>
            <h3 className="text-gray-400 text-14">CVV</h3>
            <p className="font-medium text-15 mt-1">
              {paymentInfo.card_cvv || "Not provided"}
            </p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm">Expiration Date</h3>
            <p className="font-medium text-15 mt-1">
              {paymentInfo.card_exp_date || "Not provided"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Info;