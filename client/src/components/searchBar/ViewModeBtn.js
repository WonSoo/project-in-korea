import React, { Component } from 'react';
import '../../res/App.css';
import SearchBtnImg from '../../res/images/btns/ic_view_picture.png'


class ViewModeBtn extends Component {
    render() {
        return (
            <div>
                <button className="clean-button"><img src={SearchBtnImg}/></button>
            </div>
        );
    }
}
export default ViewModeBtn;
