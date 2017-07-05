import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../routes/Home';
import Login from '../routes/Login';
import Register from '../routes/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/Login" component={Login}></Route>
            <Route exact path="/Register" component={Register}></Route>
        </div>
      </Router>
    );
  }
}
export default App;
