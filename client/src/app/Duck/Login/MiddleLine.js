import React, { Compoent } from 'react';
import styled from 'styled-components';

const Line =  styled.div`
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
`

const MiddleText =  styled.span`
    position: absolute;
    left: 50%;
    top: 50%;
    /* bottom: -7px; */
    background: white;
    transform: translate(-50%, -50%);
    width: 40px;
    text-align: center;
    font-size: 10pt;
`

const MiddleLineContainer = styled.div`
    position: relative;
    margin: 40px 0;
`

export default () => (
    <MiddleLineContainer>
        <Line />
        <MiddleText>또는</MiddleText>
    </MiddleLineContainer>
)