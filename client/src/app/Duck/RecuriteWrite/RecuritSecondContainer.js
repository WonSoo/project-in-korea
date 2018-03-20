import React, { Component } from 'react';
import { RecuriteHeaderInput } from './RecuriteHeaderInput.';
import { RecuritPosterInput } from './RecuritPosterInput';
import { RecuritPurposeInput } from './RecuritPurposeInput';
import styled from 'styled-components';
import { RecuritDateInput } from './RecuritDateInput';
import { RecuritTagInput } from './RecuritTagInput';

const RecuriteHeaderInputContainerStyle = styled.div`
    width: 800px;
    height: 100%;
    margin: 5px;
    box-sizing: padding
`;

const RecuritPosterInputContainerStyle = styled.div`
    float: right;
    width: 140px;
    margin: 5px;
`;

const RecuritPurposeInputContainerStyle = styled.div`
    width: 800px;
    height: 100%;
    margin: 5px;
`; 

class RecuritSecondContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <RecuritDateInput />
                <RecuritTagInput />
            </div>
        );
    }
}

export default RecuritSecondContainer