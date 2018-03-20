import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PIKImg from '../../../res/PIKLogo.png'
import { Link } from 'react-router-dom';

const PIKsizeImg = styled.img`
    height: 40px;
    width: 40px;
    vertical-align: middle;
`;

const goScrollTop = () => {
    window.scrollTo(0, 0);
}

export default () => (
    <Link to="/" onClick={goScrollTop}><PIKsizeImg src={PIKImg} /></Link>
)

