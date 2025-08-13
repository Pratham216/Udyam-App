import React, { useState, useEffect } from 'react';
import FormStep1 from './components/FormStep1.jsx';
import FormStep2 from './components/FormStep2.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import './index.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [schema, setSchema] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  useEffect(() => {
    fetch('/form_schema.json')
      .then(res => res.json())
      .then(data => {
        setSchema(data);
      })
      .catch(err => {
        console.error("Failed to load form schema:", err);
        setServerMessage({ type: 'error', text: 'Could not load form configuration.' });
      });
  }, []);

  const validateStep = (step) => {
    if (!schema) return false;
    const stepSchema = schema[`step${step}`];
    let stepErrors = {};

    stepSchema.fields.forEach(field => {
      const value = formData[field.id] || '';
      if (field.required && !value) {
        stepErrors[field.id] = `${field.label} is required.`;
      } else if (field.validation && value && !new RegExp(field.validation.regex).test(value)) {
        stepErrors[field.id] = field.validation.message;
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'txtPanNo') {
      value = value.toUpperCase();
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    setServerMessage(null);

    const submissionData = {
        aadhaarNumber: formData.txtAadhaarNo,
        nameAsPerAadhaar: formData.txtNameAsPerAadhaar,
        orgType: formData.ddlOrgType,
        panNumber: formData.txtPanNo
    };

    try {
        const response = await fetch('https://udyam-app.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }
        
        setServerMessage({ type: 'success', text: result.message });

    } catch (error) {
        setServerMessage({ type: 'error', text: error.message });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 pt-8 font-sans">
      <div className="w-full max-w-3xl mx-auto">
        <header className="flex items-center justify-center mb-6 text-center">
            <img 
                src="https://udyamregistration.gov.in/images/emblem-dark.png" 
                alt="Govt of India Emblem" 
                className="h-16 mr-4"
                onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Udyam Registration</h1>
                <p className="text-sm text-gray-600">Ministry of Micro, Small & Medium Enterprises</p>
            </div>
        </header>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
            <ProgressTracker currentStep={currentStep} />
            <form onSubmit={handleSubmit} noValidate>
              <div className="mt-8 min-h-[200px]">
                {currentStep === 1 && schema && (
                  <FormStep1 schema={schema.step1} formData={formData} handleChange={handleChange} errors={errors} />
                )}
                {currentStep === 2 && schema && (
                  <FormStep2 schema={schema.step2} formData={formData} handleChange={handleChange} errors={errors} />
                )}
                {!schema && !serverMessage && <p className="text-center text-gray-500">Loading form configuration...</p>}
              </div>
              
              <div className="mt-8 pt-6 border-t flex justify-between items-center">
                 {currentStep === 1 ? (
                    <div></div>
                 ) : (
                    <button type="button" onClick={handleBack} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors">
                        Back
                    </button>
                 )}
                 
                 {currentStep === 1 && (
                    <button type="button" onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                        Validate & Generate OTP
                    </button>
                 )}

                 {currentStep === 2 && (
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors">
                        {isSubmitting ? 'Submitting...' : 'Validate PAN'}
                    </button>
                 )}
              </div>
              
              {serverMessage && (
                <div className={`mt-4 text-center p-3 rounded-md ${serverMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {serverMessage.text}
                </div>
              )}
            </form>
        </div>
      </div>
    </div>
  );
}
export default App;
