import React, { PureComponent } from 'react';
import styled from 'styled-components';

const __DefaultProfile__Container = styled.div`
  height: 180px;
  width: 180px;
  border-radius: 100%;
  background: #F3F3F3;
  text-align: center;
`

const __DefaultProfile__Name = styled.span`
  line-height: 180px;
  font-size: 2rem;
`

class DefaultProfile extends PureComponent {

  extractShortenName = (name) => {
    let result = '';
    const englishCase = /^[A-Za-z0-9]*$/;
    const firstLetter = name[0]

    if (englishCase.test(firstLetter)) {
      const nameBlocks = name.split(' ');

      for (let block of nameBlocks) {
        if (result.length > 1) {
          break;
        }
        block = Array.from(block)

        result += block.shift().toUpperCase();
        console.log(result);

        for (let letter of block) {
          if (result.length > 1) {
            break;
          }
          if (letter == letter.toUpperCase()) {
            result += letter.toUpperCase();
            console.log(result);
          }

        }
      }

    } else {
      result += name[0];
    }

    return result
  }

  render() {
    return (
      <__DefaultProfile__Container>
        <__DefaultProfile__Name>{this.extractShortenName(this.props.name)}</__DefaultProfile__Name>
      </__DefaultProfile__Container>
    );
  }
}

export default DefaultProfile