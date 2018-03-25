import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritTagInputStyle = styled.select`
    width: 100%;
    height: 100%;
`;

export const RecuritTagInput = (props) => (
    <RecuritTagInputStyle {...props}>
        <option value={0}>공연</option>
        <option value={1}>게임</option>
        <option value={2}>교육</option>
        <option value="">디자인</option>
        <option value="">로봇공학</option>
        <option value="">만화</option>
        <option value="">머신러닝</option>
        <option value="">식품</option>
        <option value="">애니메이션</option>
        <option value="">연구</option>
        <option value="">음악</option>
        <option value="">저널리즘</option>
        <option value="">출판</option>
        <option value="">패션</option>
        <option value="">환경</option>
        <option value="">정보기술</option>
    </RecuritTagInputStyle>
)