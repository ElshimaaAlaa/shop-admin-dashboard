import { useState } from "react";
import "./style.scss";
import { Formik, Form } from "formik";
import { ClipLoader } from "react-spinners";
import { AddShipping } from "../../ApiServices/AddShipping";

function AddShippingProvider({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [error, setError] = useState(null);

  const providers = [
    //fetched from end point when back end complete it
    { id: 1, name_ar: "أرامكس", name_en: "Aramex", code: "aramex" },
    { id: 2, name_ar: "دي إتش إل", name_en: "DHL", code: "dhl" },
    { id: 3, name_ar: "فيديكس", name_en: "FedEx", code: "fedex" },
    { id: 4, name_ar: "شحن محلي", name_en: "Local Shipping", code: "local" },
  ];

  const handleProviderToggle = (provider) => {
    setSelectedProviders((prev) => {
      if (prev.some((p) => p.id === provider.id)) {
        return prev.filter((p) => p.id !== provider.id);
      } else {
        return [...prev, provider];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedProviders.length === 0) {
      setError("Please select at least one shipping provider");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      await Promise.all(
        selectedProviders.map((provider) =>
          AddShipping({
            name: {
              ar: provider.name_ar,
              en: provider.name_en,
            },
            code: provider.code,
          })
        )
      );
      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to add shipping provider(s)"
      );
      console.error("Error adding shipping provider:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay rounded">
      <div
        className="modalContent modal-width rounded-md w-400"
        id="modal-width"
      >
        <div className="modal-content">
          <h3 className="font-bold text-16 px-3 py-5">
            Add New Shipping Provider
          </h3>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <Formik initialValues={{}} onSubmit={handleSubmit}>
            <Form className="ps-3">
              <div className="space-y-4 mb-4">
                {providers.map((provider) => {
                  const isSelected = selectedProviders.some(
                    (p) => p.id === provider.id
                  );
                  return (
                    <label
                      key={provider.id}
                      className={`flex items-center cursor-pointer w-full p-3 rounded-lg transition-all duration-200 ${
                        isSelected
                          ? "bg-customOrange-mediumOrange border-2 border-primary"
                          : "bg-gray-50  border border-transparent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => handleProviderToggle(provider)}
                      />
                      <span
                        className={`w-5 h-5 border-2 border-gray-200 rounded flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-black"
                        }`}
                      >
                        <svg
                          className={`w-3 h-3 text-white transition-all duration-200 ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      </span>
                      <span className="text-16 text-black ms-3">
                        {provider.name_en} ({provider.name_ar})
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-100 text-gray-500 font-bold p-3 w-32 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary font-bold text-white p-3 w-32 rounded-md"
                  disabled={isLoading || selectedProviders.length === 0}
                >
                  {isLoading ? <ClipLoader size={22} color="#fff" /> : "Save"}
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