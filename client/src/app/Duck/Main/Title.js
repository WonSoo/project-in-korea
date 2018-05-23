import React, { PureComponent } from 'react';
import styled from 'styled-components';
import logo from '../../../res/logo.gif'
const Title = styled.h1`
    font-size: 15pt;
    line-height: ${props => props.height};
    font-weight: 300;
    font-family: 'Nanum Myeongjo';
    margin: 20px auto;
    width: 135px;
    background: black;
    color: white;
    box-shadow: 5px 5px 10px grey;

`;

const Character = styled.p`
    line-height: 75pt;
`

export default ({ children, ...rest }) => {
    return (
        // <Title {...rest} >
        //     <Character>프로젝트</Character>
        //     <Character>인</Character>
        //     <Character>코리아</Character>
        // </Title>
        <img src={logo}/>
    );
};