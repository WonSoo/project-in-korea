import React, { Component } from 'react';
import '../../res/App.css';
import DetailFeild from './DetailFeild';
import SearchBox from './SearchBox';
import SearchBtn from './SearchBtn';
import WriteArticleBtn from './WriteArticleBtn';
import ViewModeBtn from './ViewModeBtn';

class SearchBar extends Component {
    render() {
        return (
            <div className="search-bar">
                <ul>
                    <li className="search-item"><DetailFeild/></li>
                    <li className="search-item"><SearchBox/></li>
                    <li className="search-item"><SearchBtn/></li>
                    <li className="search-item"><WriteArticleBtn/></li>
                    <li className="search-item"><ViewModeBtn/></li>
                </ul>
            </div>
        );
    }
}
export default SearchBar;
