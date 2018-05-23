import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PinSvg1 from '../../../res/pin_1.svg'
import PinSvg2 from '../../../res/pin_2.svg'
import PinSvg3 from '../../../res/pin_3.svg'
import PinSvg4 from '../../../res/pin_4.svg'
import PinSvg5 from '../../../res/pin_5.svg'
import PinSvg6 from '../../../res/pin_6.svg'
import PinIcon from '../../../res/pin_icon.svg'

const pinSvgs = [
    PinSvg1,
    PinSvg2,
    PinSvg3,
    PinSvg4,
    PinSvg5,
    PinSvg6,
]

const paperSizeImg =  styled.img`
    position: "absolute",
    height: 40px;
    width: 40px
`;



export default () => {
    const PinSvg = pinSvgs[Math.floor(Math.random() * (6 - 1)) + 1]
    return (<img src={PinIcon} style={{height: "35px", width: "40px", position: "absolute", left: "76px", top: "8px"}} />)
}
