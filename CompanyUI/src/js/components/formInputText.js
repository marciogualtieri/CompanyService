import React, {Component} from 'react';

class FormInputText extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var {
      model,
      name
    } = this.props
    model[name] = event.target.value
  }

  render() {
    return (this.props && <div className="form-group">
      <label htmlFor={this.props.name}>{this.props.label}</label>
      <input id={this.props.name}
             name={this.props.name}
             className="form-control"
             defaultValue={this.props.value}
             type="text" onChange={this.handleChange}/>
    </div>);
  }
}

export default FormInputText
