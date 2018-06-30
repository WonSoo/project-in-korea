import React, { PureComponent } from 'react';
import styled from 'styled-components';

let regions = "서울 대전 대구 울산 광주 부산 제주도 경기도 강원도 충북 충남 경북 경남 전북 전남"
regions = regions.split(' ').map((region, index) => {
    return {
        value: index,
        display: region
    }
})

const RecuritTagInputStyle = styled.select`
    width: 100%;
    height: 30px;
`;

export const AvailabeRegion = (props) => (
    <RecuritTagInputStyle {...props}>
        {
            regions.map(region => <option value={region.value}>{region.display}</option>)
        }
    </RecuritTagInputStyle>
)