import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import RecruitViewContainer from '../../Duck/RecruitView/RecruitView';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}

class RecruitView extends PureComponent {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <Header />
                <RecruitViewContainer {...this.props}/>
            </div>
        );
    }
}

export default RecruitView