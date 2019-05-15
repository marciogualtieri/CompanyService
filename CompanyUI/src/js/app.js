import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ListScreen from './components/listScreen';
import UpdateScreen from './components/updateScreen';
import CreateScreen from './components/createScreen';
import RemoveScreen from './components/removeScreen';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={ListScreen}/>
          <Route path="/update/:id" component={UpdateScreen}/>
          <Route path="/create/" component={CreateScreen}/>
          <Route path="/remove/:id" component={RemoveScreen}/>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>);
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
