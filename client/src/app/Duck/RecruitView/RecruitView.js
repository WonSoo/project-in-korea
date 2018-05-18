import React, { Component } from 'react';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment, Input, Dropdown, Label, List, Table } from 'semantic-ui-react'
import ProjectDescription from './ProjectDescription';
import ProjectName from './ProjectName';
import styled from 'styled-components';
import JobGroup from './JobGroup';
import ProjectPoster from './ProjectPoster';
import ProjectArticle from './ProjectArticle';
import Axios from '../../util/customAxios'
import ColorTag from './ColorTag';

const GridColumnHeader = styled.h4`
  display: inline-block;
  vertical-align: middle;
  font-size: 12pt;
  margin-right: 5px;
  width: 100px;
  line-height: 30px;
`
const RecuritFormContainerStyle = styled.div`
    /* width: 980px; */
    height: 100%;
    margin: 0 auto;
    margin-top: 60px;
    padding: 10px;
    padding-top: 60px;
    box-sizing: border-box;
    /* border: solid black 1px; */
    background: #DCE1E1;
`;

const ValueBox = styled.span`
  background: white;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  padding: 0 10px;
  width: 100px;
  text-align: center;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 200px 50px 200px 80px 200px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-top: 40px;
`

const DuringContainer = styled.div`
  grid-column-start: 2; 
  grid-column-end: 4; 
`

const DuringHeaderContainer = styled.div`
    grid-column-start: 1; 
    grid-column-end: 2; 

`

class RecruitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:
        {
          "_id": 11, "content": "<p></p>\n",
          "project_name": "",
          "project_purpose": "",
          "project_during": "1",
          "pay": "",
          "startDateObj": "2018-04-19T03:00:00.000Z",
          "endDateObj": "2018-05-14T03:00:00.000Z",
          "job_group": [{ "name": "필요 직군", "do": "역할" }],
          "time": "Mon Apr 16 23:34:30 KST 2018",
          "writer": null,
          colortags: {
            academic: 1,
            activity: 1,
            artistic: 1,
            modern: 1,
            public_interest: 1,
            technical: 0,
          }
        }

    }
  }


  loadArticle = () => {
    let ID = this.props.ID
    console.log(this)
    if (this.props.ID == null) {
      const { match: { params } } = this.props;
      ID = params.ID
    }

    Axios.get(`/recruit/${ID}`)
      .then(response => {
        this.setState({
          data: response.data
        })
      }).catch(err => {

      })
  }

  componentWillMount() {
    this.loadArticle()
  }

  onDelete = () => {
    Axios.delete('/recruit/' + this.state.data._id,)
    .then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error);
    });
  }

  onEdit = () => {
    document.location.href = '/Recruit/edit/' + this.state.data._id
  }

  render() {
    return (
      <RecuritFormContainerStyle>
        <Container style={{ width: "980px" }}>
          <div>
            <div style={{position: "relative", height: "60px"}}>
              <Button style={{ marginBottom: "20px"}} color="teal" onClick={this.onDelete}>글 삭제</Button>
              <Button style={{ marginBottom: "20px"}} color="teal" onClick={this.onEdit}>글 수정</Button>
            </div>
            <div style={{ width: "calc(100% - 202px)", display: "inline-block", marginRight: "10px", verticalAlign: "top" }}>
              <ProjectName>프로젝트 이름</ProjectName>
              <ProjectDescription>프로젝트 설명</ProjectDescription>
            </div>
            <ProjectPoster src="data:image/jpeg;base64,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" />
          </div>
          <GridContainer>

            <span><GridColumnHeader style={{ display: "inline-block" }}>프로젝트 기간</GridColumnHeader></span>
            <ValueBox>1 개월</ValueBox>

            <span><GridColumnHeader style={{ display: "inline-block" }}>태그</GridColumnHeader></span>
            <ValueBox>저널리즘</ValueBox>

            <span style={{ display: "inline-block" }}><GridColumnHeader>컬러 태그</GridColumnHeader></span>
            {/* <ValueBox>혁신적인</ValueBox> */}
            <ColorTag colortags={this.state.data.colortags} />

            <span><GridColumnHeader style={{ display: "inline-block" }}>작업 형태</GridColumnHeader></span>
            <ValueBox>오프라인</ValueBox>

            <span><GridColumnHeader style={{ display: "inline-block" }}>급여</GridColumnHeader></span>
            <ValueBox>1년에 1원</ValueBox>

            <DuringHeaderContainer>
              <span><GridColumnHeader style={{ display: "inline-block" }}>모집 기간</GridColumnHeader></span>
            </DuringHeaderContainer>
            <DuringContainer>
              <div style={{ display: "inline-block", }}><ValueBox>2018.04.17</ValueBox> ~ <ValueBox>2018.05.18</ValueBox></div>
            </DuringContainer>

          </GridContainer>
          <div style={{ display: "inline-block", width: "100%", marginTop: "10px", verticalAlign: "middle" }}>
            <JobGroup jobs={this.state.data.job_group} />
          </div>

          <ProjectArticle>
            <p>여러분을 모집합니다.</p>
          </ProjectArticle>

        </Container>
      </RecuritFormContainerStyle>
    );
  }
}

export default RecruitView