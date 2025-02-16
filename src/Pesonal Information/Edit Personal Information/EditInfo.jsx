import { Form, Formik, Field } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import Name from "../../Svgs/Name";
import Email from "../../Svgs/Email";
import Phone from "../../Svgs/Phone";
import { useLocation } from "react-router-dom";
function EditInfo() {
  const { state } = useLocation();
  const personalInfo = state || {};
  const intialValues = {
    name: personalInfo?.name || "",
    email: personalInfo?.email || "",
    phone: personalInfo?.phone || "",
    image: null,
  };
  const handleSubmit = async (values)=>{
    
  }
  return (
    <div>
      <Helmet>
        <title>Edit Personal Information</title>
      </Helmet>
      <section>
        <h1 className="font-bold text-2xl">Edit Personal Information</h1>

        <Formik initialValues={intialValues} enableReinitialize>
          {({ setFieldValue }) => (
            <Form className="">
              {/* image */}
              <div className="flex items-center gap-5 my-10 border rounded-md p-5">
                <img
                  src={"/assets/images/unsplash_et_78QkMMQs.png"} // image not displayed
                  alt="user-profile"
                  className="rounded-xl"
                />
                <div>
                  <h2 className="font-semibold">{}</h2>
                  <p className="text-gray-400 mt-3">Vertex CEO</p>
                  {/* not returned in data*/}
                </div>
              </div>
              <div className="border p-5 rounded-md bg-gray-100">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <Field
                      placeholder="Name"
                      className="pl-10 w-full p-3 border border-gray-400 rounded-lg outline-none"
                      name="name"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <Name />
                    </span>
                  </div>
                  <div className="relative">
                    <Field
                      placeholder="Email"
                      className="pl-10 w-full p-3 border border-gray-400 rounded-lg outline-none"
                      name="email"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <Email />
                    </span>
                  </div>
                </div>
                <div className="relative mt-4">
                  <Field
                    placeholder="Phone"
                    className="pl-10 w-full p-3 border border-gray-400 rounded-lg outline-none"
                    name="phone"
                  />
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <Phone />
                  </span>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
export default EditInfo;
