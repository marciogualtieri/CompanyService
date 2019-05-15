import React from 'react';
import expect from 'expect';
import MessageBar from '../messageBar';
import { shallow } from './enzyme';

describe('MessageBar', function () {
  it('renders without errors', function () {
    var wrapper = shallow(<MessageBar message={{text: '', isErrorMessage: true}}/>)
    expect(wrapper).toBeTruthy();
  });

  it('has message text', function () {
    var expectedText = 'Test Message'
    var wrapper = shallow(<MessageBar message={{text: expectedText, isErrorMessage: true}}/>)
    expect(wrapper.text()).toEqual(expectedText);
  });

  it('has alert danger styling for error message', function () {
    var wrapper = shallow(<MessageBar message={{text: '', isErrorMessage: true}}/>)
    expect(wrapper.props().className).toEqual('alert alert-danger');
  });

  it('has alert success styling for error message', function () {
    var wrapper = shallow(<MessageBar message={{text: '', isErrorMessage: false}}/>)
    expect(wrapper.props().className).toEqual('alert alert-success');
  });

});
