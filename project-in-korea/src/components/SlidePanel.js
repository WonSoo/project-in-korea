import React, {Component} from 'react';
import logo from '../res/logo.svg';
import '../res/App.css';
import image1 from '../res/images/slide1.jpg';
import image2 from '../res/images/slide2.jpeg';
import image3 from '../res/images/slide3.jpg';
class SlidePanel extends Component {
    render() {
        return (
            <div className="slide-panel">
                <table>
                    <tr>
                        <td><img src={image1} alt="slide image" className="slide-image"/></td>
                        <td><img src={image2} alt="slide image" className="slide-image"/></td>
                        <td><img src={image3} alt="slide image" className="slide-image"/></td>
                    </tr>
                </table>
            </div>
        );
    }
}
export default SlidePanel;
