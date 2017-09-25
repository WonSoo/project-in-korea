import React, { Component } from 'react';

class AddMemberInput extends Component {
    render() {
        return (
            <div> 
                <input type="text" name="position" id="position" placeholder="필요한 직군"/>
                <input type="number" min="1" step="1" name="howMany" id="howMany" value="1"/>
            </div>
        );
    }
}
export default AddMemberInput;
