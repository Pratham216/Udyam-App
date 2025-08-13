import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; // Import from vitest
import App from './App';

describe('Udyam Registration Form', () => {
  // Test 1: Check if the main heading renders
  it('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Udyam Registration/i);
    expect(headingElement).toBeInTheDocument();
  });

  // Test 2: Check for validation error on Aadhaar field
  it('shows an error message for an invalid Aadhaar number', async () => {
    render(<App />);

    const aadhaarInput = screen.getByPlaceholderText(/Enter 12 digit Aadhaar Number/i);
    const nextButton = screen.getByRole('button', { name: /Validate & Generate OTP/i });

    // Type an invalid number
    fireEvent.change(aadhaarInput, { target: { value: '123' } });
    fireEvent.click(nextButton);

    // Check for the error message
    const errorMessage = await screen.findByText(/Aadhaar must be a 12-digit number/i);
    expect(errorMessage).toBeInTheDocument();
  });
});