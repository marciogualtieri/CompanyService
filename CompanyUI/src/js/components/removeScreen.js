import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class RemoveScreen extends Component {

  render() {
    return (<div className="container-fluid">
      <div className="panel panel-default">
        <p>TODO...</p>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    </div>);
  }
}

export default RemoveScreen
