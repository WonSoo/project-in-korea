import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import HeaderContainer from './HeaderContainer';
import Title from './Title';
import LoginButton from './LoginButton';
import ButtomMenuContainer from './ButtomMenuContainer';
import MenuButton from './MenuButton';
import RegisterButton from './RegisterButton';
import ButtomRightMenuContainer from './ButtomRightMenuContainer';
import MenuContainer from './MenuContainer';

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
        console.log(ReactDOM.findDOMNode(this))
        console.log(ReactDOM.findDOMNode(this).getBoundingClientRect())
        this.topPosition = 340
        document.addEventListener('scroll', this.onScroll)
    }

    onScroll() {
        console.log(window.scrollY)
        console.log(this.topPosition)
        this.topPosition < window.scrollY + 20 ? this.setState({
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
                    <MenuButton>모집합니다!</MenuButton>
                    <MenuButton>나 어때?</MenuButton>
                    <MenuButton>전광판</MenuButton>
                    <MenuButton>우리는 합니다</MenuButton>
                    <MenuButton>자유게시판</MenuButton>
                </ButtomMenuContainer>
                <ButtomRightMenuContainer>
                    <MenuButton>로그인</MenuButton>
                    <MenuButton>회원가입</MenuButton>
                </ButtomRightMenuContainer>
            </MenuContainer>
        );
    }
}

export default Main