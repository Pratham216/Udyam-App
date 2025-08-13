import React, { useState, useEffect } from 'react';

// We are putting all components in one file to ensure there are no import/export issues.

//+++++++++++++ ProgressTracker Component +++++++++++++
const ProgressTracker = ({ currentStep }) => {
  const steps = ['Aadhaar Validation', 'PAN Validation'];
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-start">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center w-28">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 z-10 ${
              currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          >
            1
          </div>
          <p className={`mt-2 text-xs font-semibold ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>{steps[0]}</p>
        </div>

        {/* Connector */}
        <div className="flex-1 h-1 bg-gray-300 mt-5 relative">
          <div
            className="h-1 bg-blue-600 absolute top-0 left-0 transition-all duration-500"
            style={{ width: currentStep > 1 ? '100%' : '0%' }}
          ></div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center w-28">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 z-10 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          >
            2
          </div>
          <p className={`mt-2 text-xs font-semibold ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>{steps[1]}</p>
        </div>
      </div>
    </div>
  );
};


//+++++++++++++ FormStep1 Component +++++++++++++
const FormStep1 = ({ schema, formData, handleChange, errors }) => {
  if (!schema) return <p>Loading schema...</p>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-xl font-bold text-gray-800 text-center border-b pb-4">{schema.title}</h2>
      {schema.fields.map(field => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} <span className="text-red-500">*</span>
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[field.id] ? 'border-red-500 ring-red-500' : 'border-gray-300'
            }`}
          />
          {errors[field.id] && <p className="mt-1 text-xs text-red-600">{errors[field.id]}</p>}
        </div>
      ))}
    </div>
  );
};


//+++++++++++++ FormStep2 Component +++++++++++++
const FormStep2 = ({ schema, formData, handleChange, errors }) => {
    if (!schema) return <p>Loading schema...</p>;

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 text-center border-b pb-4">{schema.title}</h2>
            {schema.fields.map(field => (
                <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} <span className="text-red-500">*</span>
                    </label>
                    {field.type === 'select' ? (
                        <select
                            id={field.id}
                            name={field.id}
                            value={formData[field.id] || ''}
                            onChange={handleChange}
                             className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors[field.id] ? 'border-red-500 ring-red-500' : 'border-gray-300'
                            }`}
                        >
                            {field.options.map(option => (
                                <option key={option} value={option === field.options[0] ? '' : option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={formData[field.id] || ''}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors[field.id] ? 'border-red-500 ring-red-500' : 'border-gray-300'
                            }`}
                        />
                    )}
                    {errors[field.id] && <p className="mt-1 text-xs text-red-600">{errors[field.id]}</p>}
                </div>
            ))}
        </div>
    );
};


//+++++++++++++ Main App Component +++++++++++++
function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [schema, setSchema] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  useEffect(() => {
    // In a real Vite app, you'd fetch this. For this example, we'll define it here.
    const formSchemaData = {
        "step1": { "title": "Aadhaar Verification", "fields": [ { "id": "txtAadhaarNo", "name": "txtAadhaarNo", "label": "Aadhaar Number", "type": "text", "placeholder": "Enter 12 digit Aadhaar Number", "required": true, "validation": { "regex": "^[2-9]{1}[0-9]{11}$", "message": "Aadhaar must be a 12-digit number." } }, { "id": "txtNameAsPerAadhaar", "name": "txtNameAsPerAadhaar", "label": "Name as per Aadhaar", "type": "text", "placeholder": "Enter Name as per Aadhaar", "required": true, "validation": { "regex": "^[a-zA-Z\\s.]+$", "message": "Name should only contain alphabets and spaces." } } ] },
        "step2": { "title": "PAN Verification", "fields": [ { "id": "ddlOrgType", "name": "ddlOrgType", "label": "Type of Organisation", "type": "select", "options": ["Select Type of Organisation", "Proprietory", "Partnership", "Hindu Undivided Family", "Private Limited Company", "Public Limited Company", "Self Help Group", "Limited Liability Partnership", "Society/Co-operative", "Trust", "Others"], "required": true }, { "id": "txtPanNo", "name": "txtPanNo", "label": "PAN", "type": "text", "placeholder": "Enter PAN Number", "required": true, "validation": { "regex": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", "message": "Invalid PAN format." } } ] }
    };
    setSchema(formSchemaData);
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

  // THIS IS THE CORRECTED SUBMISSION HANDLER
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
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });
        
        const result = await response.json();

        if (!response.ok) {
            // Use the error message from the backend
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }
        
        setServerMessage({ type: 'success', text: result.message });
        // Optionally reset form here
        // setFormData({});
        // setCurrentStep(1);

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
