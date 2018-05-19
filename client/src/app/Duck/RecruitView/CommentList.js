import React, { Component } from 'react';
import RecruitApplyRequest from './RecruitApplyRequest';
import styled from 'styled-components';
import CommentBox from './CommentBox';

const CommentListContainer = styled.div`

`

export default class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const commentBoxs = this.props.commentList.map(comment => (
      <CommentBox name={comment.name} date={comment.date} profilePicture={comment.profilePicture} content={comment.content}/>
    ))
    return (
      <CommentListContainer>
        {commentBoxs}
      </CommentListContainer>
    )
  }
}