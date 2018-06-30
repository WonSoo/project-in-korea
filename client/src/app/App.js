import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'

import Main from './View/Page/Main';
import Recurit from './View/Page/Recurit';
import RecruitView from './View/Page/RecruitView';
import HowMe from './View/Page/HowMe';
import WeDo from './View/Page/WeDo';
import WritePost from '../routes/WritePost';
import RegisterProcess from '../routes/RegisterProcess';
import Login from './View/Page/Login';
import Register from './View/Page/Register';
import RecuritWrite from './View/Page/RecuritWrite';
import RecruitEdit from './View/Page/RecruitEdit';
import HowMeWrite from './View/Page/HowMeWrite';

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
              <Route exact path="/Recurit" component={Recurit} />
              <Route exact path="/Recurit/:ID" component={RecruitView} />
              <Route exact path="/Recurit/write/write" component={RecuritWrite} />
              <Route exact path="/Recurit/edit/:ID" component={RecruitEdit} />
              <Route path="/HowMe/Write" component={HowMeWrite} />
              <Route path="/HowMe" component={HowMe} />
              <Route path="/WeDo" component={WeDo} />
              <Route path="/Login" component={Login} />
              <Route path="/Register" component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;