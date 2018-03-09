import React, { Compoent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: space-around;
`

const SnsLogo = styled.div`
    width: 60px;
    height: 40px;   
    line-height: 40px;
    text-align: center;
    color: white;
`

const FButton = styled(SnsLogo)`
    background: #3B5998;
` 

const GButton = styled(SnsLogo)`
background: white;
color: black;
`  

const NButton = styled(SnsLogo)`
background: #02C300;
`  

const TButton = styled(SnsLogo)`
background: #1DA1F2;
`  

export default () => (
    <Container>
        <FButton>
            F
        </FButton>
        <GButton>
            G
        </GButton>
        <NButton>
            N
        </NButton>
        <TButton>
            t
        </TButton>
    </Container>
)