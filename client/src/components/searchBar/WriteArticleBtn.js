import React, { Component } from 'react';
import '../../res/App.css';
import WriteArticleBtnImg from '../../res/images/btns/bt_write.png'
import { Link } from 'react-router-dom';

class WriteArticleBtn extends Component {
    render() {
        return (
            <div>
                <Link to="/WritePost" className="clean-button"><img src={WriteArticleBtnImg}/></Link> 
                {/*<button className="clean-button"><img src={WriteArticleBtnImg}/></button>*/}
            </div>
        );
    }
}
export default WriteArticleBtn;
