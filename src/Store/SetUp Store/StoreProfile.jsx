import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeftLong } from 'react-icons/fa6';

const StoreProfile = ({ initialData = {}, onBack }) => {
  return (
    <div className="profile-form">
      <h2>Store Profile</h2>
      
      <Formik
        initialValues={{
          bio: "",
          phone: "",
          email: "",
          ...initialData
        }}
        onSubmit={(values) => {
          console.log('[Profile] Form submitted:', values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Bio</label>
              <Field name="bio" as="textarea" rows={4} className="form-control" />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <Field name="phone" type="tel" className="form-control" />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => {
                  console.log('[Profile] Back button clicked');
                  onBack();
                }}
                className="back-button"
              >
                <FaArrowLeftLong /> Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                Save Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoreProfile;