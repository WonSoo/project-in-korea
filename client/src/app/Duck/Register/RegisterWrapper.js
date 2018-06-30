import React, { PureComponent } from 'react';
import styled from 'styled-components';
import LoginContainer from '../Login/LoginContainer';
import MiddleLine from '../Login/MiddleLine';
import LoginMenu from '../Login/LoginMenu';
import SnsServiceContainer from '../Login/SnsServiceContainer';
import Axios from '../../util/customAxios';
import AuthProto from '../../Protos/auth_pb.js';
import StatusProto from '../../Protos/status_pb.js'

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
    margin-top: 5px;
    width: 100%;
    background: #F36E6F;
    color: white;
    outline: none;
    border: none;
    height: 40px;
    text-align: center;
    font-size: 12pt;
    border: solid 1px #e6e6e6;
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
    width: 300px;
    overflow: hidden;
    margin: 0 auto;
`

const CardContainer = styled.div`
    width: 1200px;
    transform: ${props => `translateX(-${300 * props.cardIndex}px)`};
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
            account_type: ""
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

    async registerSubmit() {
        const registerMessage = new AuthProto.RegisterMessage()
        const emailRegisterMessage = new AuthProto.RegisterMessage.EmailRegisterMessage()

        emailRegisterMessage.setEmail(this.state.email)
        emailRegisterMessage.setPassword(this.state.password)
        emailRegisterMessage.setName(this.state.name)

        registerMessage.setEmailregister(emailRegisterMessage)

        const bytes = registerMessage.serializeBinary()
        var blob = new Blob([bytes])

        try {
            const res = await Axios.post('/register', blob, {
                responseType: 'arraybuffer'
            })
            const StatusMessage = StatusProto.ResponseStatusMessage.deserializeBinary(res.data)

            console.log(StatusMessage.getMessage())
            if (StatusMessage.getIssuccess()) {
                this.moveToNextCard()
            }
        } catch (err) {
            console.log(err)
        }
    }

    sendEmail = async (email) => {
        const registerVerifyMessage = new AuthProto.RegisterVerifyMessage()

        registerVerifyMessage.setEmail(email)

        const bytes = registerVerifyMessage.serializeBinary()
        var blob = new Blob([bytes])

        try {
            const res = await Axios.post('/register_verify', blob, {
                responseType: 'arraybuffer'
            })
            const StatusMessage = StatusProto.ResponseStatusMessage.deserializeBinary(res.data)
            console.log(StatusMessage.getMessage())
            if (StatusMessage.getIssuccess()) {
                this.moveToNextCard()
            }
        } catch (err) {
            console.log(err)
        }
    }

    sendCode = async (verify_number) => {

        const registerVerifyCheckMessage = new AuthProto.RegisterVerifyCheckMessage()

        registerVerifyCheckMessage.setVerifynumber(verify_number)

        const bytes = registerVerifyCheckMessage.serializeBinary()
        var blob = new Blob([bytes])

        try {
            const res = await Axios.post('/register_verify_check', blob, {
                responseType: 'arraybuffer'
            })
            const StatusMessage = StatusProto.ResponseStatusMessage.deserializeBinary(res.data)
            console.log(StatusMessage.getMessage())
            if (StatusMessage.getIssuccess()) {
                this.moveToNextCard()
            }
        } catch (err) {
            console.log(err)
        }


        // Axios.post("/register_verify_check", {
        //     verify_number: verify_number
        // }, {
        //         headers: {
        //             'Access-Control-Request-Headers': 'Content-Type'
        //         }
        //     }).then((response) => {
        //         this.moveToNextCard()
        //     }).catch(function (error) {
        //         console.log(error);
        //     });
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
                            <p style={{ marginBottom: "10px" }}>더 놀라운 프인코를 만나보세요!</p>
                            <LoginButton style={{ background: "#262626" }} onClick={this.moveToNextCard}>이메일로 회원가입</LoginButton>
                            <MiddleLine />
                            <LoginButton style={{ background: "#3b5998" }} onClick={this.moveToNextCard}>페이스북으로 회원가입</LoginButton>
                            <LoginButton style={{ background: "#df4d40" }} onClick={this.moveToNextCard}>구글로 회원가입</LoginButton>
                            <LoginButton style={{ background: "#00c63c" }} onClick={this.moveToNextCard}>네이버로 회원가입</LoginButton>
                            <LoginButton style={{ background: "#1da1f2" }} onClick={this.moveToNextCard}>트위터로 회원가입</LoginButton>
                        </LoginCard>
                        <LoginCard>
                            <LoginHeader>이메일로 회원가입</LoginHeader>
                            <p style={{ marginBottom: "10px" }}>이메일인증을 완료해서 회원가입을 진행해 주세요.</p>
                            <LoginInput placeholder="이메일" value={this.state.email} name="email" onChange={this.onStateChange}></LoginInput>
                            <LoginButton onClick={() => { this.sendEmail(this.state.email) }}>인증하기</LoginButton>
                        </LoginCard>
                        <LoginCard>
                            <LoginHeader>이메일 인증</LoginHeader>
                            <p style={{ marginBottom: "10px" }}>입력하신 이메일에서 6자리 숫자를 확인하고 입력해 주세요.</p>
                            <LoginInput placeholder="000000" value={this.state.verify_number} name="verify_number" onChange={this.onStateChange}></LoginInput>
                            <LoginButton onClick={() => { this.sendCode(this.state.verify_number) }}>인증하기</LoginButton>
                        </LoginCard>
                        <LoginCard>
                            <LoginHeader>정보입력</LoginHeader>
                            <p style={{ marginBottom: "10px" }}>소중한 정보를 입력해 주세요.</p>
                            <LoginInput placeholder="이름" name="name" value={this.state.name} onChange={this.onStateChange}></LoginInput>
                            <LoginInput placeholder="패스워드" name="password" onChange={this.onStateChange}></LoginInput>
                            <LoginInput placeholder="패스워드 확인" name="repassword" onChange={this.onStateChange}></LoginInput>
                            <LoginButton onClick={this.registerSubmit}>회원가입</LoginButton>
                        </LoginCard>
                    </CardContainer>
                </CardViewPort>
            </LoginContainer>
        );
    }
}

export default RegisterWrapper