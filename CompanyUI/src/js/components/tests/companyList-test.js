import React from 'react';
import expect from 'expect';
import CompanyList from '../companyList';
import { shallow } from './enzyme';


let wrapper;
let headers;
let companies;
let companyList;

beforeEach(() => {

  headers = ['ID', 'Name', 'Address', 'City', 'Country', 'E-mail', 'Phone Number', '', '']

  companies = [{ id: 1,
                 name: "name 1",
                 address: "address 1",
                 city: "city 1",
                 country: "country 1",
                 email: "email 1",
                 phoneNumber: "111 1111 1111"
               },
               { id: 2,
                 name: "name 2",
                 address: "address 2",
                 city: "city 2",
                 country: "country 2",
                 email: "email 2",
                 phoneNumber: "222 2222 2222"
               }];

  companyList = <CompanyList companies={companies} />;

  wrapper = shallow(<CompanyList companies={companies}/>)

});

describe('CompanyList', function () {
  it('renders without errors', function () {
    expect(wrapper).toBeTruthy();
  });

  it('has all headers', function () {
    expect(wrapper.props().columns.map(o => o.Header)).toEqual(headers)
  });

  it('loads companies from back-end', function () {
    expect(wrapper.props().data).toEqual(companies)
  });
});
