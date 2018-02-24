import React, { PureComponent } from 'react';
import RecruitBoardContainer from './RecruitBoardContainer';
import PaperSvg from '../../../res/papper_1.svg'
import RecruitPosterBackground from './RecruitPosterBackground';
import RecruitPaper1 from './RecruitPaper1';
import RecruitPosterPin from './RecruitPosterPin';

const HeaderHeight = "150px";

class RecruitBoard extends PureComponent {
    render() {
        return (
            <RecruitPosterBackground img={this.props.img}>
                {/* <img src={PaperSvg} style={{height: "100%", width: "100%"}}/> */}
                <RecruitPosterPin />
                <RecruitPaper1 />
            </RecruitPosterBackground>
        );
    }
}

export default RecruitBoard