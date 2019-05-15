import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Link} from 'react-router-dom';
import CompanyRemoveButton from './companyRemoveButton';
import CompanyUpdateButton from './companyUpdateButton';

class CompanyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (this.props && <ReactTable data={this.props.companies} columns={[
        {
          Header: "ID",
          accessor: "id"
        }, {
          Header: "Name",
          accessor: "name"
        }, {
          Header: "Address",
          accessor: "address"
        }, {
          Header: "City",
          accessor: "city"
        }, {
          Header: "Country",
          accessor: "country"
        }, {
          Header: "E-mail",
          accessor: "email"
        }, {
          Header: "Phone Number",
          accessor: "phoneNumber"
        }, {
          Header: "",
          id: "Remove",
          width: 90,
          accessor: company => <CompanyRemoveButton company={company}/>
        }, {
          Header: "",
          id: "Update",
          width: 90,
          accessor: company => <CompanyUpdateButton company={company}/>
        }
      ]} defaultPageSize={5} className="-striped -highlight"/>);
  }
}

export default CompanyList
