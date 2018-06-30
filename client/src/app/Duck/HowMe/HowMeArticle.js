import React, { Component } from 'react';
import styled from 'styled-components';

class HowMeArticle extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <style>
                    {
                        `
                    .HowMeArticle {
                        background: white;
                        padding: 10px;
                    }
                    `
                    }
                </style>
                <div className="HowMeArticle" dangerouslySetInnerHTML={{ __html: this.props.html }} />
            </div>

        );
    }
}

export default HowMeArticle