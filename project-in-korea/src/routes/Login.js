import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import Header from '../containers/Header';
import Nav from '../containers/Nav';
import SlidePanel from '../components/SlidePanel';



class Login extends Component {
  render() {
    return (
      <div className="App">
        <div class="login-container">
            <h3>로그인</h3>
            <p>로그인을 해주세요 찌릿찌릿</p>
            <div class="login-icon-container">
                <div class="facebook-icon social-icon">
                    f
                </div>
                <div class="naver-icon social-icon">
                    N
                </div>
                <div class="twitter-icon social-icon">
                    t
                </div>
                <div class="google-icon social-icon">
                    G
                </div>
            </div>
            
            <div class="line">
            </div>
            <div class="login-form">
                <form class="" action="./" method="post">
                    <input type="text" name="email" value="" placeholder="이메일" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" required>
                    <input type="password" name="password" value="" placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자이상)" pattern="(.*?):[ \t]*([^\r\n]*)\r?$/" required>
                    <input type="checkbox" name="remember" value="이메일 저장" id="remember-check">이메일 저장 <br>
                    <input type="submit" value="로그인" id="login-submit">
                      <!-- <button type="button" name="button">Login</button> -->
                  </form>
              </div>
              <div class="line">
              </div>
              <div class="login-menus">
                  <ul>
                      <li><a href="#">아이디 찾기</a></li>
                      <li><a href="#">비밀번호 찾기</a></li>
                      <li><a href="register.html">회원가입</a></li>
                  </ul>
              </div>
          </div>
      </div>
    );
  }
}
export default Login;
