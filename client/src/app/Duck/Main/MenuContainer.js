import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default styled.div`
    position: ${props => props.isFloat ? "fixed" : "absolute"};
    width: 100%;
    background: white;
    height: 60px;
    ${props => props.isFloat ? "top: 0; background: white; z-index: 1000000;" : ""}
`;