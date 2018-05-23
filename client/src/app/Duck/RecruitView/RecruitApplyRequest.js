import React, { Component } from 'react';
import styled from 'styled-components';

const RecruitApplyRequestContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  background: #EFF3F3;
`

const RecruitApplyRequestTd = styled.td`
  background: white;
  text-align: center;
  height: 30px;
  line-height: 30px;
`

const RecruitApplyButton = styled.button`
  outline: none;
  border: none;
  text-decoration: underline;
  background: none;
  font-weight: 900;
`

const RecruitApplyRequest = ({ position, name }) => {
  return (
    <RecruitApplyRequestContainer>
      <RecruitApplyRequestTd>
        <span>
          {position}
        </span>
      </RecruitApplyRequestTd>
      <RecruitApplyRequestTd>
        <span>
          {name}
        </span>
      </RecruitApplyRequestTd>
      <RecruitApplyRequestTd>
        <RecruitApplyButton>
          수락
        </RecruitApplyButton>
      </RecruitApplyRequestTd>
      <RecruitApplyRequestTd>
        <RecruitApplyButton>
          거절
        </RecruitApplyButton>
      </RecruitApplyRequestTd>
    </RecruitApplyRequestContainer>
  )
}

export default RecruitApplyRequest