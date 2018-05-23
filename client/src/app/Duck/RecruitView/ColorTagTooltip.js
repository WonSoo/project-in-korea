import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ValueBox = styled.span`
  background: ${props => props.background};
  height: 30px;
  line-height: 30px;
  display: inline-block;
  padding: 0 10px;
  width: 100px;
  text-align: center;
`

const ToolTipContainer = styled.ul`
  background: white;
  padding: 10px;
  position: absolute;
  bottom: 40px;
  box-shadow: 10px 10px 24px -7px rgba(0,0,0,0.75);

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-top: 16px solid #fff;
    bottom: -14px;
    left: 7px;
  }
`

class ColorTagTooltip extends PureComponent {
  constructor(props) {
    super(props);

  }

  toColorCode = (adjective) => {
    switch (adjective) {
      case 'activity':
        return '#ff000f'
      case 'technical':
        return '#0050ff'
      case 'academic':
        return '#f19914'
      case 'public_interest':
        return '#64ff00'
      case 'artistic':
        return '#fdf21e'
      case 'modern':
        return '#7e00ff'
    }
  }

  toKorean = (adjective) => {

    switch (adjective) {
      case 'activity':
        return '활동적인'
      case 'technical':
        return '기술적인'
      case 'academic':
        return '학구적인'
      case 'public_interest':
        return '공익적인'
      case 'artistic':
        return '예술적인'
      case 'modern':
        return '시대적인'
    }
  }



  colorTagBox = ({color, value}) => (
    <li><ValueBox background={color}>{value}</ValueBox></li>
  )

  colortagsToArray = (colortags) => {
    const result = [];

   Object.keys(colortags).map(key => {
      const count = colortags[key];
      for (let i = 0; i < count; i++) {
        result.push(key)
      }
    })

    console.log(result)
    return result
  }

  render() {
    return (
      <ToolTipContainer>
        {
          this.colortagsToArray(this.props.colortags).map(adjective => <this.colorTagBox color={this.toColorCode(adjective)} value={this.toKorean(adjective)} />)
        }
      </ToolTipContainer>
    );
  }
}

export default ColorTagTooltip