import React from 'react';

const FormStep2 = ({ schema, formData, handleChange, errors }) => {
    if (!schema) return <p className="text-center">Loading form...</p>;

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 text-center border-b pb-4">{schema.title}</h2>
            {schema.fields.map(field => {
                // THIS IS THE FIX:
                // We create a new, corrected options array to ensure the placeholder is always present.
                let correctedOptions = field.options ? [...field.options] : [];
                if (field.type === 'select' && correctedOptions[0] !== 'Select Type of Organisation') {
                    correctedOptions.unshift('Select Type of Organisation');
                }

                return (
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
                                {correctedOptions.map((option, index) => (
                                    <option 
                                      key={option} 
                                      value={index === 0 ? '' : option} 
                                      disabled={index === 0}
                                    >
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
                );
            })}
        </div>
    );
};

export default FormStep2;
