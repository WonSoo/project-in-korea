import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default styled.div`
    position: ${props => props.isFloat ? "fixed" : "absolute"};
    width: 100%;
    ${props => props.isFloat ? "top: 0; padding-top: 20px; background: white; z-index: 1000000" : ""}
`;