import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CompanyUpdateButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (this.props && <Link to={"/update/" + this.props.company.id}>
      <button type="button" className="btn btn-default btn-sm">
        <span className="glyphicon glyphicon-edit"></span>
        Update
      </button>
    </Link>);
  }
}

export default CompanyUpdateButton
