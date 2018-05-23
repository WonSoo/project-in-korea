import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../Duck/Main/Header';
import RecruitViewContainer from '../../Duck/RecruitView/RecruitView';
import styled from 'styled-components';

function createWarning(funcName) {
    return () => console.warn(funcName = ' is not defined');
}


const JobTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 5px;
`;

const JobTableTr = styled.tr`
    margin-top: 5px;
    border: 1px solid black;
    text-align: left;
`;

const JobTableTd = styled.td`
    background: white;
    line-height: 30px;
    padding-left: 10px;
`;

const JobTableTh = styled.th`
    line-height: 1.28571429em;
    margin: calc(2rem - .14285714em) 0 1rem;
    font-weight: 700;
    font-size: 12pt;
`

class JobGroup extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const jobToTr = this.props.jobs.map((job, index) => (
            <JobTableTr>
                <JobTableTd>{job.name}</JobTableTd>
                <td></td>
                <JobTableTd>{job.do}</JobTableTd>
                <td></td>
                <JobTableTd style={{background: "#FBC1C0", textAlign: "center", padding: 0}}>같이 하기</JobTableTd>
            </JobTableTr>
        ))
        return (
            <div>
                <JobTable style={{width: "100%", borderCollapse: "separate",}}>
                    <JobTableTr>
                        <JobTableTh style={{width: "300px", height: "30px"}}>필요 직군</JobTableTh>
                        <JobTableTh><p style={{width:"10px"}}></p> </JobTableTh>
                        <JobTableTh style={{width: "560px", height: "30px"}}>수행 역할</JobTableTh>
                        <JobTableTh><p style={{width:"10px"}}></p> </JobTableTh>
                        <td style={{width: "100px"}}></td>
                    </JobTableTr>
                    {jobToTr}
                </JobTable>
            </div>
        );
    }
}

export default JobGroup