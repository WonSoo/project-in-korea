import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritPosterInputStyle = styled.input`
    width: 100%;
    height: 100%;
`;

export const RecuritPosterInput = (props) => (
    <RecuritPosterInputStyle type="file" />
)