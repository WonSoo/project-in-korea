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
import Axios from '../../util/customAxios';


const RecuritFormContainerStyle = styled.div`
    width: 980px;
    height: 100%;
    margin: 0 auto;
    margin-top: 60px;
    padding: 10px;
    padding-top: 60px;
    box-sizing: border-box;
    /* border: solid black 1px; */
    /* background: gray; */
`;

const RecuritTable = styled.table`
    width: 100%;
`

const RecuritTableTr = styled.tr`
    padding: 10px;
`

const GridColumnHeader = styled.h4`
  display: inline-block;
  vertical-align: top;
`

class RecuritWriteForm extends Component {

  constructor(props) {
    super(props);
    this.colorTagList = [];
    this.state = {
      editorState: {}
    }

    this.handleColorTagChange = this.handleColorTagChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    });
  }

  handleColorTagChange(list) {
    this.colorTagList = list;
  }

  uploadImageCallBack(file) {
    let config = {
      headers: {
        Authorization: 'Client-ID 8d26ccd12712fca',
      }
    }

    let data = new FormData();
    data.append('image', file);

    return Axios.post('https://api.imgur.com/3/image', data)
      .then(function (response) {
        console.log(response);
        return response
      }).catch(function (error) {
        console.log(error);
      });

    // return new Promise(
    //   (resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'https://api.imgur.com/3/image');
    //     xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    //     const data = new FormData();
    //     data.append('image', file);
    //     xhr.send(data);
    //     xhr.addEventListener('load', () => {
    //       const response = JSON.parse(xhr.responseText);
    //       resolve(response);
    //     });
    //     xhr.addEventListener('error', () => {
    //       const error = JSON.parse(xhr.responseText);
    //       reject(error);
    //     });
    //   }
    // );
  }

  render() {
    return (
      <RecuritFormContainerStyle>
        <Container>
          <Grid columns="equal" stackable >
            <Grid.Row stretched>
              <Grid.Column width={12} verticalAlign='middle'>
                <RecuriteHeaderInput />
                <br />
                <RecuritPurposeInput />
              </Grid.Column>
              <Grid.Column width={4} verticalAlign='middle'>
                <RecuritPosterInput />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal" stackable >
              <Grid.Column width={16} verticalAlign='middle'>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>프로젝트 기간 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "30%", margin: "0 10px" }}><RecuritDateInput /></div>
                <span>개월</span>
              </Grid.Column>
              <Grid.Column width={5}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>태그 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "70%", margin: "0 10px" }}><RecuritTagInput /></div>
              </Grid.Column>

              <Grid.Column width={5}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>컬러 태그 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "60%", margin: "0 10px" }}><ColorTagSelector onChange={this.handleColorTagChange} /></div>
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>작업 형태 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "60%", margin: "0 10px" }}><RecuritOnOffline /></div>
              </Grid.Column>

              <Grid.Column width={8}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>급여 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "60%", margin: "0 10px" }}><RecuritPayInput /></div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <span><GridColumnHeader style={{ display: "inline-block" }}>모집 기간 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "60%", margin: "0 10px" }}><RecuritDuring /></div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16} verticalAlign='bottom'>
                <span><GridColumnHeader style={{ display: "inline-block" }}>필요 직군 : </GridColumnHeader></span>
                <div style={{ display: "inline-block", width: "60%", margin: "0 10px" }}><RecuritJob /></div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid.Row>
            <Grid.Column>
              <Editor
                editorStyle={{ border: "1px solid #F1F1F1", height: "300px" }}
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
        </Container>
        {/* <RecuritTable>
            <RecuritTableTr>
              <td style={{ width: "80%" }}>
                <RecuriteHeaderInput />
              </td>
              <td rowspan="2">
                <RecuritPosterInput />
              </td>
            </RecuritTableTr>
            <RecuritTableTr>
              <td>
                <RecuritPurposeInput />
              </td>
            </RecuritTableTr>
          </RecuritTable>
          <RecuritFirstContainer />
          <RecuritSecondContainer /> */}
      </RecuritFormContainerStyle>
    );
  }
}

export default RecuritWriteForm