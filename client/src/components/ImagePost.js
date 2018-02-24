import React, { Component } from 'react';
import '../res/App.css'

class ImagePost extends Component {
    render() {
        return (
            <div className="Image-post">
                <div>
                    <img className="Image-post-thumnail" src={this.props.image} />
                </div>
                <span className="Image-post-name">{this.props.author}</span>
                <span className="Image-post-date">{this.props.date}</span>
                <span className="Image-post-interesting">흥미롭군</span>
                <p>{this.props.comment}</p>
            </div>
        );
    }
}
export default ImagePost;
