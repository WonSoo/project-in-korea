import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import image1 from '../res/images/slide1.jpg';
import image2 from '../res/images/slide2.jpeg';
import image3 from '../res/images/slide3.jpg';

class SlidePanel extends Component {
  render() {
    return (
      <div className="slide-panel">
          <img src={image1} alt="slide image" className="slide-image"/>
          <img src={image2} alt="slide image" className="slide-image"/>
          <img src={image3} alt="slide image" className="slide-image"/>
      </div>
    );
  }
}
export default SlidePanel;
