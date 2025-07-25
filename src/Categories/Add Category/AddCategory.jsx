import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addCategory } from "../../ApiServices/AddNewCategoryApi";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { Helmet } from "react-helmet";
import "./style.scss";
import Footer from "../../Components/Footer/Footer";
import { ImageUpload } from "../../Components/Upload Image/UploadImage";
import { TagsInput } from "../../Components/Tag Input/TagInput";
import InputField from "../../Components/InputFields/InputField";
import { useTranslation } from "react-i18next";
const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  name,
  error,
  touched,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`w-full bg-transparent outline-none border-2 rounded-lg placeholder:text-12 h-14 p-2 flex items-center justify-between cursor-pointer ${
          error && touched ? "border-red-500" : "border-gray-200"
        } focus:border-2 focus:border-primary`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="#71717A"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                value === option.value ? "bg-primary bg-opacity-10" : ""
              }`}
              onClick={() => {
                onChange(name, option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && touched && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

const TypeField = ({ field, form, ...props }) => {
  const { t } = useTranslation();
  const options = [
    { value: "1", label: "Standard" },
    { value: "2", label: "Color-Only" },
    { value: "3", label: "Size-Only" },
    { value: "4", label: "Color & Size" },
  ];

  return (
    <CustomDropdown
      options={options}
      value={field.value}
      onChange={form.setFieldValue}
      name={field.name}
      placeholder={t("type")}
      error={form.errors[field.name]}
      touched={form.touched[field.name]}
    />
  );
};

function AddCategory() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const initialValues = {
    name: "",
    description: "",
    image: null,
    type: "",
    tags: {
      en: [],
      ar: [],
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
    type: Yup.string().required("Type is required"),
    tags: Yup.object({
      ar: Yup.array().of(
        Yup.string().min(2, "Arabic tag must be at least 2 characters")
      ),
      en: Yup.array()
        .of(Yup.string().min(2, "English tag must be at least 2 characters"))
        .min(1, "At least one English tag is required"),
    }),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name[ar]", values.name);
    formData.append("name[en]", values.name);
    formData.append("description[ar]", values.description);
    formData.append("description[en]", values.description);
    formData.append("type", values.type);

    values.tags.en.forEach((tag) => {
      formData.append("tags[en][]", tag);
    });

    values.tags.ar.forEach((tag) => {
      formData.append("tags[ar][]", tag);
    });

    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const data = await addCategory(formData);
      console.log("Backend Response:", data);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to add category", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return (
    <div className="bg-gray-100 h-[89vh] relative">
      <Helmet>
        <title>
          {t("addCat")} | {t("vertex")}
        </title>
      </Helmet>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="flex flex-col">
            <h1 className=" rounded-md p-5 mx-4 bg-white mt-5 mb-3">
              <p className="text-gray-400 text-13">{t("addCatHead")}</p>
              <h3 className="text-17 font-bold mt-2">{t("addCat")}</h3>
            </h1>
            <div className="flex gap-3 mx-4">
              <section className="bg-white p-4 rounded-md w-full">
                <h2 className="font-bold mb-5 text-16">{t("basicInfo")}</h2>
                <div className="flex items-center gap-2">
                  <InputField placeholder={t("categoryName")} name="name" />
                  <Field name="type" component={TypeField} />
                </div>
                <TagsInput setFieldValue={setFieldValue} values={values} />
                <Field
                  as="textarea"
                  placeholder={t("description")}
                  name="description"
                  className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-lg p-2 h-28 mt-3 block placeholder:text-14 focus:border-primary"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </div>
                )}
              </section>
              <section className="bg-white p-4 rounded-md w-2/4 h-72">
                <h2 className="font-bold mb-3 text-16">{t("catIcon")}</h2>
                <ImageUpload
                  name={"image"}
                  previewImage={previewImage}
                  onImageChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                      setFieldValue("image", file);
                    }
                  }}
                />
                {errors.image && touched.image && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.image}
                  </div>
                )}
              </section>
            </div>
            <Footer
              saveText={t("save")}
              cancelText={t("cancel")}
              cancelOnClick={() => navigate("/Dashboard/categories")}
              saveBtnType={"submit"}
              cancelBtnType={"button"}
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5">{t("successAddCat")}</p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14  mt-4"
            onClick={() => navigate("/Dashboard/categories")}
          >
            {t("backToCat")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default AddCategory;