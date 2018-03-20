import React, { PureComponent } from 'react';
import RecruitBoardContainer from './RecruitBoardContainer';
import RecruitPoster from './RecruitPoster';
import RecruitPosterContainer from './RecruitPosterContainer';
const HeaderHeight = "150px";

class RecruitBoard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loadingState: false
        }
    }

    componentDidMount() {
        if(this.props.infinityScroll) {
            window.addEventListener('scroll', () => {
                var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
                var clientHeight = document.documentElement.clientHeight || window.innerHeight;
                var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
            
                if (scrolledToBottom) {
                    console.log("bottom");
                    this.props.loadMoreData();
                }
            });

        }
    }

    render() {
        return (
            <RecruitBoardContainer>
                <RecruitPosterContainer>
                    {
                        this.props.posters
                    }
                </RecruitPosterContainer>
            </RecruitBoardContainer>
        );
    }
}

export default RecruitBoard