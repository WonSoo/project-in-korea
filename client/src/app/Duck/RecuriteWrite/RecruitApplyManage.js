import React, { Component } from 'react';
import RecruitApplyList from './RecruitApplyList';

export default class RecruitApplyManage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <RecruitApplyList />
        <div>
            프로젝트 확정
        </div>
      </div>
    )
  }
}