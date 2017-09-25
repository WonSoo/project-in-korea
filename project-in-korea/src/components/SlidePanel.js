import React, { Component } from 'react';
import '../res/App.css';
import image1 from '../res/images/slide1.jpg';
import image2 from '../res/images/slide2.jpeg';
import image3 from '../res/images/slide3.jpg';

import Slider from 'react-slick';

const SliderSetting = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    useCSS: true,
    className: "slider-image"
}

class SlidePanel extends Component {
    render() {
        return (
            <div className="slider-container">
                <Slider {...SliderSetting}>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                </Slider>

                {/*<table>
                    <tr>
                        <td><img src={image1} alt="slide image" className="slide-image" /></td>
                        <td><img src={image2} alt="slide image" className="slide-image" /></td>
                        <td><img src={image3} alt="slide image" className="slide-image" /></td>
                    </tr>
                </table>*/}
            </div>
        );
    }
}
export default SlidePanel;
