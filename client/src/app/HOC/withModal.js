import React, { Component, PropTypes } from 'react';

const withModal = (Component, url, mapper) => {
    return class extends Component {
        constructor(props) {
            super(props)
        }
        render() {
            return (

                <div className="modal__container" onClick={this.props.hide} >
                    <style>
                        {
                            `
                        .modal__container {
                            position: fixed;
                            z-index: 1000;
                            background: rgba(0, 0, 0, 0.5);
                            width: 100vw;
                            height: 100vh;
                            top: 0;
                            left: 0;
                        }
                        `
                        }
                    </style>
                    <Component data={this.state.data} {...this.props} />
                </div>
            )
        }
    }
}

export default withModal