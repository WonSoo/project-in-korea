import React, { Component } from 'react';


class ColorTag extends Component {
    render() {
        return (
            <div className="color-tag" style={{ backgroundColor: this.props.color, width: "100%", height: "90%" }} 
                onClick={() => this.props.onClick(this.props.index)}>
            </div>
        );
    }
}
export default ColorTag;