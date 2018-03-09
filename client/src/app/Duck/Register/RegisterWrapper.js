import React, { PureComponent } from 'react';
import styled from 'styled-components';
import LoginContainer from '../Login/LoginContainer';
import MiddleLine from '../Login/MiddleLine';
import LoginMenu from '../Login/LoginMenu';
import SnsServiceContainer from '../Login/SnsServiceContainer';
import Axios from '../../util/customAxios';

const LoginCard = styled.div`
    margin: 160px auto 300px auto;
    width: 300px;
    background: white;
    height: 400px;
    padding: 30px;
    display: inline-block;
    vertical-align: middle;
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

const CardViewPort = styled.div`
    width: 360px;
    overflow: hidden;
    margin: 0 auto;
`

const CardContainer = styled.div`
    width: 1080px;
    transform: ${props => `translateX(-${360 * props.cardIndex}px)`};
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
`

class RegisterWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cardIndex: 0,
            name: "",
            email: "",
            password: "",
            account_type:""
        }
        
        this.moveToNextCard = this.moveToNextCard.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
    }

    moveToNextCard() {
        console.log("test")
        this.setState({
            cardIndex: this.state.cardIndex + 1
        });
    }

    onStateChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    registerSubmit() {
        Axios.post('/register', {
            account_type: 'pik',
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        const {
            cardIndex
        } = this.state;
        console.log(cardIndex)
        return (
            <LoginContainer>
                {/* <BackgroundImg src="http://www.popco.net/zboard/data/dica_forum_sony/2017/05/26/1034748729592840469c02f.jpg" /> */}
                <CardViewPort>
                    <CardContainer cardIndex={cardIndex}>
                        <LoginCard>
                            <LoginHeader>회원가입</LoginHeader>
                            <p style={{ marginBottom: "10px" }}>회원가입 하시고 더 놀라운 프로젝트 인 코리아를 만나보세요!</p>
                            <LoginButton onClick={this.moveToNextCard}>이메일로 회원가입</LoginButton>
                            <MiddleLine />
                            <SnsServiceContainer />
                        </LoginCard>
                        <LoginCard>
                            <LoginHeader>이메일로 회원가입</LoginHeader>
                            <p style={{ marginBottom: "10px" }}>이메일인증을 완료해서 회원가입을 진행해 주세요.</p>
                            <LoginInput placeholder="이메일" value={this.state.email} name="email" onChange={this.onStateChange}></LoginInput>
                            <LoginButton onClick={this.moveToNextCard}>인증하기</LoginButton>
                        </LoginCard>
                        <LoginCard>
                            <LoginHeader></LoginHeader>
                            <p style={{ marginBottom: "10px" }}>추가정보를 입력하시고 회원가입을 완료하세요.</p>
                            <LoginInput placeholder="이름" name="name" value={this.state.name} onChange={this.onStateChange}></LoginInput>
                            <LoginInput placeholder="패스워드" name="password" onChange={this.onStateChange}></LoginInput>
                            <LoginInput placeholder="패스워드 확인"></LoginInput>
                            <LoginButton onClick={this.registerSubmit}>회원가입</LoginButton>
                        </LoginCard>
                    </CardContainer>
                </CardViewPort>
            </LoginContainer>
        );
    }
}

export default RegisterWrapper