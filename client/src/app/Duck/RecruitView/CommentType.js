import React, { Component } from 'react';
import RecruitApplyRequest from './RecruitApplyRequest';
import styled from 'styled-components';
import CommentBox, { ProfilePricure } from './CommentBox';

const __CommentType__Container = styled.div`
  height: 70px;
  padding: 5px 0px 5px 5px;
`

const __CommentType__TextArea = styled.textarea`
  height: 100%;
  width: 90%;
  vertical-align: top;
  border: none;
  outline: none;
`

const __CommentType__SubmitButton = styled.button`
  width: 10%;
  height: 100%;
  vertical-align: top;
  outline: none;
  border:none;
  background: #EFEFEF;
`

const __CommentType__Right__Container = styled.div`
  display: inline-block;
  width: calc(100% - 70px);
  padding-left: 20px;
  vertical-align: top;
  height: 100%;
`

export default class CommentType extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <__CommentType__Container>
        <ProfilePricure src={this.props.profilePicture} />
        <__CommentType__Right__Container>
          <__CommentType__TextArea />
          <__CommentType__SubmitButton>
            전송
          </__CommentType__SubmitButton>
        </__CommentType__Right__Container>
      </__CommentType__Container>
    )
  }
}