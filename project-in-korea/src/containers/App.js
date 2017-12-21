import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../routes/Home';
import Login from '../routes/Login';
import Register from '../routes/Register';
import RegisterProcess from '../routes/RegisterProcess';
import WritePost from '../routes/WritePost';
import ViewPost from '../routes/ViewPost';
import EditPost from '../routes/EditPost';


// import RegisterProcess from '../router/RegisterProcess';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Login" component={Login}></Route>
          <Route exact path="/Register" component={Register}></Route>
          <Route exact path="/RegisterProcess" component={RegisterProcess}></Route>
          <Route exact path="/WritePost" component={WritePost}></Route>
          <Route exact path="/ViewPost" component={ViewPost}></Route>
          <Route exact path="/EditPost/:id" component={EditPost}></Route>
          <Route path="/post/:id" component={ViewPost} />
        </div>
      </Router>
    );
  }
}
export default App;
