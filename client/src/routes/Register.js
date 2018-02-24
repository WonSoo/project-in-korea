import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import '../res/register.css';   
import Header from '../containers/Header';
import Nav from '../containers/Nav';
import SlidePanel from '../components/SlidePanel';
import { Link } from 'react-router-dom';


class Register extends Component {
    render() {
        return (
            <div className="login-container">
                <h3>회원가입</h3>
                <p>SNS를 통해 회원가입을 해보세요</p>
                <div className="login-icon-container">
                    <div className="facebook-icon social-icon">
                        f
            </div>
                    <div className="naver-icon social-icon">
                        N
            </div>
                    <div className="twitter-icon social-icon">
                        t
            </div>
                    <div className="google-icon social-icon">
                        G
            </div>
                </div>
                <div className="line">
                </div>
                <div className="login-form">
                    <form className="" action="./" method="post">
                        <input type="text" name="email" value="" placeholder="이메일" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" required />
                        <input type="submit" value="이메일로 회원가입" id="login-submit" />
                        {/*<button type="button" name="button">Login</button>*/}
                    </form>
                </div>
                <div className="line">
                </div>
                <div className="login-menus">
                    <ul>
                        <li><a href="#">아이디 찾기</a></li>
                        <li><a href="#">비밀번호 찾기</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Register;
