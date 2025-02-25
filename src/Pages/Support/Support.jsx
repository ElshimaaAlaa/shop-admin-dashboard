import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import InputField from "../../Components/Input Field/InputField";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";

function Support() {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name should be at least 3 characters long")
      .max(50, "Name should not exceed 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string()
      .min(10, "Phone number should be at least 10 digits long")
      .max(15, "Phone number should not exceed 15 digits")
      .required("Phone number is required"),
    message: Yup.string()
      .min(10, "Message should be at least 10 characters long")
      .max(500, "Message should not exceed 500 characters")
      .required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
    } catch (error) {
    } finally {
    }
  };
  const ContactCard = ({ icon, title, value, link }) => (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md mb-6">
      <div className="flex items-center gap-4">
        <img src={icon} alt={title} className="w-11 h-11" />
        <div>
          <h3 className="font-bold">{title}</h3>
          <a href={link} className="text-gray-400 mt-3">
            {value}
          </a>
        </div>
      </div>
      <img src="/assets/svgs/arrow_forward.svg" alt="arrow" />
    </div>
  );
  return (
    <div className="bg-white h-full">
      <Helmet>
        <title>Support | Vertex</title>
        <meta name="description" content="Support Page" />
        <meta property="og:title" content="Support | Vertex" />
        <meta property="og:description" content="Support Page" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo (2).png" />
        <meta property="og:url" content="https://vertex.com/support" />
        <meta property="og:site_name" content="Vertex" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support | Vertex" />
        <meta name="twitter:description" content="Support Page" />
        <meta name="twitter:image" content="/assets/images/logo (2).png" />
      </Helmet>
      <h1 className="font-bold text-center text-xl pt-10">
        Send us Your Problem and we are <br /> contact with you
      </h1>
      <div className="flex justify-center gap-5">
        <section className="bg-white rounded-md drop-shadow-lg p-5 w-400 h-72 mt-10">
          <h2 className="font-bold text-lg mb-3 mt-2">Contact information</h2>
          <ContactCard
            icon="/assets/images/Frame 1984077276.png"
            title="Call us"
            value="+ 9876543234344"
          />
          <ContactCard
            icon="/assets/images/Frame 1984077339.png"
            title="Email"
            value="Vertex@gmail.com"
            link="mailto:Vertex@gmail.com"
          />
        </section>
        <section className="bg-customOrange-mediumOrange p-7 mt-10 w-500px rounded-md">
          <div className="flex justify-center">
            <img src="/assets/svgs/chats.svg" alt="messages" className="w-16 mb-2" />
          </div>
          <h2 className="font-bold text-lg text-center mb-1">
            Send your problem
          </h2>
          <p className="text-gray-400 text-15 text-center mb-2">
            We are here to help you
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col gap-3">
              <InputField name="name" placeholder="Name" />
              <InputField name="email" placeholder="Email" />
              <InputField name="phone_number" placeholder="Phone Number" />
              <Field
                as="textarea"
                placeholder="Your Message"
                name="message"
                className="w-full outline-none border-2 border-gray-200 rounded-md p-2 h-32 placeholder:text-14 focus:border-primary"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />
              <div>
                <button
                  aria-label="Send message"
                  className="bg-primary w-full text-white flex items-center justify-center gap-3 p-3 rounded-md text-lg font-semibold"
                  type="submit"
                >
                  <img
                    src="/assets/svgs/send message.svg"
                    alt="send-message"
                    className="w-5 h-5"
                  />
                  {isLoading ? (
                    <ClipLoader color="#E0A75E" size={22} />
                  ) : (
                    " Send Message"
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </section>
      </div>
    </div>
  );
}
export default Support;