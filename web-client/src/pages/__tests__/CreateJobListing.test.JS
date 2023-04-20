import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateJobListing } from '../CreateJobListing';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../firebase/UserAuthContext'

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../firebase/UserAuthContext', () => ({
    useUserAuth: jest.fn(),
}));

describe('CreateJobListing component', () => {
    const mockCompanyName = 'Mock Company';
    const mockUser = {
        uid: 'mockUid',
    };

    beforeEach(() => {
        useUserAuth.mockReturnValue({
            companyName: mockCompanyName,
            user: mockUser,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders job posting form', () => {
        render(<CreateJobListing />);

        expect(screen.getByText('Create Job Posting')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Job Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Salary')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Job Description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });

    test('submits job posting and redirects to home page', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        render(<CreateJobListing />);

        fireEvent.change(screen.getByPlaceholderText('Job Title'), {
            target: { value: 'Mock Job Title' },
        });
        fireEvent.change(screen.getByPlaceholderText('Salary'), {
            target: { value: '$50,000' },
        });
        fireEvent.change(screen.getByPlaceholderText('Job Description'), {
            target: { value: 'Mock Job Description' },
        });

        fireEvent.submit(screen.getByRole('button', { name: 'Create' }));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/home'));
    });
});
