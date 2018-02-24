import React, { Component } from 'react';
import '../../res/App.css';
import slideImage from  '../../res/images/btns/arrow.png';
import ColorTagSelector from '../ColorTagSelector';
import CategorySelector from './CategorySelector';

class ExpendSearchArea extends Component {
    constructor() {
        super();

        this.state = {
            colorTagList: []
        }

        this.handleColorTagChange = this.handleColorTagChange.bind(this);
    }

    handleColorTagChange(list) {
        this.colorTagList = list;
        this.props.handleColorTagChange(list);
    }
    render() {
        return (
            <div className="expend-search-area">
                <CategorySelector className="catogory-selector" categoryData={this.props.categoryData} onCategoryChange={this.props.onCategoryChange}/>
                <ColorTagSelector className="search-color-tag" onChange={this.handleColorTagChange}/>
            </div>
        );
    }
}
export default ExpendSearchArea;
