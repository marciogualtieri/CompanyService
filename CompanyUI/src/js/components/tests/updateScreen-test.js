import React from 'react';
import expect from 'expect';
import UpdateScreen from '../updateScreen';
import MessageBar from '../messageBar';
import {shallow, mount} from './enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import * as fetchMock from 'fetch-mock';
import {API_BASE_URL} from '../../config.js';


let company;
let wrapper;
let url;
let fetchPutParameters;
let errorMessage;
let getSuccessMessage;
let getErrorStatusMessage;
let getExceptionMessage;
let putSuccessMessage;
let putErrorStatusMessage;
let putExceptionMessage;
let submitUpdate;

beforeAll(() => {

  company = { id: 1,
              name: "Company 1",
              address: "Address 1",
              city: "City 1",
              country: "Country 1",
              email: "E-mail 1",
              phoneNumber: "111 1111 1111",
              owners: [{id: 1, name: "Owner 1"}]
            };

  url = API_BASE_URL + "/companies/1"

  fetchPutParameters = {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(company)
      };

  putSuccessMessage = { text: "Success updating company with id 1 to back-end",
                        isErrorMessage: false };

  putErrorStatusMessage = { text: "Error updating company with id 1 to back-end: returned 500 status",
                            isErrorMessage: true }

  getSuccessMessage = { text: "Success fetching company with id 1 from back-end",
                        isErrorMessage: false };

  getErrorStatusMessage = { text: "Error fetching company with id 1 from back-end: returned 500 status",
                            isErrorMessage: true }

  errorMessage = "Something Bad Happened";

  putExceptionMessage = { text: `Error updating company with id 1 to back-end: ${errorMessage}`,
                          isErrorMessage: true }

  getExceptionMessage = { text: `Error fetching company with id 1 from back-end: ${errorMessage}`,
                          isErrorMessage: true }

  fetchMock.config.overwriteRoutes = true;

  fetchMock.get(url, {
    status: 200,
    body: company
  });

  wrapper = shallow(<UpdateScreen match={{params: {id: 1}}}/>);

  submitUpdate = () => {
    wrapper.instance().handleSubmit({preventDefault: () => {}});
    wrapper.update();
  }

});

describe('UpdateScreen', function() {
  it('renders without errors', function() {
    expect(wrapper).toBeTruthy();
  });

  it('loads company from the back-end', function() {
    expect(wrapper.state('company')).toEqual(company);
  });

  it('shows error message when back-end responds with error status on loading', async () => {
    fetchMock.get(url, { status: 500 });
    var wrapper = shallow(<UpdateScreen match={{params: {id: 1}}}/>);
    await waitForElement(wrapper, MessageBar, waitForConfig);
    expect(wrapper.find(MessageBar).props().message).toEqual(getErrorStatusMessage);
  });

  it('shows error message when fetch throws error on loading', async () => {
    fetchMock.get(url, () => { throw new Error(errorMessage) });
    var wrapper = shallow(<UpdateScreen match={{params: {id: 1}}}/>);
    await waitForElement(wrapper, MessageBar, waitForConfig);
    expect(wrapper.find(MessageBar).props().message).toEqual(getExceptionMessage);
  });

  it('makes update call to back-end on update', async () => {
    fetchMock.put(url, { status: 204 });
    submitUpdate();
    expect(fetchMock.called(url, fetchPutParameters)).toBeTruthy();
  });

  it('shows success message when back-end responds with success status on update', async () => {
    fetchMock.put(url, { status: 204 });
    submitUpdate();
    await waitForElement(wrapper, MessageBar, waitForConfig);
    expect(wrapper.find(MessageBar).props().message).toEqual(putSuccessMessage);
  });

  it('shows error message when back-end responds with error status on update', async () => {
    fetchMock.put(url, { status: 500 });
    submitUpdate();
    await waitForElement(wrapper, MessageBar, waitForConfig);
    expect(wrapper.find(MessageBar).props().message).toEqual(putErrorStatusMessage);
  });

  it('shows error message when fetch throws error on update', async () => {
    fetchMock.put(url, () => { throw new Error(errorMessage) });
    submitUpdate();
    await waitForElement(wrapper, MessageBar, waitForConfig);
    expect(wrapper.find(MessageBar).props().message).toEqual(putExceptionMessage);
  });

});
