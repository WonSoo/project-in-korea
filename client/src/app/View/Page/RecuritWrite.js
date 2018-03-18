import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import RecuritWriteForm from '../../Duck/RecuriteWrite/RecuritWriteForm';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}

class RecuritWrite extends PureComponent {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <Header />
                <RecuritWriteForm/>
            </div>
        );
    }
}

export default RecuritWrite