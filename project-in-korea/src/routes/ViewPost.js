import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import Header from '../containers/Header';
import Nav from '../containers/Nav';
import SlidePanel from '../components/SlidePanel';
import SearchBtn from '../res/images/btns/bt_search.png'
import SearchIcon from '../res/images/icons/ic_search.png'
import fire from '../res/images/fire.gif'
import SearchBar from '../components/searchBar/SearchBar'
import axios from 'axios'

class ViewPost extends Component {
    constructor() {
        super();
        this.state = { postData: { "_id" : 1, "request" : "write", "type" : "recruit", "id" : "jkh6100", "name" : "asdfasdf", "contact" : "asdf", "project_name" : "asdf", "project_purpose" : "asdf", "colortags" : { "activity" : 3, "technical" : 3, "academic" : 0, "public_interest" : 0, "artistic" : 0, "modern" : 0 }, "big_category" : "comic", "work_type" : "online", "pay" : true, "pay_amount" : "asd", "project_duration" : "1", "recruit_start" : { "$numberLong" : "1507645127872" }, "recruit_end" : { "$numberLong" : "1507075200000" }, "jobgroup" : [{ "name" : "asdf" }], "content" : "<p>asdfasdf</p>\n", "files" : { "0" : null }, "time" : "Tue Oct 10 23:18:47 KST 2017", "writer" : "1944071622532958" } };
        this.getArticle = this.getArticle.bind(this);
    }

    componentWillMount() {
        this.getArticle();
    }

    getArticle() {
        axios.get('http://real-home.iptime.org:3000/request/postOne/' + this.props.match.params.id)
        .then((response) => {
            console.log(response);
            if (response.status == 200) {
                console.log(response.data)
                 this.setState({
                    postData: JSON.parse(response.data)
                 });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        console.log(this.props.match)
        let postData = this.state.postData;
        console.log(postData)
        let jobList = [
            (
                <div>
                    <td>{postData.jobgroup.name}</td>
                    <td>{postData.jobgroup.howMany}</td>
                </div>
            )
        ];
        postData.jobgroup.shift();
        if(jobList > 1) {
            jobList = postData.jobgroup.map((job) => {
                const elements = (
                    <div>
                        <tr>
                        <td>{job.name}</td>
                        <td>{job.howMany}</td>
                        </tr>
                    </div>
                );
                return elements
            })
        }
        return (
            <div className="App">
                <div className="root-container">
                    <Header />
                    <Nav />
                    <h1 className="ViewPost-name">{postData.project_name}</h1>
                    <div className="content-panel">
                        <table className="ViewPost-table">
                            <tr>
                                <th>작성자</th>
                                <td colSpan="2">{postData.name}</td>
                            </tr>
                            <tr>
                                <th>연락망</th>
                                <td colSpan="2">{postData.contact}</td>
                            </tr>
                            <tr>
                                <th>작업형태</th>
                                <td colSpan="2">{postData.work_type}</td>
                            </tr>
                            <tr>
                                <th>급여</th>
                                <td colSpan="2">{postData.pay}</td>
                            </tr>
                            <tr>
                                <th>프로젝트 기간</th>
                                <td colSpan="2">{postData.project_duration}</td>
                            </tr>
                            <tr>
                                <th>모집마감 기간</th>
                                <td colSpan="2">디 {Math.floor((Number(new Date().getTime()) - Number(postData.recruit_end.$numberLong)) / (1000 * 60 * 60 * 24))}일</td>
                            </tr>
                            <tr>
                                <th rowSpan="3">모집 부분</th>
                                {jobList[0]}
                            </tr>
                            {
                                jobList.length > 1 ? jobList : null
                            }
                            {/* <tr>
                                <td>요리사</td>
                                <td>1명</td>
                            </tr>
                            <tr>
                                <td>요리사</td>
                                <td>1명</td>
                            </tr> */}
                            <tr>
                                <td className="ViewPost-article" colSpan="3">
                                    <article>
                                        {/* <p>안녕 베네치아?</p><img src="https://i.imgur.com/HKRfn6g.jpg" alt="ㅁ" style={{float: "none", height: "100%", width: "100%"}} /><p></p> */}
                                        <div dangerouslySetInnerHTML={ {__html: postData.content} }>
                                        </div>
                                    </article>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewPost;
