import React, { Component } from 'react';
import RecruitApplyRequest from './RecruitApplyRequest';

export default class RecruitApplyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const recruitApplyList = this.props.applyList.map(apply => (
      <RecruitApplyRequest position={apply.position} name={apply.name} />
    ))

    return (
      <div>
        {recruitApplyList}
      </div>
    )
  }
}