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
import InputField from "../../Components/Input Field/InputField";

const TypeField = () => (
  <Field
    placeholder="Type"
    as="select"
    name="type"
    className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md h-51px p-2 block focus:border-2 focus:border-primary"
  >
    <option className="option text-14">Type</option>
    <option value="1" className="option">
      Standard
    </option>
    <option value="2" className="option">
      Color-Only
    </option>
    <option value="3" className="option">
      Size-Only
    </option>
    <option value="4" className="option">
      Color & Size
    </option>
  </Field>
);

function AddCategory() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
    type: Yup.string().required("Type is required"),
    tags: Yup.object({
      ar: Yup.array().of(
        Yup.string().min(2, "Arabic tag must be at least 2 characters")
      ),
      en: Yup.array()
        .of(Yup.string().min(2, "English tag must be at least 2 characters"))
        .min(1, "At least one French tag is required"),
    }),
  });

  const handleSubmit = async (values) => {
    console.log("Formik values:", values);
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
      alert(
        error.response?.data?.message ||
          "Failed to add category. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  // if (showModal) {
  //   document.body.classList.add("no-scroll");
  // } else {
  //   document.body.classList.remove("no-scroll");
  // }
  return (
    <div className="bg-gray-100 h-150vh relative">
      <Helmet>
        <title>Add Category | Vertex Dashboard</title>
      </Helmet>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col">
            <h1 className="font-bold rounded-md p-5 text-lg mx-10 bg-white mt-5 mb-5">
              Add Category
            </h1>
            <div className="flex gap-5 mx-10">
              <div className="bg-white p-5 rounded-md w-full">
                <h2 className="font-bold mb-5">Basic Information</h2>
                <div className="flex items-center gap-4">
                  <InputField placeholder="Category Name" name="name" />
                  <TypeField />
                </div>
                <TagsInput setFieldValue={setFieldValue} values={values} />
                <Field
                  as="textarea"
                  placeholder="Description"
                  name="description"
                  className="w-full bg-transparent outline-none border-2 border-gray-200 rounded-md p-2 h-24 mt-3 block placeholder:text-14 focus:border-primary"
                />
              </div>
              <div className="bg-white p-4 rounded-md w-2/4 h-72">
                <h2 className="font-bold mb-3">Category Icon / Image</h2>
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
              </div>
            </div>
            <Footer
              saveText={"Save"}
              cancelText={"Cancel"}
              cancelOnClick={() => navigate("/Home/categories")}
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
          <p className="font-bold mt-5">Category added successfully!</p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 w-48 mt-4"
            onClick={() => navigate("/Home/categories")}
          >
            Back to Categories
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default AddCategory;
