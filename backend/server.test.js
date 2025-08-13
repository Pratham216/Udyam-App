// backend/server.test.js
const request = require('supertest');
const { app, server } = require('./server'); // Import the app and server
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Clean up the database and close the server after all tests
afterAll(async () => {
    // Clean up any test data
    const deleteRegistrations = prisma.registration.deleteMany({});
    await prisma.$transaction([deleteRegistrations]);
    await prisma.$disconnect();
    server.close();
});

describe('POST /api/register', () => {
    // Test 1: Successful registration
    it('should return 201 and save valid data', async () => {
        // THIS IS THE FIX: Generate a valid Aadhaar number that doesn't start with 0 or 1
        const validStartingDigit = Math.floor(Math.random() * 8) + 2; // Random digit from 2-9
        const randomAadhaar = `${validStartingDigit}${Math.random().toString().slice(2, 13)}`;

        const validData = {
            aadhaarNumber: randomAadhaar,
            nameAsPerAadhaar: 'Test User',
            orgType: 'Proprietory',
            panNumber: `ABCDE${Math.floor(1000 + Math.random() * 9000)}G`, // Use a different letter to avoid conflicts
        };

        const res = await request(app)
            .post('/api/register')
            .send(validData);

        // Check for a successful response
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('Registration successful! Data saved to database.');
        expect(res.body.data).toHaveProperty('id');
    });

    // Test 2: Invalid PAN format
    it('should return 400 for invalid PAN format', async () => {
        const invalidData = {
            aadhaarNumber: '987654321098',
            nameAsPerAadhaar: 'Invalid User',
            orgType: 'Partnership',
            panNumber: 'INVALIDPAN', // Incorrect format
        };

        const res = await request(app)
            .post('/api/register')
            .send(invalidData);

        // Check for a validation error response
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Invalid data provided.');
        expect(res.body.errors).toHaveProperty('panNumber');
    });
});
