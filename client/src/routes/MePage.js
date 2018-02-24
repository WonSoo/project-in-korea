import React, { Component } from 'react';
import Header from '../containers/Header';
import Nav from '../containers/Nav';
import PersonImg from '../res/images/person.jpg'


class MePage extends Component {
    render() {
        return (
            <div>
                <div className="header-wrap">
                    <Header />
                    <Nav />
                </div>
                <div className="root-container">
                    <div className="profile">
                        <img className="profile-picture" src={PersonImg} />
                        <p>
                            <span>김이수 </span>
                            <span>ISUKIM117</span>
                        </p>
                        <p>
                            <span>연략망 : </span>
                            <span>ISUKIM@google.com</span>
                        </p>
                        <p>
                            <span>작성 게시글 : </span>
                            <span>7 개</span>
                        </p>
                    </div>
                    <div className="HowMe">
                        <table className="article-table" style={{ borderCollapse: "32px", margin: "4px 0" }}>
                            <tr>
                                <td>태그</td>
                                <td>제목</td>
                                <td>작성자</td>
                                <td>기간</td>
                                <td>마감기간</td>
                                <td>흥미롭군</td>
                            </tr>
                        </table>
                    </div>
                    <div className="Black-line"></div>
                    <div className="etcArticle">
                        <table className="simple-table">
                            {/* {articles} */}
                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>
                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>                            <tr>
                                <td>비트코인 규제에 대한 의견</td>
                                <td>2019-12-12</td>
                                <td>흥미롭군</td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}
export default MePage;
