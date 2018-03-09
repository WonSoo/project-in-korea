import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PinSvg from '../../../res/pin_1.svg'

const paperSizeImg =  styled.img`
    position: "absolute",
    height: 50px;
    width: 50px;
`;

export default () => (
    <img src={PinSvg} style={{height: "60px", width: "60px", position: "absolute", left: "66px", top: "0px"}} />
)