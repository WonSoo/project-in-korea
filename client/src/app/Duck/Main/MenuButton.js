import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const MenuStyle = styled.span`
    padding: 0px 10px 0px 10px;
    height: 60px;
    line-height: 60px;
    display:inline-block;
    box-sizing: border-box;
    /* vertical-align: middle; */
    font-weight: 900;
    color: black;
    &:hover {
        border-bottom: solid 3px #F36E6F;
        transition: all 0.2s ease-out;
    }
`;

export default (props) => {
    {console.log(props)}
    return <Link to={`/${props.to}`}><MenuStyle>{props.children}</MenuStyle></Link>
}