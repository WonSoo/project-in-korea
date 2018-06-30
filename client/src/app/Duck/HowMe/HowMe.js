import React, { PureComponent } from 'react';
import styled from 'styled-components';
import DefaultProfile from './DefaultProfile';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment, Input, Dropdown, Label, List, Table } from 'semantic-ui-react'
import UserNameInput from './UserNameInput';
import InProgressProject from './InProgressProject';
import WritenArticle from './WritenArticle';
import ContactManager from './ContactManager';
import FreeCommnet from './FreeCommnet';
import Axios from '../../util/customAxios';
import ProfileProto from '../../Protos/profile_pb.js'
import StatusProto from '../../Protos/status_pb.js'
import { AvailabeRegion } from './AvailabeRegion';
import HowMeArticle from './HowMeArticle';
import HowMeWriteForm from '../HowMeWrite/HowMeWriteForm';

const __RecuritForm__Container = styled.div`
    /* width: 980px; */
    height: 100%;
    margin: 0 auto;
    margin-top: 60px;
    padding: 10px;
    padding-top: 60px;
    box-sizing: border-box;
    /* border: solid black 1px; */
    background: #DCE1E1;
`;

const __HowME__Info__Container = styled.div`
    vertical-align: middle;
`

const __DefaultProfile__Container = styled.div`
    display: inline-block;
    margin-right: 20px;
    vertical-align: middle;
`

const __UserInfo__Container = styled.div`
    margin-top: 20px;
    display: inline-block;
    vertical-align: middle;
    width: 740px;
`

const __LineBreak = styled.div`
`

const contactData = [
  {
    contact: 0,
    address: 'thisisMtyID'
  },
  {
    contact: 1,
    address: 'FakeBook@@'
  },
  {
    contact: 2,
    address: '010-9898-0101'
  }
]

class HowMe extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      userName: this.props.userName,
      moodMessage: this.props.moodMessage,
      contact: contactData,
      isShowHowMeWrite: false,
    }
  }

  componentWillMount() {
    Axios.get('/profile', {
      responseType: 'arraybuffer'
    }).then(res => {
      console.log(res)
      const profileMessage = ProfileProto.ProfileMessage.deserializeBinary(res.data)
      console.log(profileMessage.getUsername())
      console.log(profileMessage.getContactaddressList())
      this.setState({
        userName: profileMessage.getUsername(),
        moodMessage: profileMessage.getMoodmessage(),
        contact: profileMessage.getContactaddressList()
      })
    })
  }

  onContactChange = (contact) => {
    this.setState({
      contact: contact
    })
  }

  onMoodMessageChange = (e) => {
    this.setState({
      moodMessage: e.target.value
    })
  }

  onNameChange = (name) => {
    this.setState({
      userName: name
    })
  }

  onSubmit = async () => {
    console.log(this.state)
    const profileMessage = new ProfileProto.ProfileMessage()
    profileMessage.setUsername(this.state.userName)
    profileMessage.setMoodmessage(this.state.moodMessage)
    profileMessage.setContactaddressList(this.state.contact.map(contact => {
      const tempContactMessage = new ProfileProto.ProfileMessage.ContactAddress()
      tempContactMessage.setContact(contact.contact)
      tempContactMessage.setAddress(contact.address)

      return tempContactMessage
    }
    ))

    var bytes = profileMessage.serializeBinary()
    var blob = new Blob([bytes])
    console.log(bytes)
    console.log(blob)

    try {
      const res = await Axios.put('/profile', blob, {
        responseType: 'arraybuffer'
      })
      console.log(res)
      // const bytes = new Blob([res.data]);
      console.log(bytes)
      const StatusMessage = StatusProto.ResponseStatusMessage.deserializeBinary(res.data)
      console.log(StatusMessage.getMessage())

      console.log(StatusMessage.getIssuccess())
      if (StatusMessage.getIssuccess()) {
        // document.location.href = '/'
        alert('success')
      }
    } catch (err) {
      console.log(err)
    }


  }

  onHowMeWriteShow = () => {
    this.setState({
      isShowHowMeWrite: true
    })
  }

  onHowMeWriteHide = () => {
    this.setState({
      isShowHowMeWrite: false
    })
  }

  render() {
    return (
      <__RecuritForm__Container>
        <style>{
          `span {
            padding-left: 10px;
          }`
        }
        </style>
        <Container style={{ width: "980px" }}>
          <__HowME__Info__Container>
            <__DefaultProfile__Container>
              <DefaultProfile name="김지수" />
            </__DefaultProfile__Container>
            <__UserInfo__Container>
              <__LineBreak>
                <UserNameInput onChange={this.onNameChange} name="userName" userName={this.state.userName} />
                <InProgressProject name="프로젝트 인 코리아" color='#FFD0D8' />
                <span style={{ display: "inline-block" }}>활동가능 지역 : </span>
                <div style={{ display: "inline-block", width: "120px", margin: "0 10px" }}><AvailabeRegion name="category" value={this.state.category} onChange={this.onInputChange} /></div>
                <span style={{ display: "inline-block" }}>생업 유무 : </span>
                <div style={{ display: "inline-block", width: "120px", margin: "0 10px" }}><input type="checkbox" /></div>
              </__LineBreak>
              <__LineBreak>
                <WritenArticle count={this.props.postNum} />
                <ContactManager contact={this.state.contact} onContactChange={this.onContactChange} />
              </__LineBreak>
              <FreeCommnet onChange={this.onMoodMessageChange} value={this.state.moodMessage} />
            </__UserInfo__Container>
          </__HowME__Info__Container>
          <button onClick={this.onSubmit}>변경</button>
          <button onClick={this.onHowMeWriteShow}>수정</button>
          {
            this.state.isShowHowMeWrite && <HowMeWriteForm hide={this.onHowMeWriteHide}/>
          }

          <HowMeArticle html={`
            <div class="regular contents"><div class="cooked"><p>사용한다면 Movavi를 이용하고 싶은데, 이건 Free Trial이 없어서 좀 고민 되네요<br>
            -&gt; free Trial 찾음<br>
            <a href="https://www.movavi.com/store.html" rel="nofollow noopener">Free Trial Download Link</a><br>
            </p><div class="lightbox-wrapper"><a class="lightbox" href="https://collabo.aurender.com/uploads/default/original/1X/3ec97185179f5181c629583fa77890864c49cc34.png" data-download-href="https://collabo.aurender.com/uploads/default/3ec97185179f5181c629583fa77890864c49cc34" title="image.png"><img src="https://collabo.aurender.com/uploads/default/optimized/1X/3ec97185179f5181c629583fa77890864c49cc34_1_690x289.png" alt="image" width="690" height="289"><div class="meta">
            <span class="filename">image.png</span><span class="informations">747x313 72.7 KB</span><span class="expand"></span>
          `}/>
        </Container>
      </__RecuritForm__Container>
    );
  }
}

export default HowMe