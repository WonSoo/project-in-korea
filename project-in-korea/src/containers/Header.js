import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import logoImage from '../res/images/title.png';
import Introduce from '../res/images/btns/bt_introduce.png';
import ServiceCenter from '../res/images/btns/bt_service_center.png';
import Login from '../res/images/btns/bt_login.png';



import { Link } from 'react-router-dom';

const headerStyle = {
  margin: "80px",
  fontSize: "60px",
  textAlign: "center",
  fontWeight: "100",
  wordSpacing: "10px",
  background: "#FBFFF1"
}

class Header extends Component {
  render() {
    return (
      <div className="App">
        <header>
            <a href="#" className="a-button"><img className="icon" src={Introduce}/></a>
            <a href="#" className="a-button"><img className="icon" src={ServiceCenter}/></a>
            <Link to="/Login" className="a-button goto-login-button"><img className="icon" src={Login}/></Link> 
            {/*<a href="login.html" >로그인</a>*/}
            {/* <img className="main-title" src={logoImage} alt="logo"/> */}
            <h1 style={headerStyle}>프로젝트 <span style={{color: "black"}}>인</span> 코리아</h1>
        </header>
      </div>
    );
  }
}
export default Header;
