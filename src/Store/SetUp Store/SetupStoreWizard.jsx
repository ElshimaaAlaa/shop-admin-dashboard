import React, { useState } from 'react';
import StoreTheme from './StoreTheme';
import StoreProfile from './StoreProfile';
import './StoreSetupWizard.css';

const StoreSetupWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [storeData, setStoreData] = useState({
    theme: {},
    profile: {}
  });

  // Debugging logs
  console.log('[Parent] Current step:', currentStep);
  console.log('[Parent] Store data:', storeData);

  const handleThemeComplete = (themeData) => {
    console.log('[Parent] Received theme data:', themeData);
    setStoreData(prev => ({
      ...prev,
      theme: { ...prev.theme, ...themeData }
    }));
    console.log('[Parent] Navigating to step 2');
    setCurrentStep(2); // Explicit navigation
  };

  const handleBackToTheme = () => {
    console.log('[Parent] Navigating back to step 1');
    setCurrentStep(1);
  };

  return (
    <div className="wizard-container">
      <div className="step-indicator">
        Step {currentStep} of 2
      </div>

      {currentStep === 1 ? (
        <StoreTheme 
          key="theme-step" // Force re-render
          initialData={storeData.theme}
          onComplete={handleThemeComplete}
        />
      ) : (
        <StoreProfile 
          key="profile-step" // Force re-render
          initialData={storeData.profile}
          onBack={handleBackToTheme}
        />
      )}
    </div>
  );
};

export default StoreSetupWizard;