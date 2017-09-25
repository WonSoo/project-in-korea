import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import '../res/login.css';
import Header from '../containers/Header';
import Nav from '../containers/Nav';
import SlidePanel from '../components/SlidePanel';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import ColorTagSelector from '../components/ColorTagSelector';
import CategorySelector from '../components/CategorySelector';
import AddMemberInput from '../components/AddMemberInput';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import CKEditor from "react-ckeditor-component";
import testImg from '../res/images/test.png'


const ckConfig = {
    filebrowserUploadUrl: '/upload'
}


class WritePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pay: true,
            memberList: [(<AddMemberInput />)],
            content: ""
        }

        this.payChange = this.payChange.bind(this);
        this.addMember = this.addMember.bind(this);
        this.updateContent = this.updateContent.bind(this);
    }

    updateContent(value) {
        this.setState({
            content: value
        })
    }

    payChange(value) {
        if (value == "pay") {
            this.setState({
                pay: true
            })
        } else {
            this.setState({
                pay: false
            })
        }
    }

    addMember() {
        this.setState({
            memberList: [...this.state.memberList, (<AddMemberInput />)]
        })
    }

    render() {

        const memberList = this.state.memberList.map((component, index) => {
            return component
        })
        return (
            <div>
                <div className="header-wrap">
                    <Header />
                    <Nav />
                </div>
                <div className="root-container">


                    <div className="form">
                        <form action="/my-handling-form-page" method="post">
                            <div className="input-group contact-input-group">
                                <div className="name-input">
                                    <label htmlFor="name">이름:</label>
                                    <input type="text" id="name" />
                                </div>
                                <div className="contact-input">
                                    <label htmlFor="contact">연락망:</label>
                                    <input type="text" id="contact" />
                                </div>
                            </div>
                            <div className="input-group project-summary-input-group">
                                <div className="project-name-input">
                                    <label htmlFor="project-name">프로젝트명:</label>
                                    <input type="text" id="project-name" />
                                </div>
                                <div className="project-perpose-input">
                                    <label htmlFor="project-perpose">프로젝트 목적:</label>
                                    <textarea id="project-perpose" />
                                </div>
                            </div>
                            <div className="input-group project-summary-input-group">
                                <div className="project-tag-input">
                                    <label htmlFor="name">컬러 태그:</label>
                                    <ColorTagSelector />
                                    <CategorySelector />
                                </div>
                            </div>
                            <div className="input-group work-type">
                                <div className="project-meet-type">
                                    <span>작업형태:</span>
                                    <RadioGroup onChange={this.onChange} horizontal>
                                        <RadioButton value="online">
                                            온라인
                                    </RadioButton>
                                        <RadioButton value="offline">
                                            오프라인
                                    </RadioButton>
                                    </RadioGroup>
                                </div>
                                <div className="project-pay-type">
                                    <span>급여:</span>
                                    <RadioGroup onChange={this.payChange} horizontal>
                                        <RadioButton value="pay">
                                            있다
                                    </RadioButton>
                                        <RadioButton value="noPlay">
                                            없다
                                    </RadioButton>
                                    </RadioGroup>
                                    {this.state.pay ? (<input type="text" name="howMuchPay" id="howMuchPay" />) : (<input type="text" name="howMuchPay" id="howMuchPay" disabled />)}
                                </div>
                                <div className="project-day-type">
                                    <span>프로젝트 기간:</span>
                                    <input type="number" name="day" min="1" step="1" />
                                </div>
                                <div className="project-dday-type">
                                    <span>모집 기간:</span>
                                    <input type="date" name="dday" />
                                </div>
                            </div>
                            <div className="input-group project-member">
                                <span>필요 직군</span>
                                <div className="project-need-member">
                                    {memberList}
                                    <span onClick={this.addMember}>+</span>
                                </div>
                            </div>


                        </form>
                        <CKEditor activeClass="p10" config={ckConfig} content={this.state.content} onChange={this.updateContent} />
                    </div>
                    <img src={testImg} />
                </div>
            </div>
        );
    }
}
export default WritePost;
