import React, { PureComponent } from 'react';
import styled from 'styled-components';

const RecuritDateInputStyle = styled.input`
    `;

class RecuritDuring extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            start: null,
            end: null
        }

    }

    render() {
        return (
            <div>
                <RecuritDateInputStyle type="date" />
                <span> ~ </span>
                <RecuritDateInputStyle type="date" />
            </div>
        );
    }
}

export default RecuritDuring