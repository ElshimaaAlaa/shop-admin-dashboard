import StepIndicator from "./StepIndicator";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/InputFields/InputField";

export default function StoreProfile({ onNext, onBack, formData, updateFormData }) {
  const initialValues = {
    store_name: formData.store_name || "",
    address: formData.address || "",
    bio: formData.bio || "",
  };

  const validationSchema = Yup.object({
    store_name: Yup.string().required("Store Name is required"),
    address: Yup.string().required("Address is required"),
    bio: Yup.string(),
  });

  const handleSubmit = (values) => {
    updateFormData('store_name', values.store_name);
    updateFormData('address', values.address);
    updateFormData('bio', values.bio);
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <div className="w-full lg:w-750 md:w-600px bg-white rounded-lg shadow-lg">
        {/* Header and Step Indicator */}
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center mb-6 ps-6">
          <div className="bg-white border-[6px] border-primary text-dark font-bold rounded-full h-10 w-10 p-5 flex items-center justify-center text-xs mr-2">
            2/4
          </div>
          <p className="text-15 font-bold">
            Let's Get Started To Set Up Your Own Store.
          </p>
        </div>
        <StepIndicator currentStep={2} />
        
        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form className="ps-6 pe-6">
              <h1 className="font-bold">Fill The Store Profile</h1>
              <div className="flex gap-2 mt-3">
                <InputField name="store_name" placeholder="Store Name" />
                <InputField name="address" placeholder="Location" />
              </div>
              <Field
                name="bio"
                as="textarea"
                placeholder="Bio"
                className="w-full mt-3 h-20 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary"
              />

              {/* Banners Upload */}
              <div className="px-0 mt-2">
                <div className="border border-dashed border-primary rounded-md p-4 mb-6">
                  <div className="flex items-center gap-5">
                    <p className="text-12 font-bold text-gray-600 flex items-center gap-2">
                      <img
                        src="/assets/svgs/upload-file_svgrepo.com.svg"
                        alt="upload file"
                        className="w-5"
                      />
                      Drag & Drop banner here <span className="ms-3">OR</span>
                    </p>
                    <label className="text-sm text-primary font-bold cursor-pointer">
                      Browse Files
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".svg,.png,.jpg,.jpeg"
                        multiple
                        onChange={(e) => {
                          updateFormData('banners', [...formData.banners, ...Array.from(e.target.files)]);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4 my-5 mx-0">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center gap-3 text-dark px-6"
                >
                  <FaArrowLeftLong size={15} /> Back
                </button>
                <div className="flex space-x-1 mr-4">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="flex items-center gap-3 bg-primary text-white px-6 py-2 rounded-md disabled:bg-gray-300"
                >
                  Next <FaArrowRightLong />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}