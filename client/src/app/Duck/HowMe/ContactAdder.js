import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ContactInfo from './ContactInfo';

const __ContactAdder__Container = styled.div`
    display: inline-block;
    position: relative;
`

const __DefaultProfile__Name = styled.span`
  line-height: 100px;
  font-size: 2rem;
`

const __Add__Button = styled.button`
  outline: none;
  border: 1px solid black;
  background: none;
  border-radius: 100%;
  height: 20px;
  width: 20px;
  text-align: center;
  padding: 0;
  line-height: 20px;
`

const __Contact__ServiceList = styled.ul`
  position: absolute;
  height: 30px;
  bottom: 25px;
  width: 120px;
  box-sizing: content-box;
  border: 1px solid #CACACA;
  list-style-type: none;
  background: #505050;

`

const __Contact__ServiceIcon = styled.span`
&:nth-child(1) {
  border: none;
  width: 30px;
  box-sizing: border-box;
  }
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0;
  height: 30px;
  line-height: 30px;
  width: 30px;
  border-left: 1px solid #CACACA;
  box-sizing: border-box;
  text-align: center;
  display: inline-block;
`

class ContactAdder extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isExpand: false,
    }
  }

  onAddButtonClick = (e) => {
    this.setState({
      isExpand: true,
    })
  }

  onServiceIconClick = (e) => {
    this.setState({
      isExpand: false,
    })
  }

  render() {
    return (
      <__ContactAdder__Container>
        <__Add__Button onClick={this.onAddButtonClick}>+</__Add__Button>
        {
          this.state.isExpand
            ? (
              <__Contact__ServiceList>
                <__Contact__ServiceIcon onClick={this.onServiceIconClick}>㉸</__Contact__ServiceIcon>
                <__Contact__ServiceIcon onClick={this.onServiceIconClick}>ⓕ</__Contact__ServiceIcon>
                <__Contact__ServiceIcon onClick={this.onServiceIconClick}>@</__Contact__ServiceIcon>
                <__Contact__ServiceIcon onClick={this.onServiceIconClick}>☎</__Contact__ServiceIcon>
              </__Contact__ServiceList>
            )
            : null
        }
      </__ContactAdder__Container>
    );
  }
}

export default ContactAdder