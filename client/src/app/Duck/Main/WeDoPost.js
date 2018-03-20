import React, { PureComponent } from 'react';
import RecruitBoardContainer from './RecruitBoardContainer';
import PaperSvg from '../../../res/papper_1.svg'
import RecruitPosterBackground from './RecruitPosterBackground';
import RecruitPaper1 from './RecruitPaper1';
import RecruitPosterPin from './RecruitPosterPin';
import WeDoPostBackdround from './WeDoPostBackdround';

const HeaderHeight = "150px";


class WeDoPost extends PureComponent {
    render() {
        return (
            <WeDoPostBackdround>
                <h1 style={{color: "white"}}>산타에게 선물을</h1>
                <p style={{color: "white"}}>택배기사님들께 선물을 배달해 드렸다.</p>
                <img src={this.props.img} style={{ height: "100%", width: "100%", position: "absolute", zIndex: "-1", left: 0, top: 0, filter: "brightness(0.5)"}} />
            </WeDoPostBackdround>
        );
    }
}

export default WeDoPost