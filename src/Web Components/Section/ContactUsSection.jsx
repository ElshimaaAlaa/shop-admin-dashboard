import { Form, Formik, Field } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import "./SectionsStyle.scss";
import { ClipLoader } from "react-spinners";
import { LuSend } from "react-icons/lu";
import InputField from "../../Web Components/Input Field/InputField";
import PhoneNum from "../../Svgs/PhoneNum";
import EmailAddress from "../../Svgs/EmailAddress";
import Location from "../../Svgs/Location";
import { sendSupport } from "../../ApiServices/Support";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { getGeneralSettings } from "../../ApiServices/GeneralSettings";

function ContactUsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showModal]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name should be at least 3 characters long")
      .max(50, "Name should not exceed 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
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
    setError(null);

    try {
      await sendSupport(
        values.name,
        values.email,
        values.phone,
        values.message
      );
      resetForm();
      setShowModal(true);
    } catch (error) {
      setError("Failed to send the message. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //fetch general settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await getGeneralSettings();
        setdata(settingsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="ps-3 pe-3 mt-40 flex flex-col lg:gap-20 lg:px-20 lg:flex-row  md:flex-row lg:items-center md:items-center lg:mt-0 md:mt-0 pb-20 pt-20 bg-customOrange-mediumOrange relative ">
      {/* contact info */}
      <div className=" absolute -top-28 ">
        <img
          src="/assets/images/Contact-1--Streamline-Brooklyn.svg.png"
          alt="contact-us"
          className="w-52"
        />
      </div>
      <div className="w-full">
        <p className="text-primary text-16">Contact us</p>
        <h1 className="font-bold text-xl mt-5">Get In Touch With Us </h1>
        <p className="text-gray-600 text-14 mt-3 mb-5 lg:w-450 w-full md:w-390">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
        <p className="flex items-center gap-3 text-15">
          <PhoneNum />
          {data.phone || "not provided"}
        </p>
        <a
          href="/"
          target="_blank"
          className="flex gap-3 items-center mt-3 text-15"
        >
          <EmailAddress />
          {data.email || "not provided"}
        </a>
        <p className="flex items-center gap-3 mt-3 text-15">
          <Location />
          {data.address || "Saudi arabia , alreyad"}
        </p>
      </div>
      {/* contact form */}
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col items-start justify-center lg:items-start md:items-start md:mt-10 w-600px">
              <div className="relative mt-5 md:mt-0 lg:mt-0">
                <InputField placeholder="Name" name="name" />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>
              <div className="relative mt-2">
                <InputField placeholder="Email" name="email" />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div className="relative mt-2">
                <InputField placeholder="Phone Number" name="phone" />
                {errors.phone && touched.phone && (
                  <div className="text-red-500 text-sm">{errors.phone}</div>
                )}
              </div>
              <div className="relative mt-2">
                <Field
                  as="textarea"
                  placeholder="Your Message"
                  name="message"
                  className={`w-80 h-28 lg:w-400 md:w-400 sm:w-390 s:w-390 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14
                    ${
                      errors.message && touched.message
                        ? "border-red-500"
                        : touched.message && !errors.message
                        ? "border-[#28A513]"
                        : "border-gray-200"
                    }
                    ${
                      touched.message
                        ? "focus:border-2"
                        : "focus:border-primary"
                    }
                  `}
                />
                {errors.message && touched.message && (
                  <div className="text-red-500 text-sm">{errors.message}</div>
                )}
              </div>
              <div className="flex justify-end mt-2 w-400">
                <button
                  type="submit"
                  className="text-16 bg-primary font-bold flex justify-center items-center text-center h-14 w-52 gap-2 text-white rounded-md"
                >
                  {isLoading ? (
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
          )}
        </Formik>
      </div>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5">Message sent successfully!</p>
          <button
            className="bg-primary text-white p-2 w-40 mt-4 rounded-md"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Done!
          </button>
        </div>
      </SuccessModal>
    </section>
  );
}
export default ContactUsSection;
