import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CompanyRemoveButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (this.props && <Link to={"/remove/" + this.props.company.id}>
      <button type="button" className="btn btn-default btn-sm">
        <span className="glyphicon glyphicon-remove"></span>
        Remove
      </button>
    </Link>);
  }
}

export default CompanyRemoveButton
