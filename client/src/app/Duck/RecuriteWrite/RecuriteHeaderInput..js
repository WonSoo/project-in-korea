import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuriteHeaderInputStyle = styled.input`
    width: 100%;
    height: 76px;
    line-height: 76px;
    margin-bottom: 10px;
    font-size: 20pt;
    font-weight: 900;
    padding-left: 20px;
    border: none;
`;

export const RecuriteHeaderInput = (props) => (
    <RecuriteHeaderInputStyle type="text" {...props} />
)