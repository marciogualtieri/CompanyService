import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import CompanyList from './companyList';
import MessageBar from './messageBar';
import {API_BASE_URL} from '../config.js';

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      message: null
    };
  }

  setStateMessage(text, isErrorMessage, handler) {
    var state = this.state
    state.message = text
      ? {
        text: text,
        isErrorMessage: isErrorMessage
      }
      : null
    this.setState(state, handler)
  }

  setStateCompanies(companies, handler) {
    var state = this.state
    state.companies = companies
    this.setState(state, handler)
  }

  componentDidMount() {
    this.setStateMessage(null);
    fetch(`${API_BASE_URL}/companies`).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        this.setStateMessage(`Error fetching companies from back-end: returned ${response.status} status`, true);
      }
    }).then(data => {
      this.setStateCompanies(data);
    }).catch((error) => {
      if (error) {
        this.setStateMessage(`Error fetching companies from back-end: ${error.message}`, true);
        throw error;
      }
    });
  }

  render() {
    return (this.state && <div className="container-fluid">
      <CompanyList companies={this.state.companies}/>
      <Link to="/create/">
        <button type="button" className="btn btn-default btn-sm">
          <span className="glyphicon glyphicon-edit"></span>
          New Company
        </button>
      </Link>
      <MessageBar message={this.state.message}/>
    </div>);
  }
}

export default ListScreen
