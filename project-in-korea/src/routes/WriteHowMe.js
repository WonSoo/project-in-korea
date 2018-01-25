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
import { EditorState, convertToRaw, } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import Dropdown from 'react-dropdown'
import config from '../config';

const options = [
    { value: 'comic', label: '전국' },
    { value: 'animation', label: '서울'},
    { value: 'food', label: '대전'},
    { value: 'fashion', label: '대구'},
    { value: 'music', label: '울산'},
    { value: 'performance', label: '광주'},
    { value: 'environment', label: '부산'},
    { value: 'design', label: '제주도'},
    { value: 'publishing', label: '경기도'},
    { value: 'journalism', label: '강원도'},
    { value: 'game', label: '충북'},
    { value: 'research', label: '충남'},
    { value: 'education', label: '경북'},
    { value: 'machinlearning', label: '경남'},
    { value: 'vr', label: '전북'},
    { value: 'ar', label: '전남'}
];


const ckConfig = {
    filebrowserUploadUrl: '/upload'
}


class WriteHowMe extends Component {
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
        this.successWriteCallback = this.successWriteCallback.bind(this);
    }

    successWriteCallback(res) {
        console.log(res);
        axios.post(config.host + '/request/login', {
            request: 'login',
            type: 'facebook',
            accessToken: res.accessToken
        })
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    this.setState({ fireRedirect: true });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
            // colortags: {
            //     activity: this.colorTagList.filter(function (x) { return x == '#cf010d' }).length,
            //     technical: this.co   lorTagList.filter(function (x) { return x == '#027ad1' }).length,
            //     academic: this.colorTagList.filter(function (x) { return x == '#f19914' }).length,
            //     public_interest: this.colorTagList.filter(function (x) { return x == '#048e1e' }).length,
            //     artistic: this.colorTagList.filter(function (x) { return x == '#fdf21e' }).length,
            //     modern: this.colorTagList.filter(function (x) { return x == '#7a006b' }).length,
            // },
            colortags: this.colorTagList,
            big_category: this.category, // 카테고리의 각 코드가 있음. 카테고리는 좀더 상의필요.
            work_type: this.state.offlineOrOnline, // or 'online'
            pay: this.state.payType,
            pay_amount: this.state.howMuchPay,
            project_duration: this.state.month,
            recruit_start: nowDate.getTime(),
            recruit_end: recruitEndDate.getTime(),
            jobgroup: this.jobList.filter((item) => {
                if (item) {
                    return true;
                }
            }),
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),// html로 들어가야함. 이미는 text.
            files: {
                0: null
            }
        }

        axios.post(config.host + '/request/post', data)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    this.successWriteCallback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

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
                            <Dropdown options={options} onChange={this.props.onChange} value={this.props.value} placeholder="활동가능 지역을 선택하세요." />
                            <div className="input-group work-type">
                                <div className="project-pay-type">
                                    <span>생업유무:</span>
                                    <RadioGroup onChange={this.payChange} value={this.state.payType} horizontal>
                                        <RadioButton value="true">
                                            있다
                                    </RadioButton>
                                        <RadioButton value="false">
                                            없다
                                    </RadioButton>
                                    </RadioGroup>
                                    {this.state.payType ? (<input type="text" name="howMuchPay" id="howMuchPay" onChange={this.handleInputChange} value={this.howMuchPay} placeholder="활동가능 시간" required />) : (<input type="text" name="howMuchPay" id="howMuchPay" disabled />)}
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
                        <button onClick={this.sendPost}>전송</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default WriteHowMe;
