import React, { Component } from 'react';
import RecruitApplyRequest from './RecruitApplyRequest';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import CommentType from './CommentType';

const __Comment__Container = styled.div`

`

export default class CommentContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <__Comment__Container>
        <CommentList commentList={[
          {
            name: '김지수',
            content: '이거 정말 좋은 생각이네요',
            profilePicture: 'https://www.billboard.com/files/media/IU-Palatte-vid-2017-billboard-1548.jpg',
            date: '2018.05.29',
          },
          {
            name: '김지수',
            content: '이거 정말 좋은 생각이네요',
            profilePicture: 'https://www.billboard.com/files/media/IU-Palatte-vid-2017-billboard-1548.jpg',
            date: '2018.05.29',
          },
          {
            name: '김지수',
            content: '이거 정말 좋은 생각이네요',
            profilePicture: 'https://www.billboard.com/files/media/IU-Palatte-vid-2017-billboard-1548.jpg',
            date: '2018.05.29',
          },
          {
            name: '김지수',
            content: '이거 정말 좋은 생각이네요',
            profilePicture: 'https://www.billboard.com/files/media/IU-Palatte-vid-2017-billboard-1548.jpg',
            date: '2018.05.29',
          },
          {
            name: '김지수',
            content: '이거 정말 좋은 생각이네요',
            profilePicture: 'https://www.billboard.com/files/media/IU-Palatte-vid-2017-billboard-1548.jpg',
            date: '2018.05.29',
          },
          {
            name: '김지수',
            content: '이거 정말 좋은 생각이네요',
            profilePicture: 'https://www.billboard.com/files/media/IU-Palatte-vid-2017-billboard-1548.jpg',
            date: '2018.05.29',
          },
        ]} />
        <CommentType profilePicture='https://www.billboard.com/files/media/IU-Palatte-vid-2017-billboard-1548.jpg'/>
        
      </__Comment__Container>
    )
  }
}