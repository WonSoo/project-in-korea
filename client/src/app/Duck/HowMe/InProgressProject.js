import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PIKImg from '../../../res/PIKLogo.png'
import { Link } from 'react-router-dom';

const __Project__Name = styled.span`
    display: inline-block;
    /* padding: 2px 10px; */
    border-radius: 20px;
    /* color: white; */
    /* background: ${props => props.color}; */
    /* border: solid 1px white; */
    /* height: 30px; */
    /* line-height: 30px; */
    box-sizing: border-box;
    vertical-align: middle;
    margin-left: 10px;
    fonr-size: 18px;
    color: black;
`;

export default ({ color, name }) => (
    <__Project__Name color={color}>
        <Link to="/" >
            # {name}
        </Link>
    </__Project__Name>
)

