import React, {Component} from 'react';
import CompanyUpdateForm from './companyUpdateForm';
import MessageBar from './messageBar';
import {API_BASE_URL} from '../config.js';

class UpdateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      message: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setStateMessage(text, isErrorMessage, handler) {
    var state = this.state
    state.message = text? {text: text, isErrorMessage: isErrorMessage} : null
    this.setState(state, handler)
  }

  setStateCompanies(company, handler) {
    var state = this.state
    state.company = company
    this.setState(state, handler)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    fetch(`${API_BASE_URL}/companies/${id}`)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        this.setStateMessage(`Error fetching company with id ${id} from back-end: returned ${response.status} status`, true);
      }
    })
    .then(data => this.setState({company: data}))
    .catch((error) => {
      if (error) {
        this.setStateMessage(`Error fetching company with id ${id} from back-end: ${error.message}`, true);
        throw error;
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state && fetch(`${API_BASE_URL}/companies/${this.state.company.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.company)
    })
    .then(response => {
      if(response.ok) {
        this.setStateMessage(`Success updating company with id ${this.state.company.id} to back-end`, false);
      } else {
        this.setStateMessage(`Error updating company with id ${this.state.company.id} to back-end: returned ${response.status} status`, true);
      }
    })
    .catch((error) => {
      if (error) {
        this.setStateMessage(`Error updating company with id ${this.state.company.id} to back-end: ${error.message}`, true);
        throw error;
      }
    });
  }

  render() {
    return (<div className="container-fluid">
      {this.state.company && <CompanyUpdateForm company={this.state.company} handleSubmit={this.handleSubmit}/>}
      {this.state.message && <MessageBar message={this.state.message}/>}
    </div>);

  }
}

export default UpdateScreen
