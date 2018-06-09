import React, { PureComponent } from 'react';
import styled from 'styled-components';
import DefaultProfile from './DefaultProfile';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment, Input, Dropdown, Label, List, Table } from 'semantic-ui-react'
import UserNameInput from './UserNameInput';
import InProgressProject from './InProgressProject';
import WritenArticle from './WritenArticle';
import ContactManager from './ContactManager';
import FreeCommnet from './FreeCommnet';

const __RecuritForm__Container = styled.div`
    /* width: 980px; */
    height: 100%;
    margin: 0 auto;
    margin-top: 60px;
    padding: 10px;
    padding-top: 60px;
    box-sizing: border-box;
    /* border: solid black 1px; */
    background: #DCE1E1;
`;

const __HowME__Info__Container = styled.div`
    vertical-align: middle;
`

const __DefaultProfile__Container = styled.div`
    display: inline-block;
    margin-right: 20px;
    vertical-align: middle;
`

const __UserInfo__Container = styled.div`
    margin-top: 20px;
    display: inline-block;
    vertical-align: middle;
    width: 740px;
`

const __LineBreak = styled.div`
`

export default () => (
    <__RecuritForm__Container>
        <Container style={{ width: "980px" }}>
            <__HowME__Info__Container>
                <__DefaultProfile__Container>
                    <DefaultProfile name="김지수" />
                </__DefaultProfile__Container>
                <__UserInfo__Container>
                    <__LineBreak>
                        <UserNameInput name="김지수" />
                        <InProgressProject name="프로젝트 인 코리아" color='#FFD0D8' />
                    </__LineBreak>
                    <__LineBreak>
                        <WritenArticle count={12}/>
                        <ContactManager /> 
                    </__LineBreak>
                    <FreeCommnet />
                </__UserInfo__Container>

            </__HowME__Info__Container>
        </Container>
    </__RecuritForm__Container>
)
