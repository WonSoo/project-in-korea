import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'

import Main from './View/Page/Main';
import Recurit from './View/Page/Recurit';
import HowMe from './View/Page/HowMe';
import WeDo from './View/Page/WeDo';
import WritePost from '../routes/WritePost';
import RegisterProcess from '../routes/RegisterProcess';
import Login from './View/Page/Login';
import Register from './View/Page/Register';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/Recurit" component={Recurit} />
              <Route path="/HowMe" component={HowMe} />
              <Route path="/WeDo" component={WeDo} />
              <Route path="/WritePost" component={WritePost} />
              <Route path="/Login" component={Login} />
              <Route path="/Register" component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;