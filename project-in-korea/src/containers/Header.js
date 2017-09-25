import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import logoImage from '../res/images/title.png';
import Introduce from '../res/images/btns/bt_introduce.png';
import ServiceCenter from '../res/images/btns/bt_service_center.png';
import Login from '../res/images/btns/bt_login.png';



import { Link } from 'react-router-dom';


class Header extends Component {
  render() {
    return (
      <div className="App">
        <header>
            <a href="#" className="a-button"><img className="icon" src={Introduce}/></a>
            <a href="#" className="a-button"><img className="icon" src={ServiceCenter}/></a>
            <Link to="/Login" className="a-button goto-login-button"><img className="icon" src={Login}/></Link> 
            {/*<a href="login.html" >로그인</a>*/}
            <img className="main-title" src={logoImage} alt="logo"/>
        </header>
      </div>
    );
  }
}
export default Header;
