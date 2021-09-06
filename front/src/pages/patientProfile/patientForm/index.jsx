import { PinDropSharp } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Part0 from './parts/Part0';
import Part1 from './parts/Part1';
import SessionContext from '../../../components/session/SessionContext'

export default function PatientForm(props) {
    let { page,patientID } = useParams();
    page = parseInt(page);
const [affectedCL,setAffectedCL]=useState([]);
const [affectedCR,setAffectedCR]=useState([]);

const [smokingC,setSmokingC]=useState([]);
const [physC,setPhysC]=useState([]);

const {
  actions: { updateSession }
} = useContext(SessionContext);



let getPhysC=async()=>{
    let url=`http://localhost:8080/physPatient/${patientID}`
 let res=await fetch(url);
 let result=await res.json();
 if(result.success){
 setPhysC(result.result)  
 }
}
 let getSmokingC=async()=>{
  let url=`http://localhost:8080/smokingPatientS/${patientID}`
let res=await fetch(url);
let result=await res.json();
if(result.success){
  let result1=result.result
setSmokingC(result.result)  
updateSession({result1})
}
 
}




    let getAffectedLimbL=async()=>{
        let url=`http://localhost:8080/affectedLimbb/${patientID}/240`
     let res=await fetch(url);
     let result=await res.json();
     setAffectedCL(result.result)  
     
   }
   let getAffectedLimbR=async()=>{
    let url=`http://localhost:8080/affectedLimbb/${patientID}/3`
 let res=await fetch(url);
 let result=await res.json();
 setAffectedCR(result.result)  
}


   useEffect(()=>{
getAffectedLimbL()
getSmokingC()
getAffectedLimbR()
getPhysC();

const delayDebounceFn = setTimeout(() => {console.log(affectedCR);}, 2000); return () => clearTimeout(delayDebounceFn)
   },[])
    if (page === 0) return <Part0  setName={props.setName} patientID={patientID}/>
    else if (page === 1) return <Part1  physC={physC} smokingC={smokingC} state1={affectedCR} state={affectedCL} patientID={patientID}/>
}