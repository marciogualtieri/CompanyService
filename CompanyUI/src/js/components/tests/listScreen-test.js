import React from 'react';
import expect from 'expect';
import ListScreen from '../listScreen';
import MessageBar from '../messageBar';
import {shallow, mount} from './enzyme';
import * as fetchMock from 'fetch-mock';
import { waitForElement, waitForState } from 'enzyme-async-helpers';
import { waitForConfig } from './testConfig.js';
import {API_BASE_URL} from '../../config.js';


let companies;
let wrapper;
let url;
let getErrorStatusMessage;
let errorMessage;
let getExceptionMessage;

beforeAll(() => {

  companies = [{ id: 1,
                 name: "Company 1",
                 address: "Address 1",
                 city: "City 1",
                 country: "Country 1",
                 email: "E-mail 1",
                 phoneNumber: "111 1111 1111",
                 owners: [{id: 1, name: "Owner 1"}]
                }];

  getErrorStatusMessage = { text: "Error fetching companies from back-end: returned 500 status",
                            isErrorMessage: true }

  errorMessage = "Something Bad Happened";

  getExceptionMessage = { text: `Error fetching companies from back-end: ${errorMessage}`,
                          isErrorMessage: true }

  url = API_BASE_URL + "/companies"

  fetchMock.config.overwriteRoutes = true;

  fetchMock.get(url, {
    status: 200,
    body: companies
  });

  wrapper = shallow(<ListScreen/>);

});

describe('ListScreen', function() {
  it('renders without errors', function() {
    expect(wrapper).toBeTruthy();
  });

  it('loads data from the back-end', function () {
    expect(wrapper.state('companies')).toEqual(companies);
  });

  it('shows error message when back-end responds with error status on loading', async () => {
    fetchMock.get(url, { status: 500 });
    var wrapper = shallow(<ListScreen/>);
    await waitForElement(wrapper, MessageBar, waitForConfig);
    expect(wrapper.find(MessageBar).props().message).toEqual(getErrorStatusMessage);
  });

  it('shows error message when fetch throws error on loading', async () => {
    fetchMock.get(url, () => { throw new Error(errorMessage) });
    var wrapper = shallow(<ListScreen/>);
    await waitForElement(wrapper, MessageBar, waitForConfig);
    expect(wrapper.find(MessageBar).props().message).toEqual(getExceptionMessage);
  });

});
