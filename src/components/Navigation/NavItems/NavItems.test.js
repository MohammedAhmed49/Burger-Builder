import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './index';
import NavItem from './NavItem';


configure({adapter: new Adapter()});

describe('<NavItems /> component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow( <NavItems /> );
    })
    it('should have 2 NavItem components if not auth', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should have 3 NavItem components if auth', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should contains log out components if auth', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavItem link="/logout">Log Out</NavItem>)).toEqual(true);
    });
});