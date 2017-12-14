import React, { Component } from 'react';
import '../../res/App.css';


class SearchBox extends Component {
    render() {
        return (
            <div>
                <input type="text" className="search-input" onChange={this.props.handleSearchTextChange}/>
            </div>
        );
    }
}
export default SearchBox;
