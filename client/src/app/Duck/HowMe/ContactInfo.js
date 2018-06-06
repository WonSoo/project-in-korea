import React, { PureComponent } from 'react';
import styled from 'styled-components';

const __Contact__Container = styled.span`
  margin-right: 10px;
`

const __Contact__ServiceName = styled.span`
  font-weight: 900;
`

function contactIconMapper(name) {
  switch (name) {
    case 'kakaotalk':
      return '㉸'
    case 'facebook':
      return 'ⓕ'
    case 'email':
      return '@'
    case 'phone':
      return '☎'
  }
}

export default ({service, value}) => (
  <__Contact__Container>
    <__Contact__ServiceName>{contactIconMapper(service)}</__Contact__ServiceName>: {value}
    
  </__Contact__Container>
)