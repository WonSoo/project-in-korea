import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritDateInputStyle = styled.input`
    width: 100%;
`;

export const RecuritDateInput = (props) => (
    <RecuritDateInputStyle type="number" />
)