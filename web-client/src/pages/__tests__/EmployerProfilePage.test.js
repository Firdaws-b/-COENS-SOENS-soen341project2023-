import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployerProfilePage from '../EmployerProfilePage';
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({
        onAuthStateChanged: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        signOut: jest.fn(),
    })),
}));
describe('EmployerProfilePage', () => {
    test('renders the page title', () => {
        render(<EmployerProfilePage />);
        const pageTitle = screen.getByText(/My Profile/i);
        expect(pageTitle).toBeInTheDocument();
    });
});
