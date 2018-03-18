import React, { Component } from 'react';
import ColorTag from './ColorTag';
import styled from 'styled-components';

const ColorTagName = styled.span`
    font-size: 14px;    
    line-height: 14px;
`;

class ColorTagSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorList: []
        }

        this.addColor.bind(this);
        this.removeColor.bind(this);
    }


    addColor(color) {
        if (this.state.colorList.length < 5) {
            this.props.onChange([...this.state.colorList, color]);
            this.setState({
                colorList: [...this.state.colorList, color]
            });
        }
    };

    removeColor2(index) {
        this.setState({
            colorList: this.state.colorList.splice(index, 1)
        })
    };

    removeColor = (index) => {
        let array = this.state.colorList;
        array.splice(index, 1);
        this.setState({
            colorList: array
        })
    }

    render() {
        const listItems = this.state.colorList.map((color, index) =>
            <li key={"" + color + index}><ColorTag color={color} index={index} onClick={this.removeColor} /></li>
        );
        return (
            <div className={this.props.className}>
                <table className="color-tag-table">
                    <tr>
                        <td style={{ backgroundColor: "#cf010d" }} onClick={() => this.addColor("#cf010d")}><ColorTagName>활동적인</ColorTagName></td>
                        <td style={{ backgroundColor: "#027ad1" }} onClick={() => this.addColor("#027ad1")}><ColorTagName>기술적인</ColorTagName></td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#f19914" }} onClick={() => this.addColor("#f19914")}><ColorTagName>학구적인</ColorTagName></td>
                        <td style={{ backgroundColor: "#048e1e" }} onClick={() => this.addColor("#048e1e")}><ColorTagName>공익적인</ColorTagName></td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#fdf21e" }} onClick={() => this.addColor("#fdf21e")}><ColorTagName>예술적인</ColorTagName></td>
                        <td style={{ backgroundColor: "#7a006b" }} onClick={() => this.addColor("#7a006b")}><ColorTagName>시대적인</ColorTagName></td>
                    </tr>
                </table>
                <ul className="clean-list color-tag-selected">
                    {listItems}
                </ul>
            </div>
        );
    }
}
export default ColorTagSelector;