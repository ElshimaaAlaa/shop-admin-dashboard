import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "../../Components/InputFields/InputField";
import { FaArrowRightLong } from "react-icons/fa6";
function PaymentInfo() {
  const intialValues = {};
  const validationSchema = Yup.object({});
  const handleSubmit = async (values) => {};
  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <div className="w-full lg:w-750 md:w-700px bg-white rounded-lg shadow-lg">
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="text-center">
          <h2 className="text-15 font-bold">Enter Your Payment Info </h2>
          <p>To Complete the Process</p>
        </div>
        <Formik>
          <Form className="ps-6 pe-6">
            <h2>Contact Info</h2>
            <div className="flex gap-3">
              <InputField name={"name"} placeholder={"Name"} />
              <InputField name={"emial"} placeholder={"Email"} />
            </div>
            <div className="flex gap-3 mt-3">
              <InputField placeholder={"Phone Number"} name="phone_number" />
              <div className="w-full"></div>
            </div>
            <h2>Payment Method</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-100 rounded-md p-3 flex items-center gap-3">
                <img src="/assets/svgs/MasterCard.svg" alt="MasterCard" />
                Credit Card
              </div>
              <div className="bg-gray-100 rounded-md p-3 flex items-center gap-3">
                <img src="/assets/svgs/PayPal - Long.svg" alt="paypal" />
                Pay Pal
              </div>
              <div className="bg-gray-100 rounded-md p-3 flex items-center gap-3">
                <img src="/assets/svgs/Visa Electron.svg" alt="visa" />
                Visa
              </div>
              <div className="bg-gray-100 rounded-md p-3 flex items-center gap-3">
                <img src="/assets/svgs/Googlepay.svg" alt="google play" />
                Google Pay
              </div>
            </div>
            <div className="flex items-center gap-4 justify-end">
              <button className="bg-gray-100 text-gray-500 rounded-md p-3 font-bold w-28">
                Cancel
              </button>
              <button className="bg-primary text-white flex items-center rounded-md border p-3 gap-3 font-bold">
                Pay Now <FaArrowRightLong />
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default PaymentInfo;