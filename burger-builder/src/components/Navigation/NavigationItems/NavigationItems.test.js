import React from 'react';
import { configure, shallow } from 'enzyme'; 
//Enzyme allows you to test a specific Component, or specific unit, without needing your entire project

import Adapter from 'enzyme-adapter-react-16'
//Enzyme is not connected to React so the adapter allows you to connect Enzyme to Reacet

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()}) //Boiler plate to connect Enzyme to React

describe('<NavigationItems />',() => {
    it('should render two <NavigationItem /> if not auth', () => {
        const wrapper = shallow(<NavigationItems />); // Wrapper is naming convention that uses shallow() to call your test
                // Shallow allows the test to look specifically at what the component will render vs deep child rendering
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    }); 

    it('should render three <NavigationItem /> if auth', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated/>); // Wrapper is naming convention that uses shallow() to call your test
                // Shallow allows the test to look specifically at what the component will render vs deep child rendering
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    }); 
});