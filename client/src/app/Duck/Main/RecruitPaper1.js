import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PaperSvg from '../../../res/papper_2.svg'

const paperSizeImg =  styled.img`
    height: 270;
    width: 192px;
`;

export default () => (
    <img src={PaperSvg} style={{height: "270px", width: "192px"}} />
)

