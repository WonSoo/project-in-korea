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
import config from '../config';



const ckConfig = {
    filebrowserUploadUrl: '/upload'
}


class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: { "_id" : 1, "request" : "write", "type" : "recruit", "id" : "jkh6100", "name" : "asdfasdf", "contact" : "asdf", "project_name" : "asdf", "project_purpose" : "asdf", "colortags" : { "activity" : 3, "technical" : 3, "academic" : 0, "public_interest" : 0, "artistic" : 0, "modern" : 0 }, "big_category" : "comic", "work_type" : "online", "pay" : true, "pay_amount" : "asd", "project_duration" : "1", "recruit_start" : { "$numberLong" : "1507645127872" }, "recruit_end" : { "$numberLong" : "1507075200000" }, "jobgroup" : [{ "name" : "asdf" }], "content" : "<p>asdfasdf</p>\n", "files" : { "0" : null }, "time" : "Tue Oct 10 23:18:47 KST 2017", "writer" : "1944071622532958" }, 
            payType: true,
            name: "",
            contact: "",
            project_name: "",
            howMuchPay: 0,
            memberList: [(<AddMemberInput renderRemoveButton={false} job="" howMany={1} onJobChange={(event) => {
                this.jobList[0].name = event.target.value;
            }} onHowManyChange={(event) => {
                this.jobList[0].howMany = event.target.value;
            }} />)],
            content: '',
            month: 1,
            dday: 0,
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

    componentWillMount() {
        this.getArticle();
    }

    getArticle() {
        axios.get(config.host + '/request/postOne/' + this.props.match.params.id)
        .then((response) => {
            console.log(response);
            if (response.status == 200) {
                console.log(response.data)
                 this.setState({
                    postData: JSON.parse(response.data),
                    name: response.data.name,
                    contact: response.data.contact,
                    project_purpose: response.project_purpose,
                    project_name: response.project_name,
                    offlineOrOnline: response.work_type,
                    payType: response.pay,
                    month: response.project_duration,
                    dday: response.recruit_end,
                    editorState: EditorState.createWithContent(response.content)
                 });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
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

        axios.put(config.host + '/request/post/' + this.props.match.params.id, data)
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
                                    <input type="text" value={this.state.name} id="name" name="name" onChange={this.handleInputChange} required />
                                </div>
                                <div className="contact-input">
                                    <label htmlFor="contact">연락망:</label>
                                    <input type="text" value={this.state.contact} id="contact" name="contact" onChange={this.handleInputChange} required />
                                </div>
                            </div>
                            <div className="input-group project-summary-input-group">
                                <div className="project-name-input">
                                    <label htmlFor="project_name">프로젝트명:</label>
                                    <input type="text" value={this.state.project_name} id="project_name" name="project_name" onChange={this.handleInputChange} required />
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
                                    <input type="number" value={this.state.month} name="month" min="1" step="1" onChange={this.handleInputChange} required />
                                </div>
                                <div className="project-dday-type">
                                    <span>모집 기간:</span>
                                    <input type="date" value={this.state.dday} name="dday" onChange={this.handleInputChange} required />
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
export default EditPost;