import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PIKImg from '../../../res/PIKLogo.png'
import { Link } from 'react-router-dom';

const __Writen__Article = styled.span`
    display: inline-block;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    vertical-align: middle;
    margin-left: 10px;
    width: 100px;
`;

export default ({ count }) => (
    <__Writen__Article>
        글: {count}
    </__Writen__Article>
)

