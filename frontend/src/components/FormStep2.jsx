import React from 'react';

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
                            // THIS IS THE FIX: Using the main handleChange directly
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

export default FormStep2;