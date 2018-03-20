import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Link from 'react-router';
import HeaderContainer from './HeaderContainer';
import Title from './Title';
import LoginButton from './LoginButton';
import ButtomMenuContainer from './ButtomMenuContainer';
import MenuButton from './MenuButton';
import RegisterButton from './RegisterButton';
import ButtomRightMenuContainer from './ButtomRightMenuContainer';
import MenuContainer from './MenuContainer';
import PIKLogo from './PIKLogo';
import PIKImg from '../../../res/PIKLogo.png'

const HeaderHeight = "320px";

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isFloat: false
        }
        this.topPosition = 0;
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        this.topPosition = 340
        document.addEventListener('scroll', this.onScroll)
    }

    onScroll() {
        this.topPosition < window.scrollY ? this.setState({
            isFloat: true
        }) : this.setState({
            isFloat: false
        });

    }

    render() {
        const isFloat = this.topPosition < document.body.scrollTop ? true : false;
        return (
            <MenuContainer isFloat={this.state.isFloat} >
                <ButtomMenuContainer>
                    {this.state.isFloat ? <PIKLogo /> : null}
                    <MenuButton to="Recurit">모집합니다!</MenuButton>
                    <MenuButton to="HowMe">나 어때?</MenuButton>
                    <MenuButton to="Recurit">전광판</MenuButton>
                    <MenuButton to="WeDo">우리는 합니다</MenuButton>
                    <MenuButton>자유게시판</MenuButton>
                </ButtomMenuContainer>
                <ButtomRightMenuContainer>
                    <MenuButton to="Login">로그인</MenuButton>
                    <MenuButton to="Register">회원가입</MenuButton>
                </ButtomRightMenuContainer>
            </MenuContainer>
        );
    }
}

export default Main