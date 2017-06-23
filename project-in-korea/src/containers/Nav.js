import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';

class Nav extends Component {
  render() {
    return (
      <div className="App">
          <nav>
              <a href="#" className="a-button">홈</a>
              <a href="#" className="a-button">모집합니다!</a>
              <a href="#" className="a-button">나 어때?</a>
              <a href="#" className="a-button">전광판</a>
          </nav>
      </div>
    );
  }
}
export default Nav;
