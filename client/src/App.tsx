import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './View/Login/Login';
import Main from './View/Main/Main';

import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route exact={true} path="/" component={Main} />
          <Route path="/Login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
