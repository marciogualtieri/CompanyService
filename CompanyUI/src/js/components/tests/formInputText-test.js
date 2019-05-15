import React from 'react';
import expect from 'expect';
import FormInputText from '../formInputText';
import { shallow, mount } from './enzyme';


let wrapper;
let model;
let formInputText;

beforeEach(() => {

  model = {test_name: 'Some Test Name'};

  wrapper = shallow(<FormInputText label="Test Name"
                                   name="test_name"
                                   value="Test Default Value"
                                   model={model}/>);

});

describe('FormInputText', function () {
  it('renders without errors', function () {
    expect(wrapper).toBeTruthy();
  });

  it('modifies model correctly', function () {
    var expectedName = 'Some Other Name'
    var inputNode = wrapper.find('input');
    inputNode.simulate('change', { target: { value: expectedName } })
    expect(model.test_name).toEqual(expectedName);
  });
});
