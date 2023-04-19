import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListAllUsers } from '../ListAllUsers';

jest.mock('../firebase/UserAuthContext', () => ({
    useUserAuth: () => ({ userRole: 'Admin' }),
}));

jest.mock('../firebase/firebase', () => ({
    firestore: {
        collection: jest.fn(),
        getDocs: jest.fn(),
    },
}));

describe('ListAllUsers component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component with the correct title', async () => {
        const mockUsers = [
            { id: '123', data: { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', role: 'Job Seeker' } },
            { id: '456', data: { companyName: 'ABC Corp', email: 'admin@abccorp.com', role: 'Employer' } },
        ];
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockUsers),
        });
        render(<ListAllUsers />);
        const heading = screen.getByRole('heading', { name: 'List of all Users' });
        expect(heading).toBeInTheDocument();
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        const tableHead = screen.getByRole('rowgroup');
        expect(tableHead).toBeInTheDocument();
        const headerRow = screen.getByRole('row');
        expect(headerRow).toBeInTheDocument();
        const nameHeader = screen.getByRole('columnheader', { name: 'Name' });
        expect(nameHeader).toBeInTheDocument();
        const emailHeader = screen.getByRole('columnheader', { name: 'Email' });
        expect(emailHeader).toBeInTheDocument();
        const roleHeader = screen.getByRole('columnheader', { name: 'Role' });
        expect(roleHeader).toBeInTheDocument();
        const tableBody = screen.getByRole('rowgroup');
        expect(tableBody).toBeInTheDocument();
        const nameCell1 = screen.getByText('John Doe');
        expect(nameCell1).toBeInTheDocument();
        const emailCell1 = screen.getByText('johndoe@example.com');
        expect(emailCell1).toBeInTheDocument();
        const roleCell1 = screen.getByText('Job Seeker');
        expect(roleCell1).toBeInTheDocument();
        const nameCell2 = screen.getByText('ABC Corp');
        expect(nameCell2).toBeInTheDocument();
        const emailCell2 = screen.getByText('admin@abccorp.com');
        expect(emailCell2).toBeInTheDocument();
        const roleCell2 = screen.getByText('Employer');
        expect(roleCell2).toBeInTheDocument();
    });
});
