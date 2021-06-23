import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import Testing from './test';
import App from './App';
import NavBar from './NavBar';

Enzyme.configure({adapter: new EnzymeAdapter()});

// it("layout test",()=>{
//     const wrapper=mount(<NavBar />);
//     const comp=wrapper.find("[data-test='component-navbar']");
//     expect(comp.length).toBe(1);
// })
it("layout test",()=>{
    const wrapper=shallow(<Testing />);
    const comp=wrapper.find("[data-test='component-navbar']");
    expect(comp.length).toBe(1);
}) 
