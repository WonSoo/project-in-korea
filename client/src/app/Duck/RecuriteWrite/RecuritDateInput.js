import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritDateInputStyle = styled.input`
    width: 120px;
    height: 30px;
    padding-left: 5px;
    box-sizing : border-box;
`;

const RecuritDateInputUnit = styled.span`
    display: inline-block;
    transform: translate(-45px)
`

export const RecuritDateInput = (props) => (
    <div>
        <RecuritDateInputStyle {...props} type="number" />
        <RecuritDateInputUnit>개월</RecuritDateInputUnit>
    </div>
)