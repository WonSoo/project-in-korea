import React, { PureComponent } from 'react';
import LoginContainer from './LoginContainer';
import styled from 'styled-components';
import MiddleLine from './MiddleLine';
import SnsServiceContainer from './SnsServiceContainer';
import LoginMenu from './LoginMenu';
import Axios from '../../util/customAxios';

const LoginCard = styled.div`
    margin: 160px auto 300px auto;
    width: 300px;
    background: white;
    /* height: 400px; */
    padding: 30px;
`
const LoginHeader = styled.h2`
    font-weight: 700;
    font-size: 17pt;
    margin-bottom: 10px;
`

const LoginInput = styled.input`
    width: 100%;
    margin: 5px 0;
    height: 40px;
    padding-left: 7px;
    box-sizing: border-box;
`

const LoginButton = styled.button`
    margin-top: 20px;
    width: 100%;
    background: #F36E6F;
    color: white;
    outline: none;
    border: none;
    height: 40px;
    text-align: center;
`

const BackgroundImg = styled.img`
    width: 100%;
    /* height: 100%; */
    filter: brightness(0.5);
    position: absolute;
    z-index: -2;
    top: 0;
    left: 0;    
`

class LoginWrapper extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            account_type: 'pik',
            email: '',
            password: ''
        }

        this.onStateChange = this.onStateChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    onStateChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    loginSubmit() {
        Axios.post('/login', {
            account_type: 'pik',
            email: this.state.email,
            password: this.state.password
        }).then(function (response) {
            console.log(response);
            if(response.status == 200) {
                alert("success")
                document.location.href = '/'
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <LoginContainer>
                {/* <BackgroundImg src="http://www.popco.net/zboard/data/dica_forum_sony/2017/05/26/1034748729592840469c02f.jpg" /> */}
                <LoginCard>
                    <LoginHeader>로그인</LoginHeader>
                    <p style={{marginBottom: "10px"}}>로그인 하시고 더 놀라운 프로젝트 인 코리아를 만나보세요!</p>
                    <LoginInput placeholder="이메일" name='email' onChange={this.onStateChange}/>
                    <LoginInput type="password" placeholder="비밀번호" name='password' onChange={this.onStateChange} />
                    <label style={{fontSize: "10pt"}}><input type="checkbox" /> 로그인 유지</label>
                    <LoginButton onClick={this.loginSubmit}>로그인</LoginButton>
                    <LoginMenu />
                    <MiddleLine />
                    <SnsServiceContainer />
                </LoginCard>
            </LoginContainer>
        );
    }
}

export default LoginWrapper