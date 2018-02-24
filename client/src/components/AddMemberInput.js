import React, { Component } from 'react';

class AddMemberInput extends Component {
    render() {
        return (
            <div>
                <input type="text" name="position" id="position" placeholder="필요한 직군" onChange={this.props.onJobChange} required />
                <input type="number" min="1" step="1" name="howMany" id="howMany" onChange={this.props.onHowManyChange} required />
                {this.props.renderRemoveButton &&
                    <button type="button" onClick={this.props.onRemoveForm}>-</button>
                }
            </div>
        );
    }
}
export default AddMemberInput;
