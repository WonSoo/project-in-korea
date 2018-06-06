import React, { Component } from 'react';
import styled from 'styled-components';

const __Span__Input = styled.input`
    outline: none;
    border: ${props => props.isActive ? 'solid black 1px' : 'none'};
    background: ${props => props.isActive ? 'white' : 'none'};
    height: 30px;
    box-sizing: border-box;
    padding: 0;
    padding-left: 10px;
    vertical-align: middle;
    width: 100px;
`

class UserNameInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      isActive: false,
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onClick = (e) => {
    this.setState({
      isActive: true,
    })
  }

  render() {
    return (
      <__Span__Input
        isActive={this.state.isActive}
        value={this.state.name}
        name="name"
        onChange={this.onChange}
        onClick={this.onClick} />
    );
  }
}

export default UserNameInput