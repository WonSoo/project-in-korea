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
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';



const ckConfig = {
    filebrowserUploadUrl: '/upload'
}


class WritePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payType: true,
            howMuchPay: 0,
            memberList: [(<AddMemberInput renderRemoveButton={false} job="" howMany={1} onJobChange={(event) => {
                this.jobList[0].name = event.target.value;
            }} onHowManyChange={(event) => {
                this.jobList[0].howMany = event.target.value;
            }} />)],
            content: '',
            editorState: EditorState.createEmpty(),
            project_purpose: '',
            offlineOrOnline: 'online'
        }

        this.colorTagList = [];
        this.category;
        this.offlineOrOnline;
        this.pay;
        this.jobList = [{}];

        this.payChange = this.payChange.bind(this);
        this.addMember = this.addMember.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleProject_purposeChange = this.handleProject_purposeChange.bind(this);
        this.handleColorTagChange = this.handleColorTagChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.offlineChange = this.offlineChange.bind(this);
        this.sendPost = this.sendPost.bind(this);
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    updateContent(value) {
        this.setState({
            content: value
        })
    }

    payChange(value) {
        if (value == 'true') {
            this.setState({
                payType: true
            })
        } else {
            this.setState({
                payType: false
            })
        }
    }

    offlineChange(value) {
        this.state.offlineOrOnline = value;
    }

    addMember() {
        this.jobList[this.jobList.length] = {};
        const that = this;
        const onJobChange = (function () {
            console.log(that)
            const index = that.state.memberList.length;
            return (event) => {
                that.jobList[index].name = event.target.value;
            }
        })();

        const onHowManyChange = (function () {
            const index = that.state.memberList.length;
            return (event) => {
                that.jobList[index].howMany = event.target.value;
            }
        })();

        const onRemoveForm = (function () {
            const index = that.state.memberList.length;
            return (event) => {
                that.jobList[index] = null;
                let tempMemberList = that.state.memberList.slice() 
                tempMemberList[index] = null;
                that.setState({ memberList: tempMemberList })
            }
        })();
        
        this.setState({
            memberList: [...this.state.memberList, (<AddMemberInput renderRemoveButton={true} onJobChange={onJobChange} onHowManyChange={onHowManyChange} onRemoveForm={onRemoveForm} />)]
        })
    }

    uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID ef2b2a808c667f5');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    sendPost() {
        let nowDate = new Date();
        console.log(this.state)
        let recruitEndDate = new Date(this.state.dday);
        console.log(recruitEndDate.getTime());
        let data = {
            request: 'write',
            type: 'recruit', // 모집합니다(recruit) or 나 어때요?(aboutMe)
            id: 'jkh6100',
            name: this.state.name,
            contact: this.state.contact,
            project_name: this.state.project_name,
            project_purpose: this.state.project_purpose,
            colortags: {
                activity: this.colorTagList.filter(function (x) { return x == '#cf010d' }).length,
                technical: this.colorTagList.filter(function (x) { return x == '#027ad1' }).length,
                academic: this.colorTagList.filter(function (x) { return x == '#f19914' }).length,
                public_interest: this.colorTagList.filter(function (x) { return x == '#048e1e' }).length,
                artistic: this.colorTagList.filter(function (x) { return x == '#fdf21e' }).length,
                modern: this.colorTagList.filter(function (x) { return x == '#7a006b' }).length,
            },
            big_category: this.category, // 카테고리의 각 코드가 있음. 카테고리는 좀더 상의필요.
            work_type: this.state.offlineOrOnline, // or 'online'
            pay: this.state.payType,
            pay_amount: this.state.howMuchPay,
            project_duration: this.state.month,
            recruit_start: nowDate.getTime(),
            recruit_end: recruitEndDate.getTime(),
            jobgroup: this.jobList.filter((item) => {
                if(item) {
                    return true;
                }
            }),
            content: this.state.editorState, // html로 들어가야함. 이미는 text.
            files: {
                0: null
            }
        }

        console.log(data);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name)
        this.setState({
            [name]: value
        });
    }

    handleProject_purposeChange(event) {
        this.setState({ project_purpose: event.target.value });
    }

    handleColorTagChange(list) {
        this.colorTagList = list;
    }

    handleCategoryChange(item) {
        this.category = item.value;
        console.log(item);
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
                                    <input type="text" id="name" name="name" onChange={this.handleInputChange} required />
                                </div>
                                <div className="contact-input">
                                    <label htmlFor="contact">연락망:</label>
                                    <input type="text" id="contact" name="contact" onChange={this.handleInputChange} required />
                                </div>
                            </div>
                            <div className="input-group project-summary-input-group">
                                <div className="project-name-input">
                                    <label htmlFor="project_name">프로젝트명:</label>
                                    <input type="text" id="project_name" name="project_name" onChange={this.handleInputChange} required />
                                </div>
                                <div className="project-perpose-input">
                                    <label htmlFor="project-perpose">프로젝트 목적:</label>
                                    <textarea id="project-perpose" value={this.project_purpose} onChange={this.handleProject_purposeChange} />
                                </div>
                            </div>
                            <div className="input-group project-summary-input-group">
                                <div className="project-tag-input">
                                    <label htmlFor="name">컬러 태그:</label>
                                    <ColorTagSelector onChange={this.handleColorTagChange} />
                                    <CategorySelector onChange={this.handleCategoryChange} value={this.category} />
                                </div>
                            </div>
                            <div className="input-group work-type">
                                <div className="project-meet-type">
                                    <span>작업형태:</span>
                                    <RadioGroup onChange={this.offlineChange} value={this.state.offlineOrOnline} horizontal>
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
                                    <RadioGroup onChange={this.payChange} value={this.state.payType} horizontal>
                                        <RadioButton value="true">
                                            있다
                                    </RadioButton>
                                        <RadioButton value="false">
                                            없다
                                    </RadioButton>
                                    </RadioGroup>
                                    {this.state.payType ? (<input type="text" name="howMuchPay" id="howMuchPay" onChange={this.handleInputChange} value={this.howMuchPay} required />) : (<input type="text" name="howMuchPay" id="howMuchPay" disabled />)}
                                </div>
                                <div className="project-day-type">
                                    <span>프로젝트 기간:</span>
                                    <input type="number" name="month" min="1" step="1" onChange={this.handleInputChange} required />
                                </div>
                                <div className="project-dday-type">
                                    <span>모집 기간:</span>
                                    <input type="date" name="dday" onChange={this.handleInputChange} required />
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
                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                            toolbar={{
                                image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                            }}
                        />
                        {/*<CKEditor activeClass="p10" config={ckConfig} content={this.state.content} onChange={this.updateContent} />*/}
                        <button onClick={this.sendPost}>전송</button>
                    </div>
                    {/*<img src={testImg} />*/}
                </div>
            </div>
        );
    }
}
export default WritePost;
