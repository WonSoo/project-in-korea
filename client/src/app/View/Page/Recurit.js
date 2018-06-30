import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import RecruitBoard from '../../Duck/Main/RecruitBoard';
import WeDoBoardContainer from '../../Duck/Main/WeDoBoardContainer';
import HowMeContainer from '../../Duck/Main/HowMeContainer';
import FooterContainer from '../../Duck/Main/FooterContainer';
import RecruitPoster from '../../Duck/Main/RecruitPoster';
import Search from '../../Duck/RecruitMenu/Search';
import RecruitProto from '../../Protos/recruit_pb.js';
import Axios from '../../util/customAxios'
import RecruitBoardContainer from '../../Duck/Main/RecruitBoardContainer';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}

class Recurit extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            posters: []
        }

        this.loadMoreData = this.loadMoreData.bind(this);
    }

    componentWillMount() {
        this.loadMoreData()
    }

    loadMoreData = () => {
        console.log("loadMoreData")

        Axios.get('/recruit?limit=15&lastIndex=0', {
            responseType: 'arraybuffer'
        })
            .then((response) => {
                console.log(response)
                const fileMessage = RecruitProto.RecruitList.deserializeBinary(response.data)
                console.log(fileMessage.getRecruitlistList())
                const posts = fileMessage.getRecruitlistList().map(post => ({
                    title: post.getProjectname(),
                    poster: Axios.defaults.baseURL + '/file/' + post.getPosterimagepath(),
                    id: post.getId()
                }))
                console.log(posts)
                this.setState({
                    posters: [...this.state.posters, ...posts]
                })
            }).catch(function (error) {
                console.log(error);
            });
    }

    searchRecruitPoster = async (text) => {
    }

    render() {
        return (
            <div>
                <Header />
                <RecruitBoardContainer>
                    <Search />
                    <RecruitBoard infinityScroll={true} posters={this.state.posters} loadMoreData={this.loadMoreData} />
                </RecruitBoardContainer>
            </div>
        );
    }
}

export default Recurit