import React, { useState } from "react";
import "./style.scss";
import { Formik, Form } from "formik";
import { ClipLoader } from "react-spinners";
function AddShippingProvider({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;
  return (
    <div className="modal-overlay rounded">
      <div className="modalContent modal-width rounded" id="modal-width">
        <div className="modal-content flex flex-col justify-center items-center">
          <h3>Add New Shipping Provider</h3>
          <Formik>
            <Form>
              <div>
                <button>
                  {isLoading ? <ClipLoader color="#E0A75E" /> : "Save"}
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