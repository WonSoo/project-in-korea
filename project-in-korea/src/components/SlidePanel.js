import React, { Component } from 'react';
import '../res/App.css';
import image3 from '../res/images/slide1.jpg';
import image2 from '../res/images/slide2.jpeg';
import image1 from '../res/papper.svg';

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
                    <div><img src={image1} alt="slide image" className="slide-image" /></div>
                    <div>

                        <svg version="1.1" id="Layer_1" x="0px" y="0px" width="192px" height="270px" viewBox="0 0 192 270" enable-background="new 0 0 192 270">
<path fill="none" stroke="blue" stroke-miterlimit="10" d="M2.064,3.028c45.446,0,90.892,0.104,136.337-0.08c17.078-0.068,34.201-0.367,51.273,0.08" />
                        <path fill="none" stroke="red" stroke-miterlimit="10" d="M2.909,266.986c0-53.823,0.898-107.644,0.924-161.466c0.01-20.73-0.057-41.463-0.519-62.19C3.012,29.742,2.064,16.244,2.065,2.66" />
                        <path fill="none" stroke="green" stroke-miterlimit="10" d="M188.073,268.667c0-44.677,0.511-89.351,0.911-134.026c0.116-12.897,0.245-25.793,0.373-38.69c0.108-11.01,0.216-22.021,0.312-33.032c0.174-20.056,0.253-40.132-0.576-60.18" />
                        <path fill="none" stroke="orange" stroke-miterlimit="10" d="M2.339,266.986c41.418,0,82.836,0.057,124.253,0.457c20.492,0.2,40.987,0.654,61.481,0.654" />
                        <path fill="none" stroke="black" stroke-miterlimit="10" d="M147.8,101.289" />
</svg>

                    </div>
                {/* <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div>
                    <div><img src={image1} alt="slide image" className="slide-image"/></div> */}
                </Slider>

                {/*<table>
                    <tr>
                        <td><img src={image1} alt="slide image" className="slide-image" /></td>
                        <td><img src={image2} alt="slide image" className="slide-image" /></td>
                        <td><img src={image3} alt="slide image" className="slide-image" /></td>
                    </tr>
                </table>*/}
            </div >
        );
    }
}
export default SlidePanel;
