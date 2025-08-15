import { useState } from "react";
import * as Yup from "yup";
import { LuSend } from "react-icons/lu";
import MainBtn from "../../Components/Main Button/MainBtn";
import InputField from "../../Components/InputFields/InputField";
import { Formik, Form, Field } from "formik";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import { sendContact } from "../../ApiServices/SendSupport";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
function SendSupport({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("nameRequired")),
    email: Yup.string().email(t("invaildEmail")).required(t("emailRequired")),
    phone: Yup.string().required(t("phoneRequired")),
    message: Yup.string().required(t("messageRequired")),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setError(null);
    try {
      await sendContact(
        values.name,
        values.email,
        values.phone,
        values.message
      );
      onSuccess();
      resetForm();
    } catch (error) {
      setError("Failed to send the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-2">
            <InputField name="name" placeholder={t("name")} />
            <AuthInputField
              name="email"
              placeholder={t("email")}
              dir={isRTL ? "rtl" : "ltr"}
            />
            <InputField
              name="phone"
              placeholder={t("phone")}
              dir={isRTL ? "rtl" : "ltr"}
            />
            <Field
              as="textarea"
              placeholder={t("message")}
              name="message"
              className={`w-full bg-white outline-none border-2 rounded-lg p-2 h-28 block placeholder:text-13 
                      ${
                        errors.message && touched.message
                          ? "border-red-500 focus:border-red-500"
                          : touched.message
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-200 focus:border-primary"
                      }`}
            />
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <MainBtn
              btnType={"submit"}
              text={
                isLoading ? (
                  <ClipLoader color="#fff" size={22} />
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <LuSend />
                    {t("sendMessage")}
                  </div>
                )
              }
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default SendSupport;
