import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ColorTagTooltip from './ColorTagTooltip';

const ValueBox = styled.span`
  background: ${props => props.background};
  height: 30px;
  line-height: 30px;
  display: inline-block;
  padding: 0 10px;
  width: 100px;
  text-align: center;
`

const ColorBoxContainer = styled.div`
  position: relative;
`

class ColorTag extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipOpen: false
    }
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }


  colorMixAdditive(colors) {
    let result = colors.map((color) => this.hexToRgb(color)).reduce((acc, cur) => {
      cur.r += acc.r;
      cur.g += acc.g;
      cur.b += acc.b;

      return cur
    });

    const cur = result;

    const diff = {
      r: 0,
      g: 0,
      b: 0
    }
    if (cur.r > 255) {
      diff.g = (cur.r - 255) / 2;
      diff.b = (cur.r - 255) / 2;

      // cur.r = 255
    }

    if (cur.g > 255) {
      diff.r += (cur.g - 255) / 2;
      diff.b += (cur.g - 255) / 2;

      // cur.g = 255
    }

    if (cur.b > 255) {
      diff.r += (cur.b - 255) / 2;
      diff.g += (cur.b - 255) / 2;

      // cur.b = 255
    }

    cur.r -= diff.r
    cur.g -= diff.g
    cur.b -= diff.b

    for (var color in cur) {
      cur[color] = Math.floor(cur[color])
      if (cur[color] < 0) {
        cur[color] = 0
      }
      if (cur[color] > 255)
        cur[color] = 255
    }

    result = cur;
    console.log(result)

    return `rgb(${result.r}, ${result.g}, ${result.b})`;
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

  toKorean = () => {
    const sortedByValueList = Object.keys(this.props.colortags).map(key => (
      {
        adjective: key,
        value: this.props.colortags[key]
      }
    )).sort((a, b) => {
      return b.value - a.value
    })

    console.log(sortedByValueList)
    const adjective = sortedByValueList[0].adjective

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

  calcBackground = () => {
    const result = [];

    Object.keys(this.props.colortags).map(key => {
      const count = this.props.colortags[key];

      for (let i = 0; i < count; i++) {
        result.push(this.toColorCode(key))
      }
    })

    return this.colorMixAdditive(result)
  }

  tooltipOpen = () => {
    this.setState({
      isTooltipOpen: true
    })
  }

  tooltipClose = () => {
    this.setState({
      isTooltipOpen: false
    })
  }

  render() {
    return (
      <ColorBoxContainer>
        {
          this.state.isTooltipOpen && <ColorTagTooltip colortags={this.props.colortags} />
        }
        <ValueBox onMouseOver={this.tooltipOpen} onMouseLeave={this.tooltipClose} background={this.calcBackground()}>
          {this.toKorean()}
        </ValueBox>
      </ColorBoxContainer>

    );
  }
}

export default ColorTag