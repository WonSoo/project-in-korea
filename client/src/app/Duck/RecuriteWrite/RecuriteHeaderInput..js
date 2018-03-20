import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuriteHeaderInputStyle = styled.input`
    width: 100%;
`;

export const RecuriteHeaderInput = (props) => (
    <RecuriteHeaderInputStyle type="text" {...props}/>
)