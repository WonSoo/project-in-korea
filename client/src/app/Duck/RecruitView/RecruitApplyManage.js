import React, { Component } from 'react';
import RecruitApplyList from './RecruitApplyList';
import styled from 'styled-components';

const RecruitApplyManageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const RecruitApplyManageDecideButton = styled.button`
  margin-top: 20px;
  text-align: center;
  font-size: 1.1rem;
  /* border-radius: 20px; */
  outline: none;
  background: white;
  border: none;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-weight: 900;
  text-decoration: underline;
`

export default class RecruitApplyManage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RecruitApplyManageContainer>
        <RecruitApplyList applyList={this.props.applyList} />
        <RecruitApplyManageDecideButton>
            프로젝트 확정
        </RecruitApplyManageDecideButton>
      </RecruitApplyManageContainer>
    )
  }
}