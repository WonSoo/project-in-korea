import React, { PureComponent } from 'react';
import styled from 'styled-components';

const __Free__Comment = styled.textarea`
  width: 100%;
  height: 80px;
`

export default ({ onChange, value }) => (
    <__Free__Comment onChange={onChange} value={value}>
    </__Free__Comment>
)