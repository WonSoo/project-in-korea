import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import HowMeContainer from '../../Duck/HowMe/HowMe';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}

class HowMe extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <Header />
                <HowMeContainer />
            </div>
        );
    }
}

export default HowMe