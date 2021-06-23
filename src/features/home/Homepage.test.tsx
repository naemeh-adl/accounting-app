import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import Testing from '../../app/layout/test';

Enzyme.configure({adapter: new EnzymeAdapter()});
it("Homepage test",()=>{
     const wrapper=shallow(<Testing />);
     const comp=wrapper.find("[data-test='component-navbar']");
     expect(comp.length).toBe(1);
 }) 
