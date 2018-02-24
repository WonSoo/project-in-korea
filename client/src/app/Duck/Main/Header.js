import React, { PureComponent } from 'react';
import HeaderContainer from './HeaderContainer';
import Title from './Title';
import LoginButton from './LoginButton';
import ButtomMenuContainer from './ButtomMenuContainer';
import MenuButton from './MenuButton';
import RegisterButton from './RegisterButton';
import ButtomRightMenuContainer from './ButtomRightMenuContainer';
import MenuContainer from './MenuContainer';
import MenuBar from './MenuBar';

const HeaderHeight = "320px";

class Main extends PureComponent {
    render() {
        return (
            <HeaderContainer height={HeaderHeight} >
                <Title height={HeaderHeight} />
                <MenuBar />
            </HeaderContainer>
        );
    }
}

export default Main