import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "./SectionsStyle.scss";
import { ClipLoader } from "react-spinners";
import { LuSend } from "react-icons/lu";
import InputField from '../../Web Components/Input Field/InputField'
import PhoneNum from "../../Svgs/PhoneNum";
import EmailAddress from "../../Svgs/EmailAddress";
import Location from "../../Svgs/Location";
function ContactUsSection() {
  const [loading, setLoading] = useState(false);
  const intialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  const handleSubmit = async (values) => {
    setLoading(true);
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid phone number"
      )
      .required("Phone number is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters long")
      .required("Message is required"),
  });
  return (
    <section className="ps-3 pe-3 mt-40 flex flex-col lg:pe-20 lg:ps-20 lg:flex-row lg:justify-between md:flex-row md:items-center lg:mt-0 md:mt-0 pb-20 pt-20 bg-customOrange-mediumOrange relative ">
      {/* contact info */}
      <div className=" absolute -top-28 ">
        <img
          src="/assets/images/Contact-1--Streamline-Brooklyn.svg.png"
          alt="contact-us"
          className="w-52"
        />
      </div>
      <div>
        <p className="text-primary text-16">Contact us</p>
        <h1 className="font-bold text-2xl mt-5">Get In Touch With Us </h1>
        <p className="text-gray-600 text-14 mt-5 mb-5 lg:w-450 w-full md:w-390">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
        <p className="flex items-center gap-3 text-16">
          <PhoneNum />
          +9876543234344
        </p>
        <a
          href="/"
          target="_blank"
          className="flex gap-3 items-center mt-3 text-16"
        >
          <EmailAddress />
          Vertex@gmail.com
        </a>
        <p className="flex items-center gap-3 mt-3 text-16">
          <Location />
          Saudi arabia , alreyad
        </p>
      </div>
      {/* contact form */}
      <div>
        <Formik
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col items-start justify-center lg:items-start md:items-start md:mt-10">
            <div className="relative mt-5 md:mt-0 lg:mt-0">
              <InputField placeholder="Name" name="name" />
            </div>
            <div className="relative mt-3">
              <InputField placeholder="Email" name="email" />
            </div>
            <div className="relative mt-3">
              <InputField placeholder="Phone Number" name="phone" />
            </div>
            <div className="relative mt-3">
              <InputField placeholder="Your Message" name="message" />
            </div>
            <div className="flex mt-5">
              <button className="text-16 bg-primary flex justify-center items-center text-center h-14 w-52 lg:w-52 md:w-52 gap-2 text-white rounded-md">
                {loading ? (
                  <ClipLoader color="#fff" size={22} />
                ) : (
                  <>
                    <LuSend />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
export default ContactUsSection;