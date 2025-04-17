import React, { useState } from "react";
import "./style.scss";
import { Formik, Form, Field } from "formik";
import { ClipLoader } from "react-spinners";
function AddShippingProvider({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;
  return (
    <div className="modal-overlay rounded">
      <div className="modalContent modal-width rounded" id="modal-width">
        <div className="modal-content">
          <h3 className="font-bold text-16">Add New Shipping Provider</h3>
          <Formik>
            <Form>
              <Field>
                
              </Field>
              <div className="flex justify-end">
                <button className="bg-primary text-white p-2 w-28 rounded-md">
                  {isLoading ? <ClipLoader color="#fff" /> : "Save"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default AddShippingProvider;