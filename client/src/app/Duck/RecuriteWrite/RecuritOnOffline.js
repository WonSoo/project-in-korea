import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritTagInputStyle = styled.select`
    width: 100%;
    padding-left: 5px;
    height: 30px;
`;

export const RecuritOnOffline = (props) => (
    <RecuritTagInputStyle>
        <option value="">오프라인</option>
        <option value="">온라인</option>
    </RecuritTagInputStyle>
)