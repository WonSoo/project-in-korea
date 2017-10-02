import React, { Component } from 'react';
import Dropdown from 'react-dropdown'

const options = [
    { value: 'comic', label: '만화' },
    { value: 'animation', label: '애니메이션'},
    { value: 'food', label: '식품'},
    { value: 'fashion', label: '패션'},
    { value: 'music', label: '음악'},
    { value: 'performance', label: '공연'},
    { value: 'environment', label: '환경'},
    { value: 'design', label: '디자인'},
    { value: 'publishing', label: '출판'},
    { value: 'journalism', label: '저널리즘'},
    { value: 'game', label: '게임'},
    { value: 'research', label: '연구'},
    { value: 'education', label: '교육'},
    { value: 'machinlearning', label: '머신러닝'},
    { value: 'vr', label: 'VR'},
    { value: 'ar', label: 'AR'},
    { value: 'iot', label: 'IOT'},
    { value: 'drone', label: '드론'},
    { value: '3dprinting', label: '3D프린팅'},
    { value: 'robot', label: '로봇공학'}
];
const defaultOption = options[0]

class CategorySelector extends Component {
    render() {
        return (
            <div>
                <Dropdown options={options} onChange={this.props.onChange} value={this.props.value} placeholder="분야를 선택하세요." />
            </div>
        );
    }
}
export default CategorySelector;
