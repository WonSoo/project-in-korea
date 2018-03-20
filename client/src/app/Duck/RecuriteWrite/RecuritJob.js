import React, { Component } from 'react';
import styled from 'styled-components';

const AddButtonContainer = styled.div`
    text-align: center;
    margin-top: 10px;
`

const AddButton = styled.span`
    /* width: 40px;
    height: 40px;
    margin: 0 auto; */
    color: white;
    font-size: 13pt;
    border-radius: 100px;
    border: solid 1px white;
`;

export default class RecuritJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [{
                name: "필요 직군",
                do: "역할"
            }]
        }

        this.jobOnChange = this.jobOnChange.bind(this);
        this.addJob = this.addJob.bind(this);
        this.removeJob = this.removeJob.bind(this);
    }

    jobOnChange(e, index) {
        let newJobs = [...[], ...this.state.jobs];
        newJobs[index][e.target.name] = e.target.value;
        this.setState({
            jobs: newJobs
        })
    }

    addJob() {
        this.setState({
            jobs: [
                ...this.state.jobs,
                {
                    name: "",
                    do: ""
                }
            ]
        })
    }

    removeJob(deleteIndex) {
        let newJobs = this.state.jobs.filter((job, index) => {
            if(index === deleteIndex) {
                return false;
            }
            return true;
        })
        this.setState({
            jobs: newJobs
        });

    }

    render() {
        const jobToTr = this.state.jobs.map((job, index) => (
            <tr>
                <td style={{width: "30%"}}><input placeholder="필요 직군" style={{width: "100%"}} name="name" onChange={(e) => {
                    this.jobOnChange(e, index)
                }} value={this.state.jobs[index].name} /></td>
                <td style={{width: "70%"}}><input placeholder="역할" style={{width: "100%"}} name="do" onChange={(e) => {
                    this.jobOnChange(e, index)
                }} value={this.state.jobs[index].do} /></td>
                <td>
                    <AddButton onClick={() => {
                        this.removeJob(index)
                    }}>-</AddButton>
                </td>
            </tr>
        ))
        return (
            <div>
                <table style={{width: "100%"}}>
                    {jobToTr}
                </table>
                <AddButtonContainer>
                <AddButton onClick={this.addJob}>+</AddButton>
                </AddButtonContainer>
            </div>
        )
    }
}