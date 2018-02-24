import React, { Component } from 'react';
import '../../res/App.css';
import SearchBtnImg from '../../res/images/btns/ic_view_picture.png'

const selectedStyle = {
    backgroundColor: '#202020',
    color: 'white',
    fontWeight: '900',
    boxShadow: '0px 0px 21px -4px black'
}

class CategorySelector extends Component {
    render() {
        console.log('asdfasdfas234523452345df')
        
        console.log(this.props.categoryData)
        const categoryElements = this.props.categoryData.map((value, index) => {
            const style = value.isSelected ? selectedStyle : null
            const data = (
                <span style={style} onClick={() => {
                    this.props.onCategoryChange(value.name)
                }}>{value.name}</span>
            )
            return data;

        })
        return (
            <div className={this.props.className}>
                {categoryElements}
            </div>
        );
    }
}
export default CategorySelector;
