import React from 'react';
import { shallow } from 'enzyme';
import { RoleSelection } from '../RoleSelection';

describe('RoleSelection', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<RoleSelection />);
    });

    it('should render without error', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should render a text div with the correct content', () => {
        const textDiv = wrapper.find('div').at(1);
        expect(textDiv.text()).toEqual('Please select what describes you the best');
    });

    it('should render three buttons', () => {
        const buttons = wrapper.find('Button');
        expect(buttons.length).toEqual(3);
    });

    it('should call navigate function with correct argument when Job Seeker button is clicked', () => {
        const navigateMock = jest.fn();
        const button = wrapper.find('Button').at(0);
        button.simulate('click');
        expect(navigateMock).toHaveBeenCalledWith('/sign-up');
    });

    it('should call navigate function with correct argument when Employer button is clicked', () => {
        const navigateMock = jest.fn();
        const button = wrapper.find('Button').at(1);
        button.simulate('click');
        expect(navigateMock).toHaveBeenCalledWith('/employer-sign-up');
    });

    it('should call navigate function with correct argument when administration button is clicked', () => {
        const navigateMock = jest.fn();
        const button = wrapper.find('Button').at(2);
        button.simulate('click');
        expect(navigateMock).toHaveBeenCalledWith('/admin-sign-up');
    });
});
