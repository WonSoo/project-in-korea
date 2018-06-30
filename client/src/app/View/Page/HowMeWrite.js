import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import HowMeWriteForm from '../../Duck/HowMeWrite/HowMeWriteForm';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}

class HowMeWrite extends PureComponent {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <Header />
                <HowMeWriteForm/>
            </div>
        );
    }
}

export default HowMeWrite