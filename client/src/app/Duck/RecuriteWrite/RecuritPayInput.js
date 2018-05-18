import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritPayInputStyle = styled.input`
    width: 100%;
    height: 30px;
    vertical-align: middle;
`;

export const RecuritPayInput = (props) => (
    <RecuritPayInputStyle {...props} type="text"/>
)