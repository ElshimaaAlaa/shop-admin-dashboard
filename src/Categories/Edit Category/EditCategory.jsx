import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { updateCategory } from "../../ApiServices/updateCategory";
import Footer from "../../Layout/Footer/Footer";
import { ImageUpload } from "../../Components/Upload Image/UploadUpdatedImage";
import InputField from "../../Components/InputFields/InputField";
import "./style.scss";
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
        className={`w-full bg-transparent outline-none border-2 rounded-md h-14 p-2 flex items-center justify-between cursor-pointer ${
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
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
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
    </div>
  );
};

function EditCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(state?.image || null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const category = state || {};
  const { t } = useTranslation();

  useEffect(() => {
    console.log("Category data received:", category);
    console.log("Current type value:", category?.type);
  }, [category]);

  const initialTagsEn = category?.tags?.en || [];
  const initialTagsAr = category?.tags?.ar || [];

  const initialValues = {
    name: category?.name || "",
    description: category?.description || "",
    type: category?.type?.toString() || "",
    image: null,
    tagsEn: initialTagsEn,
    tagsAr: initialTagsAr,
    newTagEn: "",
    newTagAr: "",
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name[ar]", values.name);
      formData.append("name[en]", values.name);
      formData.append("description[ar]", values.description);
      formData.append("description[en]", values.description);
      formData.append("type", values.type);

      const allTagsEn = values.tagsEn;
      const allTagsAr = values.tagsAr;

      allTagsEn.forEach((tag, index) => {
        formData.append(`tags[en][${index}]`, tag);
      });

      allTagsAr.forEach((tag, index) => {
        formData.append(`tags[ar][${index}]`, tag);
      });

      if (values.image) {
        formData.append("image", values.image);
      }

      await updateCategory(formData, category.id);
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to update category. Please try again.");
      console.error("Failed to update category:", error);
    }
  };

  const Tag = ({ tag, onDelete }) => (
    <div className="flex items-center bg-customOrange-mediumOrange text-primary rounded-md p-4 m-1">
      <span>{tag}</span>
      <button
        type="button"
        onClick={onDelete}
        className="ml-2 rtl:mr-2 text-lg text-red-600"
        aria-label="Delete tag"
      >
        ×
      </button>
    </div>
  );

  const TypeField = ({ field, form, ...props }) => {
    const options = [
      { value: "1", label: "Standard" },
      { value: "2", label: "Color-Only" },
      { value: "3", label: "Size-Only" },
      { value: "4", label: "Color & Size" },
    ];

    console.log("TypeField current value:", field.value);

    return (
      <CustomDropdown
        options={options}
        value={field.value?.toString()}
        onChange={(name, value) => {
          form.setFieldValue(name, value);
        }}
        name={field.name}
        placeholder="Choose Type"
        error={form.errors[field.name]}
        touched={form.touched[field.name]}
      />
    );
  };

  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return (
    <div className="bg-gray-100 h-[89vh] flex flex-col relative">
      <Helmet>
        <title>
          {t("editCat")} | {t("vertex")}
        </title>
        <meta name="description" content="Edit category details in VERTEX" />
      </Helmet>
      <section className="rounded-md p-5 mx-5 bg-white mt-5 mb-3">
        <p className="text-gray-400 text-13">{t("editCatHead")}</p>
        <h1 className="font-bold text-17 mt-2">{t("editCat")}</h1>
      </section>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-4 mx-5">
              <div className="bg-white p-4 rounded-md w-full">
                <h2 className="font-bold mb-3 text-16">{t("basicInfo")}</h2>
                <div className="flex flex-col md:flex-row items-center gap-2 mb-3">
                  <InputField
                    name="name"
                    placeholder="Category Name"
                    aria-label="Category name"
                  />
                  <Field name="type" component={TypeField} />
                </div>
                <div className="mb-3 p-2 flex w-full h-14 bg-transparent outline-none border-2 border-gray-200 rounded-md placeholder:text-14 focus:border-primary">
                  <div className="flex">
                    {values.tagsEn.map((tag, index) => (
                      <Tag
                        key={`en-${index}`}
                        tag={tag}
                        onDelete={() => {
                          const updatedTags = values.tagsEn.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("tagsEn", updatedTags);
                        }}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    name="newTagEn"
                    placeholder={t("enTag")}
                    value={values.newTagEn}
                    onChange={(e) => setFieldValue("newTagEn", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && values.newTagEn.trim()) {
                        e.preventDefault();
                        setFieldValue("tagsEn", [
                          ...values.tagsEn,
                          values.newTagEn.trim(),
                        ]);
                        setFieldValue("newTagEn", "");
                      }
                    }}
                    className="bg-transparent outline-none placeholder:text-14"
                  />
                </div>
                <div className="p-2 h-14 flex w-full bg-transparent outline-none border-2 border-gray-200 rounded-md placeholder:text-14 focus:border-primary">
                  <div className="flex">
                    {values.tagsAr.map((tag, index) => (
                      <Tag
                        key={`ar-${index}`}
                        tag={tag}
                        onDelete={() => {
                          const updatedTags = values.tagsAr.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("tagsAr", updatedTags);
                        }}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    name="newTagAr"
                    placeholder={t("arTag")}
                    value={values.newTagAr}
                    onChange={(e) => setFieldValue("newTagAr", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && values.newTagAr.trim()) {
                        e.preventDefault();
                        setFieldValue("tagsAr", [
                          ...values.tagsAr,
                          values.newTagAr.trim(),
                        ]);
                        setFieldValue("newTagAr", "");
                      }
                    }}
                    className="bg-transparent outline-none placeholder:text-14"
                  />
                </div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md p-2 h-24 mt-3 placeholder:text-14 focus:border-primary"
                  aria-label="Category description"
                />
              </div>
              <div className="bg-white p-4 rounded-md w-full md:w-1/2 h-80">
                <h2 className="font-bold mb-3 text-16">{t("catIcon")}</h2>
                <ImageUpload
                  previewImage={previewImage}
                  onImageChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (file) {
                      setFieldValue("image", file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-5">{error}</div>
            )}
            <Footer
              saveText={t("saveChanges")}
              cancelText={t("cancel")}
              cancelOnClick={() => navigate("/Dashboard/categories")}
              saveBtnType={"submit"}
              cancelBtnType={"button"}
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col justify-center w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">{t("successUpdateCat")}</p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4"
            onClick={() => navigate("/Dashboard/categories")}
            aria-label="Back to categories"
          >
            {t("backToCat")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditCategory;