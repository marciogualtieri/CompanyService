import React, {Component} from 'react';
import FormInputText from './formInputText';
import FormText from './formText';
import {Link} from 'react-router-dom'

class CompanyUpdateForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (this.props && <div className="panel panel-default">
      <form onSubmit={this.props.handleSubmit}>
        <FormText label="ID" name="id" value={this.props.company.id}/>
        <FormInputText label="Name" name="name" value={this.props.company.name} model={this.props.company}/>
        <FormInputText label="Address" name="address" value={this.props.company.address} model={this.props.company}/>
        <FormInputText label="City" name="city" value={this.props.company.city} model={this.props.company}/>
        <FormInputText label="Country" name="country" value={this.props.company.country} model={this.props.company}/>
        <FormInputText label="E-mail" name="email" value={this.props.company.email} model={this.props.company}/>
        <FormInputText label="Phone Number" name="phoneNumber" value={this.props.company.phoneNumber} model={this.props.company}/>
        <button>Update</button>
        <Link to="/"><button>Back</button></Link>
      </form>
    </div>);
  }
}

export default CompanyUpdateForm
