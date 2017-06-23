import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import Header from './Header';
import Nav from './Nav';
import SlidePanel from '../components/SlidePanel';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="root-container">
            <Header/>
            <Nav/>
            <SlidePanel/>
            <div className="search-panel">
                <table>
                    <tr>
                        <td> <button type="button" name="button" class="specific-search-button">세부검색</button>
                        </td>
                        <td> <input type="text" name="search" value="" placeholder="검색어를 입력하세요"/>
                        </td>
                        <td> <button type="button" name="button">검색</button>
                        </td>
                        <td> <button type="button" name="button">?</button>
                        </td>
                        <td> <button type="button" name="button">?</button>
                        </td>
                        <td> <button type="button" name="button">???</button>
                        </td>
                    </tr>
                </table>
            </div>
            <div className="specific-search-panel">
                상세검색 미정
            </div>
            <div className="content-panel">

            </div>
        </div>
      </div>
    );
  }
}
export default App;
