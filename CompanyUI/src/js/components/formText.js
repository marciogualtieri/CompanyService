import React, {Component} from 'react';

class FormInputText extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (this.props && <div className="form-group">
      <label htmlFor={this.props.name}>{this.props.label}</label>
      <input id={this.props.name}
             name={this.props.name}
             className="form-control"
             value={this.props.value}
             type="text" readOnly="readOnly"/>
    </div>);
  }
}

export default FormInputText
