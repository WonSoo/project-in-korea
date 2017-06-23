import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import logoImage from '../res/images/logo.png';

class Header extends Component {
  render() {
    return (
      <div className="App">
        <header>
            <a href="#" className="a-button">소개</a>
            <a href="#" className="a-button">고객센터</a>
            <a href="login.html" className="a-button login-button">로그인</a>
            <img src={logoImage} alt="logo"/>
        </header>
      </div>
    );
  }
}
export default Header;
