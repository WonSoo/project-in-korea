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
                <RecuritDateInputStyle type="date" name="project_start" {...this.props}/>
                <span> ~ </span>
                <RecuritDateInputStyle type="date" name="recruit_end" {...this.props}/>
            </div>
        );
    }
}

export default RecuritDuring