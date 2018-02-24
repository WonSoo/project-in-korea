import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default styled.div`
    height: 270px;
    width: 192px;
    background-size: cover;
    background-image: url("${props => props.img}");
    text-align: center;
    margin: 2.5px;
    position: relative;
`;
