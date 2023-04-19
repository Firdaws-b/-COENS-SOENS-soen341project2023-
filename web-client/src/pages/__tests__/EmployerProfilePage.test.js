import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployerProfilePage from '../EmployerProfilePage';

describe('EmployerProfilePage', () => {
    test('renders the page title', () => {
        render(<EmployerProfilePage />);
        const pageTitle = screen.getByText(/My Profile/i);
        expect(pageTitle).toBeInTheDocument();
    });
});
