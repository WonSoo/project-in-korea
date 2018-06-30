import React, { PureComponent } from 'react';
import styled from 'styled-components';

const __Contact__Container = styled.span`
  margin: 0 10px;
`

const __Contact__ServiceName = styled.span`
  font-weight: 900;
`

const __Contact__input = styled.input`
  outline: none;
  border: none;
  padding-left: 10px;
  background: ${props => props.isActive ? 'white' : 'none'};
`

const Contact = {
  KAKAOTALK: 0,
  FACEBOOK: 1,
  PHONE: 2,
  EMAIL: 3,
}

function contactIconMapper(service) {
  switch (service) {
    case 0:
      return '㉸'
    case 1:
      return 'ⓕ'
    case 2:
      return '@'
    case 3:
      return '☎'
  }
}


class ContactInfo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value,
      isActive: false
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

    this.props.onContactChange(this.props.contactServiceValue, e.target.value)
  }

  onClick = (e) => {
    this.setState({
      isActive: true,
    })
  }

  render() {
    return (
      <__Contact__Container>
      <__Contact__ServiceName>{contactIconMapper(this.props.service)}</__Contact__ServiceName> <__Contact__input isActive={this.state.isActive} onClick={this.onClick} onChange={this.onChange} name="value" value={this.state.value} />
    </__Contact__Container>
    );
  }
}

export default ContactInfo