import React, { Component } from 'react';
import '../../res/App.css';
import SearchBtnImg from '../../res/images/btns/bt_search.png'


class SearchBtn extends Component {
    render() {
        return (
            <div>
                <button className="clean-button"><img src={SearchBtnImg}/></button>
            </div>
        );
    }
}
export default SearchBtn;
