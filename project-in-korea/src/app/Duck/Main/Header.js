import React, { PureComponent } from 'react';
import HeaderContainer from './HeaderContainer';
import Title from './Title';

const HeaderHeight = "320px";

class Main extends PureComponent {
    render() {
        return (
            <HeaderContainer height={HeaderHeight} >
                <Title height={HeaderHeight} />
            </HeaderContainer>
        );
    }
}

export default Main