import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import RecruitEidtForm from '../../Duck/RecruitEdit/RecruitEditForm';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}

class RecruitEdit extends PureComponent {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <Header />
                <RecruitEidtForm/>
            </div>
        );
    }
}

export default RecruitEdit