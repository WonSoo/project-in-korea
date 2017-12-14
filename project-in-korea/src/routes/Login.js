import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import '../res/login.css';
import Header from '../containers/Header';
import Nav from '../containers/Nav';
import SlidePanel from '../components/SlidePanel';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';


import facebookImg from '../res/images/sns/ic_facebook.png';
import googleImg from '../res/images/sns/ic_google.png';
import naverImg from '../res/images/sns/ic_naver.png';
import twitterImg from '../res/images/sns/ic_twitter.png';
import axios from 'axios';
import { Redirect } from 'react-router'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            fireRedirect: false
        }
        this.successLoginCallback = this.successLoginCallback.bind(this);
    }

    successLoginCallback(res) {
        console.log(res);
        axios.post('http://real-home.iptime.org:3000/request/login', {
            request: 'login',
            type: 'facebook',
            accessToken: res.accessToken
        })
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    this.setState({ fireRedirect: true });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="root-container">
                <Header />
                <Nav />
                <div className="login-container">
                    <input className="login-text-input" type="text" />
                    <input className="login-text-input" type="password" />
                    <button className="login-button clean-button">로그인</button>
                    <div className="login-menu-container">
                        <ul>
                            <li><a><span>아이디 / 비밀번호 찾기</span></a></li>
                            <li><a><span>회원가입</span></a></li>
                        </ul>
                    </div>
                    <div className="sns-container">
                        <ul>
                            <li><FacebookLogin
                                appId="1624905530901976"
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={""}
                                callback={this.successLoginCallback}
                                cssClass="clean-button"
                                textButton=""
                                icon={<a><img src={facebookImg} /></a>} /></li>
                            <li><a><img src={googleImg} /></a></li>
                            <li><a><img src={naverImg} /></a></li>
                            <li><a><img src={twitterImg} /></a></li>
                        </ul>
                    </div>
                </div>
                {this.state.fireRedirect && (
                    <Redirect to={'/'} />
                )}
            </div>
        );
    }
}
export default Login;
//  <div className="login-container">
//                     <h3>로그인</h3>
//                     <p>로그인을 해주세요 찌릿찌릿</p>
//                     <div className="login-icon-container">
//                         <div className="facebook-icon social-icon">
//                             f
//                 </div>
//                         <div className="naver-icon social-icon">
//                             N
//                 </div>
//                         <div className="twitter-icon social-icon">
//                             t
//                 </div>
//                         <div className="google-icon social-icon">
//                             G
//                 </div>
//                     </div>

//                     <div className="line">
//                     </div>
//                     <div className="login-form">
//                         <form action="./" method="post">
//                             <input type="text" name="email" value="" placeholder="이메일" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" required />
//                             <input type="password" name="password" value="" placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자이상)" pattern="(.*?):[ \t]*([^\r\n]*)\r?$/" required />
//                             <input type="checkbox" name="remember" value="이메일 저장" id="remember-check" />이메일 저장 <br />
//                             <input type="submit" value="로그인" id="login-submit" />
//                             {/*<button type="button" name="button">Login</button>*/}
//                         </form>
//                     </div>
//                     <div className="line">
//                     </div>
//                     <div className="login-menus">
//                         <ul>
//                             <li><a href="#">아이디 찾기</a></li>
//                             <li><a href="#">비밀번호 찾기</a></li>
//                             <li><Link to="/Register">회원가입</Link></li>
//                         </ul>
//                     </div>
//                 </div>