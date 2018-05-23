import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritPurposeInputStyle = styled.textarea`
    width: 100%;
    height: 185px;
    min-height: 185px;
    max-height: 185px;
    box-sizing: border-box;
`;

export const RecuritPurposeInput = (props) => (
    <RecuritPurposeInputStyle type="text" {...props}/>
)