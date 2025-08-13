const express = require('express');
const cors = require('cors');
// 1. Import the Prisma Client
const { PrismaClient } = require('@prisma/client');

// 2. Initialize the Prisma Client
const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// The validation function remains the same
const validateData = (data) => {
    const errors = {};
    if (!data.aadhaarNumber || !/^[2-9]{1}[0-9]{11}$/.test(data.aadhaarNumber)) {
        errors.aadhaarNumber = "A valid 12-digit Aadhaar Number is required.";
    }
    if (!data.nameAsPerAadhaar || data.nameAsPerAadhaar.length < 2) {
        errors.nameAsPerAadhaar = "Name is required.";
    }
    if (!data.panNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNumber)) {
        errors.panNumber = "A valid PAN is required.";
    }
    return errors;
};

// 3. Update the /api/register endpoint
app.post('/api/register', async (req, res) => {
    console.log('Received submission:', req.body);
    const validationErrors = validateData(req.body);

    if (Object.keys(validationErrors).length > 0) {
        console.log('Validation failed:', validationErrors);
        return res.status(400).json({ message: 'Invalid data provided.', errors: validationErrors });
    }

    try {
        // Use Prisma to create a new record in the database
        const newRegistration = await prisma.registration.create({
            data: {
                aadhaarNumber: req.body.aadhaarNumber,
                nameAsPerAadhaar: req.body.nameAsPerAadhaar,
                orgType: req.body.orgType,
                panNumber: req.body.panNumber,
            },
        });

        console.log('Successfully saved to database:', newRegistration);
        res.status(201).json({
            message: 'Registration successful! Data saved to database.',
            data: newRegistration,
        });

    } catch (error) {
        // Handle potential database errors (e.g., unique constraint violation)
        if (error.code === 'P2002') { // Prisma's code for unique constraint violation
            return res.status(409).json({ message: `A registration with this ${error.meta.target.join(', ')} already exists.` });
        }
        console.error('Database error:', error);
        res.status(500).json({ message: 'An error occurred while saving to the database.' });
    }
});

const server = app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
});

module.exports = { app, server }; // Export for testing