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
import axios from 'axios';
import ColorMixer from 'ryb-color-mixer';
import { Redirect } from 'react-router'
import image from '../res/images/person.jpg'
import ImagePost from '../components/ImagePost';
import config from '../config';

const CategoryConverter = {
    comic: '만화',
    animation: '애니메이션',
    food: '식품',
    fashion: '패션',
    music: '뮤직'
}


const options = [
    { value: 'comic', label: '만화' },
    { value: 'animation', label: '애니메이션' },
    { value: 'food', label: '식품' },
    { value: 'fashion', label: '패션' },
    { value: 'music', label: '음악' },
    { value: 'performance', label: '공연' },
    { value: 'environment', label: '환경' },
    { value: 'design', label: '디자인' },
    { value: 'publishing', label: '출판' },
    { value: 'journalism', label: '저널리즘' },
    { value: 'game', label: '게임' },
    { value: 'research', label: '연구' },
    { value: 'education', label: '교육' },
    { value: 'machinlearning', label: '머신러닝' },
    { value: 'vr', label: 'VR' },
    { value: 'ar', label: 'AR' },
    { value: 'iot', label: 'IOT' },
    { value: 'drone', label: '드론' },
    { value: '3dprinting', label: '3D프린팅' },
    { value: 'robot', label: '로봇공학' }
];


class Home extends Component {
    constructor() {
        super();
        this.state = {
            articles: [
                {
                    recruit_end: {
                        $numberLong: '1512235197133'
                    },
                    _id: 1,
                    big_category: 'comic',
                    project_name: 'project_name',
                    project_duration: '4',
                    name: 'name',
                }
            ],
            redirectTo: null,
            isInterested: false,
            isListView: true
            
        };
        this.getArticleList = this.getArticleList.bind(this);
        this.articleOnClickHandler = this.articleOnClickHandler.bind(this);
        this.ChangeViewMode = this.ChangeViewMode.bind(this);
    }

    ChangeViewMode() {
        this.setState({
            isListView: !this.state.isListView
        })
    }

    componentWillMount() {
        this.getArticleList();
    }

    getArticleList() {
        console.log("asdfasdfasdfasdfasf")
        axios.get(config.host + '/request/post/' + 10)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    const parsedRes = response.data.map((item) => {
                        return JSON.parse(item)
                    });
                    console.log(parsedRes)
                    this.setState({ articles: parsedRes });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    ColorMix(colors) {
        let result = colors.map((color) => this.hexToRgb(color)).reduce((acc, cur) => {
            cur.r += acc.r;
            cur.g += acc.g;
            cur.b += acc.b;
            return cur
        });

        result.r /= colors.length;
        result.g /= colors.length;
        result.b /= colors.length;

        return `rgb(${result.r}, ${result.g}, ${result.b})`;
    }

    ColorMixAdditive(colors) {
        let result = colors.map((color) => this.hexToRgb(color)).reduce((acc, cur) => {
            cur.r += acc.r;
            cur.g += acc.g;
            cur.b += acc.b;
            return cur
        });

        return `rgb(${result.r}, ${result.g}, ${result.b})`;
    }

    articleOnClickHandler(id) {
        // this.setState({
        //     redirectTo: id
        // })
        window.location.href = "http://localhost:3000/post/" + id;
    }

    interestClickHandler(selectedID) {
        console.log("td clicked")
        let editedArticles = [...this.state.articles];
        editedArticles = editedArticles.map((article) => {
            if (article._id == selectedID) { }
            article.isInterested = !article.isInterested;
            return article
        });
        console.log(editedArticles)
        this.setState({
            articles: editedArticles
        })
    }

    render() {
        console.info(this.ColorMix(['#FF0000', '#00FF00', '#0000FF']))
        const articles = this.state.articles.map((article) => {
            console.log(Math.floor(1231231298712 / 1231232))
            console.log(Math.floor((Number(new Date().getTime()) - (!!article.recruit_end ? Number(article.recruit_end.$numberLong) : 0)) / (1000 * 60 * 60 * 24)))
            const element =
                (<tr key={article._id} onClick={(e) => {
                    console.log(e)
                    this.articleOnClickHandler(article._id);
                }}>
                    <td style={{
                        backgroundColor: '#' + ColorMixer.mix(['#ff0000', '#00ff00'])
                    }}><span>{CategoryConverter[article.big_category]}</span></td>
                    <td>{article.project_name}</td>
                    <td>{article.name}</td>
                    <td>{article.project_duration}}</td>
                    <td>디 {Math.floor((Number(new Date().getTime()) - (!!article.recruit_end ? Number(article.recruit_end.$numberLong) : 0)) / (1000 * 60 * 60 * 24))}</td>
                    <td className="fire" className={(article.isInterested ? 'interested' : '')} onClick={(e) => {
                        if (!e) var e = window.event;                // Get the window event
                        e.cancelBubble = true;                       // IE Stop propagation
                        if (e.stopPropagation) e.stopPropagation();
                        this.interestClickHandler(article._id)
                    }}><span className="fire">흥미롭군</span></td>
                </tr>)
            return element;
        })
        console.log(articles)
        return (
            <div className="App">
                <div className="header-wrap">
                    <Header />
                    <Nav />
                </div>
                <div className="root-container">

                    <SlidePanel />
                    <SearchBar onSearchResult={(articles) => {
                        this.setState({
                            articles: articles
                        })
                    }} ChangeViewMode={this.ChangeViewMode} />
                    <div className="specific-search-panel">
                        상세검색 미정
            </div>
                    <div className="content-panel">
                    {
                        this.state.isListView ? (<table className="article-table">
                        <tr>
                            <th>태그</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>기간</th>
                            <th>마감기간</th>
                            <th>흥미롭군</th>
                        </tr>
                        {articles}
                    </table>) : 
                    (<div className="Image-post-container">
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />
                        <ImagePost author="소진홍" comment="예예예예예예예예예예예예" date="2019-12-12" image={image} />

                    </div>)
                    }
                        
                    </div>
                </div>
                {this.state.redirectTo && (
                    <Redirect to={'/post/' + this.state.redirectTo} />
                )}
            </div>
        );
    }
}
export default Home;