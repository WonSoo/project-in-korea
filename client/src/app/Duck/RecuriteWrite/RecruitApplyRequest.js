import React, { Component } from 'react';

export default RecruitApplyRequest = ({ position, name }) => {
  return (
    <div>
      <span>
        {this.props.position}
      </span>
      <span>
        {this.props.name}
      </span>
      <button>
        수락
        </button>
      <button>
        거절
        </button>
    </div>
  )
}