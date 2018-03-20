import React, { Compoent } from 'react';
import styled from 'styled-components';

const LoginMenuContainer =  styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`

const LoginMenu = styled.span`
    font-size: 10pt;
`

export default () => (
    <LoginMenuContainer>
        <LoginMenu>아이디 찾기</LoginMenu>
        <LoginMenu>비밀번호 찾기</LoginMenu>
        <LoginMenu>회원가입</LoginMenu>
    </LoginMenuContainer>
)