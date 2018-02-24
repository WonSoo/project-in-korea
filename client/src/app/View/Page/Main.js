import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import RecruitBoard from '../../Duck/Main/RecruitBoard';
import WeDoBoardContainer from '../../Duck/Main/WeDoBoardContainer';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <Header />
                <RecruitBoard />
                <WeDoBoardContainer />
            </div>
        );
    }
}

export default Main