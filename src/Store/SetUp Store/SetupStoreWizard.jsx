import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeStore from "./ThemeStore";
import StoreProfile from "./StoreProfile";
import PricingPlan from "./PricingPlan";
import PaymentInfo from "./PaymentInfo";
import { setUpStore } from "../../ApiServices/setUpStore";

export default function SetupStoreWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    theme_primary_color: "#3B82F6",
    theme_secondary_color: "#10B981",
    image: null,
    store_name: "",
    address: "",
    bio: "",
    lat: "",
    lng: "",
    banners: [],
    plan_id: "",
    shipping_provider: "aramex",
    payment_method: "visa",
    card_holder_name: "",
    card_number: "",
    card_exp_date: "",
    card_cvv: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.image) newErrors.image = "Logo is required";
      if (!formData.theme_primary_color) newErrors.theme_primary_color = "Primary color is required";
      if (!formData.theme_secondary_color) newErrors.theme_secondary_color = "Secondary color is required";
    }
    
    if (step === 2) {
      if (!formData.store_name) newErrors.store_name = "Store name is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.bio) newErrors.bio = "Bio is required";
    }
    
    if (step === 3 && !formData.plan_id) {
      newErrors.plan_id = "Please select a pricing plan";
    }
    
    if (step === 4) {
      if (!formData.card_holder_name) newErrors.card_holder_name = "Card holder name is required";
      if (!formData.card_number) newErrors.card_number = "Card number is required";
      if (!formData.card_exp_date) newErrors.card_exp_date = "Expiration date is required";
      if (!formData.card_cvv) newErrors.card_cvv = "CVV is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        
        if (key === 'banners' && Array.isArray(value)) {
          value.forEach(file => formDataToSend.append('banners[]', file));
        } else if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (typeof value === 'object') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      await setUpStore(formDataToSend);
      navigate("/dashboard", { state: { success: true } });
    } catch (error) {
      console.error("Setup failed:", error);
      alert(`Failed to setup store: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    const commonProps = {
      formData,
      updateFormData,
      isSubmitting,
      errors,
      setErrors
    };

    switch (step) {
      case 1:
        return <ThemeStore {...commonProps} onNext={nextStep} />;
      case 2:
        return <StoreProfile {...commonProps} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <PricingPlan {...commonProps} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <PaymentInfo {...commonProps} onSubmit={handleSubmit} onBack={prevStep} />;
      default:
        return <ThemeStore {...commonProps} onNext={nextStep} />;
    }
  };

  return (
    <div className="store-setup-wizard">
      {renderStep()}
    </div>
  );
}