import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritTagInputStyle = styled.select`
    width: 100%;
    height: 30px;
`;

export const RecuritTagInput = (props) => (
    <RecuritTagInputStyle {...props}>
        <option value={0}>공연</option>
        <option value={1}>게임</option>
        <option value={2}>교육</option>
        <option value={3}>디자인</option>
        <option value={4}>로봇공학</option>`
        <option value={5}>만화</option>
        <option value={6}>머신러닝</option>
        <option value={7}>식품</option>
        <option value={8}>애니메이션</option>
        <option value={9}>연구</option>
        <option value={10}>음악</option>
        <option value={11}>저널리즘</option>
        <option value={12}>출판</option>
        <option value={13}>패션</option>
        <option value={14}>환경</option>
        <option value={15}>정보기술</option>
    </RecuritTagInputStyle>
)