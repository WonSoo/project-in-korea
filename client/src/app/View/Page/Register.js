import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import RecruitBoard from '../../Duck/Main/RecruitBoard';
import WeDoBoardContainer from '../../Duck/Main/WeDoBoardContainer';
import HowMeContainer from '../../Duck/Main/HowMeContainer';
import FooterContainer from '../../Duck/Main/FooterContainer';
import LoginWrapper from '../../Duck/Login/LoginWrapper';
import RegisterWrapper from '../../Duck/Register/RegisterWrapper';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}

class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <Header />
                <RegisterWrapper />
                <FooterContainer />
            </div>
        );
    }
}

export default Register