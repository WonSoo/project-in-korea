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

class ContactManager extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            contact: this.props.contact
        }
    }

    removeContact = (contactServiceValue) => {
        const newContact = []
        console.log(contactServiceValue)
        for(let contact of this.state.contact) {
            if(contact.contact != contactServiceValue) {
                newContact.push(contact)
            }
        }
        this.setState({
            contact: newContact
        })
    }

    addContact = (contactServiceValue) => {
        const newContact = [...this.state.contact, {contact: contactServiceValue, address: ' asdfasdf'}]

        this.setState({
            contact: newContact
        })
    }

    onContactChange = (contactServiceValue, value) => {
        const newContact = this.state.contact.map(contact => {
            if(contact.contact == contactServiceValue) {
                return {
                    contact: contact.contact,
                    address: value
                }
            }
            return contact
        })
        this.setState({
            contact: newContact
        })

        this.props.onContactChange(newContact)
    }

    render() {
        return (
            <__ContactManager__Container>
                {
                    this.state.contact.map(contact => <ContactInfo contactServiceValue={contact.contact} onContactChange={this.onContactChange} service={contact.contact} value={contact.address} />)
                }
                <ContactAdder addContact={this.addContact} removeContact={this.removeContact} contact={this.props.contact} />
            </__ContactManager__Container>
        );
    }
}

export default ContactManager