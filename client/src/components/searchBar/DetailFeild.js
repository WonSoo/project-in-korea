import React, { Component } from 'react';
import '../../res/App.css';
import slideImage from  '../../res/images/btns/arrow.png';

class DetailFeild extends Component {
    render() {
        console.log(this.props.isExpend)
        const rotate = this.props.isExpend ? 0 : 180;
        console.log(rotate)
        return (
            <div onClick={this.props.onClick} style={{
                border: 'solid black 2px'
            }}>
                <span><img src={slideImage}  style={{
                    transition: 'all 0.5s',
                    transform: `rotate(${rotate}deg)`
                }} /></span>
            </div>
        );
    }
}
export default DetailFeild;
