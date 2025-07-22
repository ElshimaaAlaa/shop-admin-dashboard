import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import "./SectionsStyle.scss";
import { ClipLoader } from "react-spinners";
import InputField from "../Input Field/InputField";
import { useTranslation } from "react-i18next";
function FreetrialSection() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const initialValues = {
    email: "",
  };
  const handleSubmit = async (values) => {
    setLoading(true);
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  return (
    <section className="bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange pt-20 pb-20 pe-5 ps-5 text-center lg:p-20 flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl md:text-2xl lg:text-2xl">
        {t("buildBusiness")}
      </h1>
      <p className="text-center mt-5 lg:w-96 text-18">
        {t("signFree")}
        <span className="font-bold ms-2">{t("one")}</span>
      </p>
      {/* send email */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col items-center mt-10 lg:gap-3 md:gap-3 lg:flex-row md:flex-row">
          <div className="relative">
            <InputField placeholder={t("email")} name="email" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white rounded-md p-3 text-center h-14 mt-5 w-full lg:mt-0 lg:w-2/5 md:w-2/5 md:mt-0"
          >
            {loading ? (
              <ClipLoader color="#fff" size={22} />
            ) : (
              t("startFreeTrail")
            )}
          </button>
        </Form>
      </Formik>
    </section>
  );
}
export default FreetrialSection;