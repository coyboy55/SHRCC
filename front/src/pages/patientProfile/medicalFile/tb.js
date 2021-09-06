import React from 'react';
import { useParams } from "react-router-dom";

import Menu from '../../../components/Menu'
import React from 'react';
import { useParams } from "react-router-dom";
// import DailyTx from '../../dailyTx/DailyTx';
// import History from '../../documents/History';
// import Test from '../../documents/test';
// import Report from '../../documents/report';

// export default function PatientForm(props) {
//        let patientID=props.patientID;
//             let { page } = useParams();
//             page = parseInt(page);

//             if (page === 0) return <><Menu patientID={patientID}/>< DailyTx patientID={patientID} /></>
//             else if (page === 1) return <><Menu patientID={patientID}/><History patientID={patientID} /></>
//             else if (page === 2) return <><Menu patientID={patientID}/><Report patientID={patientID} /></>
//             else if (page === 3) return <><Menu patientID={patientID}/><Test patientID={patientID} /></>

// }