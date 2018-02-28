import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default styled.span`
    padding: 17px 10px;
    height: 30px;
    box-sizing: border-box;
    font-weight: 900;
    &:hover {
        border-bottom: solid 3px #F36E6F;
        transition: all 0.2s ease-out;
    }
`;