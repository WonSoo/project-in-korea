import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import '../res/register_process.css';


class RegisterProcess extends Component {
    render() {
        return (
            <div className="login-container">
                <h3>회원가입</h3>
                <p>추가 정보들을 입력해 회원가입을 완료하세요!</p>
                <div className="login-form">
                    <form className="" action="./" method="post">
                        <input type="text" name="nickName" value="" placeholder="닉네임" required />
                        <input type="text" name="email" value="" placeholder="이메일" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" required />
                        <input type="password" name="password" value="" placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자이상)" pattern="(.*?):[ \t]*([^\r\n]*)\r?$/"
                            required />
                        <input type="password" name="password" value="" placeholder="비밀번호 확인" pattern="(.*?):[ \t]*([^\r\n]*)\r?$/" required />
                        <div className="line">
                        </div>
                        <div className="agree-div">
                            <label for="all-agree"><input type="checkbox" name="all-agree" id="all-agree" className="agree-check" /><span>모두동의</span></label>
                            <label for="personal-data">
                                <input type="checkbox" name="personal-data" id="personal-data" className="agree-check" />
                                <div className="agree-main">
                                    <span>회원가입 약관</span>
                                    <div className="agree-main-content">
                                        <p>가나다라마바사 한글 세종대왕</p>
                                    </div>
                                </div>
                            </label>
                            <label for="personal-data">
                                <input type="checkbox" name="personal-data" id="personal-data2" className="agree-check" />
                                <div className="agree-main">
                                    <span>개인정보 활용 동의</span>
                                    <div className="agree-main-content">
                                        <p>가나다라마바사 한글 세종대왕</p>
                                    </div>
                                </div>
                            </label>
                            <label for="personal-data">
                                <input type="checkbox" name="personal-data" id="personal-data3" className="agree-check" />
                                <div className="agree-main">
                                    <span>서비스이용 동의</span>
                                    <div className="agree-main-content">
                                        <p>가나다라마바사 한글 세종대왕</p>
                                    </div>
                                </div>
                            </label>

                        </div>
                        <input type="submit" value="회원가입" id="login-submit" />
                    </form>
                </div>
            </div>
        );
    }
}
export default RegisterProcess;