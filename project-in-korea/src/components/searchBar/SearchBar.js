import React, { Component } from 'react';
import '../../res/App.css';
import DetailFeild from './DetailFeild';
import SearchBox from './SearchBox';
import SearchBtn from './SearchBtn';
import WriteArticleBtn from './WriteArticleBtn';
import ViewModeBtn from './ViewModeBtn';
import ExpendSearchArea from './ExpendSearchArea';
import axios from 'axios';

const category = [
    {
        name: '만화',
        isSelected: false
    },
    {
        name: '애니메이션',
        isSelected: false
    },
    {
        name: '식품',
        isSelected: false
    },
    {
        name: '패션',
        isSelected: false
    },
    {
        name: '음악',
        isSelected: false
    },
    {
        name: '공연',
        isSelected: false
    },
    {
        name: '환경',
        isSelected: false
    },
    {
        name: '디자인',
        isSelected: false
    },
    {
        name: '출판',
        isSelected: false
    },
    {
        name: '저널리즘',
        isSelected: false
    },
    {
        name: '게임',
        isSelected: false
    },
    {
        name: '연구',
        isSelected: false
    },
    {
        name: '교육',
        isSelected: false

    },
    {
        name: '머신러닝',
        isSelected: false

    },
    {
        name: 'VR',
        isSelected: false

    },
    {
        name: 'AR',
        isSelected: false

    },
    {
        name: 'IOT',
        isSelected: false

    },
    {
        name: '드론',
        isSelected: false

    },
    {
        name: '3D프린팅',
        isSelected: false

    },
    {
        name: '로봇공학',
        isSelected: false

    }
]

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            isExpend: false,
            categorys: category,
            searchText: '',
            colorTagList: [],
            selectedCategory: ''
        };

        this.expendSearchBar = this.expendSearchBar.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleColorTagChange = this.handleColorTagChange.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        axios.post('http://real-home.iptime.org:3000/request/post/getKeyword/', {
            project_name: this.state.searchText,
            big_category: this.state.selectedCategory,
            colortags: this.state.colorTagList
        })
        .then((response) => {
            console.log(response);
            if (response.status == 200) {
                const parsedRes = response.data.map((item) => {
                    return JSON.parse(item)
                });
                this.props.onSearchResult(parsedRes)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleSearchTextChange(e) {
        this.setState({
            searchText: e.target.value
        });
        console.log(this.state)
        console.log("asdfasdfasdfasdf")
    }

    handleColorTagChange(colorTagList) {
        this.setState({
            colorTagList: colorTagList
        })
    }

    expendSearchBar() {
        this.setState({
            isExpend: !this.state.isExpend
        });
    }

    selectCategory(selectedName) {
        const selectCategoryIndex = this.state.categorys.findIndex((element) => {
            if(element.name == selectedName) {
                return true
            } 
            return false
        });

        const newCategory = [...this.state.categorys];
        newCategory.forEach((element) => {
            if(element.isSelected) {
                element.isSelected = false;
            }
        })
        newCategory[selectCategoryIndex].isSelected = true;

        this.setState({
            categorys: newCategory,
            selectedCategory: newCategory[selectCategoryIndex].name
        })
    }

    render() {
        return (
            <div className="search-bar">
                <ul>
                    <li className="search-item"><DetailFeild onClick={this.expendSearchBar} isExpend={this.state.isExpend} /></li>
                    <li className="search-item"><SearchBox handleSearchTextChange={this.handleSearchTextChange} /></li>
                    <li className="search-item"><SearchBtn search={this.search} /></li>
                    <li className="search-item"><WriteArticleBtn /></li>
                    <li className="search-item"><ViewModeBtn /></li>
                    {this.state.isExpend ? <li className="search-item" style={{ marginTop: '5px', height: 'auto' }}><ExpendSearchArea handleColorTagChange={this.handleColorTagChange} categoryData={this.state.categorys} onCategoryChange={this.selectCategory}/></li> : null}
                </ul>
            </div>
        );
    }
}
export default SearchBar;
