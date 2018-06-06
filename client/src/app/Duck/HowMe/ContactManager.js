import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ContactInfo from './ContactInfo';
import ContactAdder from './ContactAdder';

const __ContactManager__Container = styled.div`
    display: inline-block;

`

const __DefaultProfile__Name = styled.span`
  line-height: 100px;
  font-size: 2rem;
`

const contactData = [
    {
        service: 'kakaotalk',
        value: 'thisisMtyID'
    },
    {
        service: 'facebook',
        value: 'FakeBook@@'
    },
    {
        service: 'phone',
        value: '010-9898-0101'
    }
]

class ContactManager extends PureComponent {

  render() {
    return (
      <__ContactManager__Container>
        {
            contactData.map(contact => <ContactInfo service={contact.service} value={contact.value}/>)
        }
        <ContactAdder />
      </__ContactManager__Container>
    );
  }
}

export default ContactManager