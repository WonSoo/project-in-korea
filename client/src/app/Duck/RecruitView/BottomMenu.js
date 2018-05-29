import React, { Component } from 'react';
import RecruitApplyRequest from './RecruitApplyRequest';
import styled from 'styled-components';

export const BottomMenuContainer = styled.div`
 margin-top: 20px;
 display: flex;
 justify-content: space-between;
 padding-bottom: 10px;
 border-bottom: 4px solid #FF869D;
`

export const ButtomMenuButton = styled.button`
  outline: none;
  background: none;
  border: none;
  text-decoration: underline;
  font-weight: 800;
  height: 30px; 
`

export const Spliter = styled.span`
  padding: 0 10px;
  display: inline-block;
`

export const InterstingButton = ButtomMenuButton.extend`
 background: white;
 line-height: 30px;
 text-align: center;
 padding: 0 20px;
`


export default class BottomMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BottomMenuContainer>
        <div>
          <ButtomMenuButton>수정</ButtomMenuButton>
          <Spliter>|</Spliter>
          <ButtomMenuButton>삭제</ButtomMenuButton>
        </div>
        <div>
          <InterstingButton>흥미롭군</InterstingButton>
        </div>
      </BottomMenuContainer>
    )
  }
}