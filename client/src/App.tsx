import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login/Login';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Router>
          <Route
            exact={true}
            path="/login"
            component={Login}
          />
        </Router>
      </div>
    );
  }
}

export default App;
