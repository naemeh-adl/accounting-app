import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import MySelectInput from '../../../app/common/form/MySelectInput';

Enzyme.configure({adapter: new EnzymeAdapter()});
it("init",()=>{
    const mockProps = {
        label: "label",
        name: "name",
        placeholder: "placeholder",
        meta: {
          touched: false,
          error: "",
          initialError: "",
          initialTouched: false,
          initialValue: "",
          value: "",
        },
        field: {
          value: "",
          checked: false,
          onChange: jest.fn(),
          onBlur: jest.fn(),
          multiple: undefined,
          name: "firstName",
        },
      };
  
    //  const wrapper=shallow(<MySelectInput label="label"
    //  name="name"
    //  placeholder="placeholder"
    //  {...mockProps.meta}
    //  {...mockProps.field}/>);
    //  const comp=wrapper.find("[data-test='component-navbar']");
    //  expect(comp.length).toBe(0);
 }) 
