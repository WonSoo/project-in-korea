import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritPurposeInputStyle = styled.textarea`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

export const RecuritPurposeInput = (props) => (
    <RecuritPurposeInputStyle type="text" {...props}/>
)