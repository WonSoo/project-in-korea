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

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="root-container">
            <Header/>
            <Nav/>
            <SlidePanel/>
            <SearchBar/>
            <div className="specific-search-panel">
                상세검색 미정
            </div>
            <div className="content-panel">
                <table className="article-table">
                    <tr>
                        <th>태그</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>기간</th>
                        <th>모집마감기간</th>
                        <th>흥미롭군</th>
                    </tr>
                    <tr>
                        <td className="red"><span>인간</span></td>
                        <td>크리스마스 같이 보내요</td>
                        <td>이원길</td>
                        <td>3개월</td>
                        <td>2017.9.25</td>
                        <td>흥미롭군</td>
                    </tr>
                    <tr>
                        <td className="red"><span>인간</span></td>
                        <td>크리스마스 같이 보내요</td>
                        <td>이원길</td>
                        <td>3개월</td>
                        <td>2017.9.25</td>
                        <td>흥미롭군</td>
                    </tr>
                    <tr>
                        <td className="red"><span>인간</span></td>
                        <td>크리스마스 같이 보내요</td>
                        <td>이원길</td>
                        <td>3개월</td>
                        <td>2017.9.25</td>
                        <td>흥미롭군</td>
                    </tr>
                    <tr>
                        <td className="red"><span>인간</span></td>
                        <td>크리스마스 같이 보내요</td>
                        <td>이원길</td>
                        <td>3개월</td>
                        <td>2017.9.25</td>
                        <td>흥미롭군</td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
    );
  }
}
export default Home;
