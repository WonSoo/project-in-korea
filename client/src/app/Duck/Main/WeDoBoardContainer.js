import React, { PureComponent } from 'react';
import styled from 'styled-components';
import RecruitPoster from './RecruitPoster';
import RecruitPosterContainer from './RecruitPosterContainer';

const Container = styled.div`
    text-align: center;
    height: 570px;
    overflow: hidden;
`;

export default () => (
    <Container>
        <img src="http://14textures.com/wp-content/uploads/2015/06/colonial-red-brick-texture.jpg" style={{width: "100%", filter: "grayscale(0.9)", position: "absolute", zIndex: "0", left: 0}}/>
        <RecruitPosterContainer>
                    <RecruitPoster img={"http://cphoto.asiae.co.kr/listimglink/6/2017072708344776805_1.jpg"} />
                    <RecruitPoster img={"http://artnews.me/wp-content/uploads/2017/08/artnews-1.jpg"} />
                    <RecruitPoster img={"http://www.urbanbrush.net/web/wp-content/uploads/edd/2017/11/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-11-21-%EC%98%A4%ED%9B%84-6.14.09.png"} />
                    <RecruitPoster img={"http://cfile29.uf.tistory.com/image/2125BE4157FF1440236746"} />
                    <RecruitPoster img={"http://mblogthumb2.phinf.naver.net/MjAxNzAyMTJfMTQ2/MDAxNDg2ODM1MjUwNjEx.PDwVPnjRzJysUejCjcw3rhDLyXdqqXdKs68P2b_Nu4cg.gK1pVCzG8kbsClGir5rRg50oj9xKKjOQiT46e3UZer0g.JPEG.dragonz21/%ED%8F%AC%EC%8A%A4%ED%84%B0_%EB%94%94%EC%9E%90%EC%9D%B8_%EB%9D%BC%EB%9D%BC%EB%9E%9C%EB%93%9C_%EB%82%98%EB%9D%BC%EB%B3%84_%ED%8F%AC%EC%8A%A4%ED%84%B0_%EB%94%94%EC%9E%90%EC%9D%B8_16_%EC%A2%85_%281%29.jpg?type=w800"} />
                    <RecruitPoster img={"https://notefolio.net/data/img/86/ee/86eeb3a98d01e54ac80a3cd1772d60c2acb7843304c7994b7553846c87932a5e_v1.jpg"} />
                    <RecruitPoster img={"http://www.meditationuniv.org/wp-content/uploads/2012/12/17poster.jpg"} />
                    <RecruitPoster img={"http://mypnu.net/files/attach/images/107881/389/740/005/833948fd0b0e48e21674e9f634d0c451.jpg"} />
                    <RecruitPoster img={"http://stu.ssu.ac.kr/xe/files/attach/images/107/518/001/6c32ab760afa6498800f65c82177bf1e.gif"} />
                    <RecruitPoster img={"http://pds27.egloos.com/pds/201306/25/94/f0339294_51c98e467c10f.png"} />
                </RecruitPosterContainer>
    </Container>
)