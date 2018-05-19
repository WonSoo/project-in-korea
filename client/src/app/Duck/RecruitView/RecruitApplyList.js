import React, { Component } from 'react';
import RecruitApplyRequest from './RecruitApplyRequest';
import styled from 'styled-components';

const RecruitApplyListContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`

export default class RecruitApplyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const recruitApplyList = this.props.applyList.map(apply => (
      <RecruitApplyRequest position={apply.position} name={apply.name} />
    ))

    return (
      <RecruitApplyListContainer>
        {recruitApplyList}
      </RecruitApplyListContainer>
    )
  }
}