import React from "react";
import { Helmet } from "react-helmet";
import CreditCard from "../../Svgs/CreditCard";
import Paypal from "../../Svgs/Paypal";
import Visa from "../../Svgs/Visa";
import GooglePay from "../../Svgs/GooglePay";
import { IoCopyOutline } from "react-icons/io5";

function Info() {
  const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo") || "{}");
  const paymentMethod = localStorage.getItem("payment_method") || "";
  
  const renderPaymentMethodIcon = () => {
    switch (paymentMethod.toLowerCase()) {
      case "credit card":
        return <CreditCard className="w-11 h-11" />;
      case "paypal":
        return <Paypal className="w-11 h-11" />;
      case "visa":
        return <Visa className="w-11 h-11" />;
      case "google pay":
        return <GooglePay className="w-11 h-11" />;
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

  const copyPhoneNumber = () => {
    if (paymentInfo.phone) {
      navigator.clipboard.writeText(paymentInfo.phone)
        .then(() => {
          alert("Phone number copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy phone number: ", err);
          alert("Failed to copy phone number");
        });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Store Payment Information</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-between mb-3">
        <h1 className="font-bold text-[18px]">Payment Information</h1>
        <button
          className="text-white font-semibold flex items-center justify-center gap-2 bg-primary p-2 w-24 rounded-md"
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
          <div className="flex items-center gap-3">
            <p className="font-medium text-15 mt-1">
              {paymentInfo.phone || "Not provided"}
            </p>
            {paymentInfo.phone && (
              <button 
                onClick={copyPhoneNumber}
                className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                title="Copy phone number"
              >
               <IoCopyOutline color="#E0A75E" size={15}/>
              </button>
            )}
          </div>
        </div>
        {/* Rest of your component remains the same */}
        <h4 className="font-semibold text-16 mb-3 mt-5">Payment Method</h4>
        <div className="p-2 bg-gray-50 rounded-lg flex items-center gap-2 w-40">
          {renderPaymentMethodIcon()}
          <p className="text-14">{formatPaymentMethodText()}</p>
        </div>
        <h4 className="font-semibold text-16 my-4">Payment Info</h4>
        <div className="flex flex-col md:flex-row  gap-x-[370px] mb-4">
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
        <div className="flex flex-col md:flex-row gap-x-[460px] mb-4">
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