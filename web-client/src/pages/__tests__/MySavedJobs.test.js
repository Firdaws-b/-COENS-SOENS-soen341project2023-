import React from 'react';
import { mount } from 'enzyme';
import { useUserAuth } from '../firebase/UserAuthContext';
import { firestore } from '../firebase/firebase';
import MySavedJobs from './MySavedJobs';

jest.mock('../firebase/UserAuthContext');
jest.mock('../firebase/firebase');

describe('MySavedJobs component', () => {
    const user = { uid: 'user123' };
    const savedJobsData = [
        { data: { title: 'Job 1' }, id: 'job1' },
        { data: { title: 'Job 2' }, id: 'job2' },
    ];

    beforeAll(() => {
        useUserAuth.mockReturnValue({ user });
        firestore.doc.mockImplementation((path) => {
            if (path === 'Users/user123') {
                return {
                    get: jest.fn(() => ({
                        exists: true,
                        data: () => ({ savedJobs: ['job1', 'job2'] }),
                    })),
                };
            } else if (path === 'Postings/job1') {
                return {
                    get: jest.fn(() => ({ exists: true, data: () => ({ title: 'Job 1' }) })),
                };
            } else if (path === 'Postings/job2') {
                return {
                    get: jest.fn(() => ({ exists: false })),
                };
            }
        });
    });

    it('should render without error', () => {
        const wrapper = mount(<MySavedJobs />);
        expect(wrapper.exists()).toBe(true);
    });

    it('should fetch saved jobs data from Firestore', async () => {
        const wrapper = mount(<MySavedJobs />);
        await new Promise((resolve) => setImmediate(resolve));
        wrapper.update();
        expect(firestore.doc).toHaveBeenCalledTimes(3);
        expect(firestore.doc).toHaveBeenCalledWith('Users/user123');
        expect(firestore.doc).toHaveBeenCalledWith('Postings/job1');
        expect(firestore.doc).toHaveBeenCalledWith('Postings/job2');
        expect(wrapper.find('JobCardList').prop('jobs')).toEqual([{ data: { title: 'Job 1' }, id: 'job1' }]);
    });

    it('should render saved jobs data in JobCardList', async () => {
        const wrapper = mount(<MySavedJobs />);
        await new Promise((resolve) => setImmediate(resolve));
        wrapper.update();
        expect(wrapper.find('JobCardList').prop('jobs')).toEqual(savedJobsData.slice(0, 1));
        expect(wrapper.find('.job-card-list-container').text()).toContain('Job 1');
        expect(wrapper.find('.job-card-list-container').text()).not.toContain('Job 2');
    });

    it('should handle error in fetching saved jobs data', async () => {
        firestore.doc.mockImplementationOnce(() => {
            throw new Error('Firestore error');
        });
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        const wrapper = mount(<MySavedJobs />);
        await new Promise((resolve) => setImmediate(resolve));
        wrapper.update();
        expect(consoleSpy).toHaveBeenCalledWith('Error in getSavedJobs:', expect.any(Error));
    });
});
