import React, { PureComponent } from 'react';


const HeaderHeight = "320px";

class Search extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input name="searchValue" value={this.state.searchValue} onChange={this.onChange} />
                <button>검색</button>
            </div>
        );
    }
}

export default Search