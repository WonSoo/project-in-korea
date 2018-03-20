import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PinSvg from '../../../res/pin_1.svg'

const paperSizeImg =  styled.img`
    position: "absolute",
    height: 40px;
    width: 40px
`;

export default () => (
    <img src={PinSvg} style={{height: "40px", width: "40px", position: "absolute", left: "76px", top: "0px"}} />
)