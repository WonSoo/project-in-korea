import React, { Component } from 'react';
import ColorTag from './ColorTag';
import styled from 'styled-components';

const ColorTagName = styled.span`
    font-size: 14px;    
    line-height: 14px;
`;

const SizedSelect = styled.select`
    width: 120px;
    height: 30px;
    background: ${props => props.backgroundColor};
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    color: "balck";
`;

class ColorTagSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorList: [],
      isExpand: false,
      backgroundColor: "#ffffff",
      resultValue: "test",
      value: {
        activity: 0,
        technical: 0,
        academic: 0,
        public_interest: 0,
        artistic: 0,
        modern: 0
      }
    }

    this.addColor.bind(this);
    this.removeColor.bind(this);
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return { h: h, s: s, l: l };
  }

  /**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
  hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
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

  addColor(color) {
    if (this.state.colorList.length < 5) {
      const newColorList = [...this.state.colorList, color];
      let newHexColor = color
      if (newColorList.length > 0) {
        newHexColor = this.colorMixAdditive(newColorList)
      }
      
      const newValue = JSON.parse(JSON.stringify(this.state.value));
      newValue[this.toAdjective(color)]++;
      this.setState({
        colorList: newColorList,
        backgroundColor: newHexColor,
        value: newValue
      });
      this.props.onChange({
        target: {
          name: this.props.name,
          value: newValue
        }
      });

    }
  };

  removeColor2(index) {
    this.setState({
      colorList: this.state.colorList.splice(index, 1)
    })
  };

  removeColor = (index) => {
    const color = this.state.colorList[index];
    let array = this.state.colorList;
    array.splice(index, 1);
    const newColorList = array;
    let newHexColor = '#ffffff'
    if (newColorList.length > 0) {
      newHexColor = this.colorMixAdditive(newColorList)
    }

    const newValue = JSON.parse(JSON.stringify(this.state.value));
    newValue[this.toAdjective(color)]++;
    this.setState({
      colorList: array,
      backgroundColor: newHexColor,
      value: newValue
    });
    this.props.onChange({
      target: {
        name: this.props.name,
        value: newValue
      }
    });
  }

  ColorTagSelectorExpandClose = () => {
    this.setState({
      isExpand: !this.state.isExpand
    })
  }

  toAdjective = (code) => {
    switch (code) {
      case '#ff000f':
        return 'activity'
      case '#0050ff':
        return 'technical'
      case '#f19914':
        return 'academic'
      case '#64ff00':
        return 'public_interest'
      case '#fdf21e':
        return 'artistic'
      case '#7e00ff':
        return 'modern'
    }
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

  render() {
    const listItems = this.state.colorList.map((color, index) =>
      <li key={"" + color + index}><ColorTag color={color} index={index} onClick={this.removeColor} /></li>
    );
    return (
      <div className={this.props.className}>
        <SizedSelect value={"시대적인"} onClick={this.ColorTagSelectorExpandClose} backgroundColor={this.state.backgroundColor}>
          <option style={{ display: "none" }} value="시대적인">시대적인</option>
        </SizedSelect>
        {
          this.state.isExpand ?
            <div style={{ position: "absolute", zIndex: 100 }}>
              <table className="color-tag-table">
                <tr>
                  <td style={{ backgroundColor: "#ff000f" }} onClick={() => this.addColor("#ff000f")}><ColorTagName>활동적인</ColorTagName></td>
                  <td style={{ backgroundColor: "#0050ff" }} onClick={() => this.addColor("#0050ff")}><ColorTagName>기술적인</ColorTagName></td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f19914" }} onClick={() => this.addColor("#f19914")}><ColorTagName>학구적인</ColorTagName></td>
                  <td style={{ backgroundColor: "#64ff00" }} onClick={() => this.addColor("#64ff00")}><ColorTagName>공익적인</ColorTagName></td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#fdf21e" }} onClick={() => this.addColor("#fdf21e")}><ColorTagName>예술적인</ColorTagName></td>
                  <td style={{ backgroundColor: "#7e00ff" }} onClick={() => this.addColor("#7e00ff")}><ColorTagName>시대적인</ColorTagName></td>
                </tr>
              </table>
              <ul className="clean-list color-tag-selected">
                {listItems}
              </ul>
            </div>
            : null
        }
      </div>
    );
  }
}
export default ColorTagSelector;