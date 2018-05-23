import React, { Component } from 'react';
import RecruitApplyRequest from './RecruitApplyRequest';
import styled from 'styled-components';
import { BottomMenuContainer, InterstingButton, Spliter, ButtomMenuButton } from './BottomMenu';

const __CommentBoxContainer = styled.div`
  padding: 10px 0;
  background: white;
  margin: 10px 0;
  padding: 5px 5px;
`

const __Comment__Content__Container = styled.div`
  display: inline-block;
  width: calc(100% - 100px);
  padding-left: 20px;
  vertical-align: top;
`

const __Comment__Content__Top__Container = styled.div`

`

// __Comment__Content__Bottom__Container
const __Comment__Content__Bottom__Container = styled.div`

`

const __Comment_Content = styled.p`

`

export const ProfilePricure = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 70px; 
  vertical-align: top;
`

const __Comment__Content__TopMenu = BottomMenuContainer.extend`
  border: none;
  margin: 0;
`

export default class CommentBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const commentList = []
    return (
      <__CommentBoxContainer>
        <ProfilePricure src={this.props.profilePicture} />
        <__Comment__Content__Container>
          <__Comment__Content__Top__Container>
            <__Comment__Content__TopMenu>
              <div>
                <InterstingButton>{this.props.name}</InterstingButton>
                <InterstingButton>{this.props.date}</InterstingButton>
                <InterstingButton>답글</InterstingButton>
              </div>
              <div>
                <ButtomMenuButton>수정</ButtomMenuButton>
                <Spliter>|</Spliter>
                <ButtomMenuButton>삭제</ButtomMenuButton>
              </div>
            </__Comment__Content__TopMenu>
          </__Comment__Content__Top__Container>
          <__Comment__Content__Bottom__Container>
            <__Comment_Content>
              {this.props.content}
            </__Comment_Content>
          </__Comment__Content__Bottom__Container>
        </__Comment__Content__Container>
      </__CommentBoxContainer>
    )
  }
}