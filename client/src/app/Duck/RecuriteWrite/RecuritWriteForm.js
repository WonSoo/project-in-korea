import React, { Component } from 'react';
import RecuritFirstContainer from './RecuritFirstContainer';
import styled from 'styled-components';
import RecuritSecondContainer from './RecuritSecondContainer';
import { RecuriteHeaderInput } from './RecuriteHeaderInput.';
import { RecuritPosterInput } from './RecuritPosterInput';
import { RecuritPurposeInput } from './RecuritPurposeInput';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment, Input, Dropdown, Label, List, Table } from 'semantic-ui-react'
import { RecuritDateInput } from './RecuritDateInput';
import { RecuritTagInput } from './RecuritTagInput';
import { RecuritOnOffline } from './RecuritOnOffline';
import { RecuritPayInput } from './RecuritPayInput';
import RecuritDuring from './RecuritDuring';
import RecuritJob from './RecuritJob';
import ColorTagSelector from './ColorTagSelector';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw } from 'draft-js';
import ImageUploader from './ImageUploader';
import Axios from '../../util/customAxios';
import './react_dates_overrides.css';
import RecruitProto from '../../Protos/recruit_pb.js'
import FileProto from '../../Protos/file_pb.js'

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

const RecuritTable = styled.table`
    width: 100%;
`

const RecuritTableTr = styled.tr`
    padding: 10px;
`

const GridColumnHeader = styled.h4`
  display: inline-block;
  vertical-align: middle;
  font-size: 12pt;
  margin-right: 5px;
`

class RecuritWriteForm extends Component {

  constructor(props) {
    super(props);
    this.colorTagList = [];
    this.state = {
      editorState: EditorState.createEmpty(),
      content: ''
    }

    this.handleColorTagChange = this.handleColorTagChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  uploadPoster = (file) => {
    let data = new FormData();
    data.append('image', file);

    Axios.post('/file', data, {
      responseType: 'arraybuffer'
    })
      .then((response) => {
        console.log(response);
        const fileMessage = FileProto.FileMessage.deserializeBinary(response.data)

        this.setState({
          main_image: fileMessage.getFilesList()[0]
        })
      }).catch(function (error) {
        console.log(error);
      });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
    console.log(e)
  }

  onRecuritDuringChange = ({ startDate, endDate }) => {
    this.setState({ startDateObj: startDate, endDateObj: endDate })
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  }

  handleColorTagChange(list) {
    this.colorTagList = list;
  }

  uploadImageCallBack(file) {
    let data = new FormData();
    data.append('image', file);

    return Axios.post('/file', data, {
      responseType: 'arraybuffer'
    })
      .then(function (response) {
       const fileMessage = FileProto.FileMessage.deserializeBinary(response.data)

        const result = {
          data: {
            link: "https://1ed8662c.ngrok.io/api/file/" + fileMessage.getFilesList()[0]
          }
        }
        console.log(result)
        return result
      }).catch(function (error) {
        console.log(error);
      });
  }

  onSubmit = async () => {
    const recruitPost = new RecruitProto.RecruitPost()

    recruitPost.setContent(this.state.content)
    recruitPost.setProjectname(this.state.projectName)
    recruitPost.setProjectpurpose(this.state.projectPurpose)
    recruitPost.setProjectduring(this.state.projectDuring)
    recruitPost.setCategory(this.state.category)
    recruitPost.setColortagsList(this.state.colortags)
    recruitPost.setPay(this.state.pay)
    recruitPost.setStartdate(new Date(this.state.startDateObj).getTime())
    recruitPost.setEnddate(new Date(this.state.endDateObj).getTime())
    recruitPost.setPosterimagepath(this.state.main_image)

    const jobGroups = this.state.jobGroup.map(job => {
      const tmpJobGroup = new RecruitProto.RecruitPost.JobGroup()
      tmpJobGroup.setName(job.name)
      tmpJobGroup.setDo(job.do)

      return tmpJobGroup
    })
    recruitPost.setJobgroupsList(jobGroups)

    const bytes = recruitPost.serializeBinary()
    var blob = new Blob([bytes])
    try {
      const res = await Axios.post('/recruit', blob, {
        responseType: 'arraybuffer'
      })

      console.log(res)
      const StatusMessage = RecruitProto.ResponseRecruitMessage.deserializeBinary(res.data)
      console.log(StatusMessage.getMessage())
      if (StatusMessage.getIssuccess()) {
        document.location.href = '/Recurit/' + StatusMessage.getId()
      }
    } catch (err) {
      console.log(err)
    }


    // const result = JSON.parse(JSON.stringify(this.state));
    // console.log(result)
    // result.startDate = new Date(result.startDateObj).getTime()
    // result.endDate = new Date(result.endDateObj).getTime()

    // delete result.startDateObj
    // delete result.endDateObj
    // delete result.editorState

    // console.log(result)
    // Axios.post('/recruit', this.state)
    //   .then(function (response) {
    //     console.log(response)
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <RecuritFormContainerStyle>
        <Container style={{ width: "980px" }}>
          <Grid columns="equal" stackable >
            <Grid.Row stretched>
              <Grid.Column width={16} verticalAlign='middle'>
                <div>
                  <div style={{ width: "calc(100% - 202px)", display: "inline-block", marginRight: "10px", verticalAlign: "top" }}>
                    <RecuriteHeaderInput placeholder="프로젝트 이름" name="projectName" value={this.state.projectName} onChange={this.onInputChange} />
                    <RecuritPurposeInput name="projectPurpose" value={this.state.projectPurpose} onChange={this.onInputChange} />
                  </div>
                  <RecuritPosterInput onChange={this.uploadPoster} />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal" stackable >
              <Grid.Column width={16} verticalAlign='middle'>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>프로젝트 기간 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", margin: "0 10px" }}><RecuritDateInput name="projectDuring" value={this.state.projectDuring} onChange={this.onInputChange} /></div>
              </Grid.Column>
              <Grid.Column width={5}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>태그 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "120px", margin: "0 10px" }}><RecuritTagInput name="category" value={this.state.category} onChange={this.onInputChange} /></div>
              </Grid.Column>
              <Grid.Column width={5}>
                <p style={{ lineHeight: "30px", display: "inline-block", verticalAlign: "top" }}><GridColumnHeader style={{ display: "inline-block" }}>컬러 태그 : </GridColumnHeader></p>
                <div style={{ display: "inline-block", width: "60%", margin: "0 10px" }}><ColorTagSelector name="colortags" onChange={this.onInputChange} /></div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>작업 형태 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "120px", margin: "0 10px" }}><RecuritOnOffline name="work_type" onChange={this.onInputChange} value={this.state.work_type} /></div>
                <span><GridColumnHeader style={{ display: "inline-block", marginLeft: "10px" }}>급여 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "120px", margin: "0 10px" }}><RecuritPayInput name="pay" onChange={this.onInputChange} value={this.state.pay} /></div>
              </Grid.Column>

              <Grid.Column width={8}>

              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>모집 기간 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "60%", margin: "0 10px" }}><RecuritDuring name="recurit_during" onChange={this.onRecuritDuringChange} startDate={this.state.startDateObj} endDate={this.state.endDateObj} /></div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16} verticalAlign='bottom'>
                <span><GridColumnHeader style={{ display: "inline-block", verticalAlign: "top" }}>필요 직군 : </GridColumnHeader></span>
              </Grid.Column>
              <Grid.Column width={16}>
                <div style={{ display: "inline-block", width: "100%", marginTop: "10px", verticalAlign: "middle" }}><RecuritJob name="jobGroup" onChange={this.onInputChange} value={this.state.jobGroup} /></div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid.Row>
            <Grid.Column style={{ marginBottom: "30px" }}>
              <Editor
                editorStyle={{ border: "1px solid #F1F1F1", height: "300px", background: "white" }}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                editorState={this.state.editorState}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ position: "relative", height: "50px" }}>
            <Grid.Column width={2} style={{ position: "absolute", right: 0, display: "inline" }}>
              <Button color="teal" onClick={this.onSubmit}>작성완료</Button>
            </Grid.Column>
          </Grid.Row>
        </Container>
      </RecuritFormContainerStyle>
    );
  }
}

export default RecuritWriteForm