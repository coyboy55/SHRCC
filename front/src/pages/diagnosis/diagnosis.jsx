import {useEffect, useState } from 'react';

import DiagnosisList from '../../components/diagnosis/diagnosisList'
import AddDiagnosis from '../../components/diagnosis/adddiagnosis'
import style1 from '../../App.module.css'


const Diagnosis = () => {
const [state,setState]=useState({
  diagnosis:[]
}) 
let getDiagnosis = async () => {
    try {
      const response = await fetch('//localhost:8080/diagnosis');
      const result = await response.json();

        const diagnosis = result.result;
        setState({diagnosis:diagnosis});

    } catch (err) {
      setState({ error_message: err })
    }
  }

  let createDiagnosis = async(name)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/diagnosis';
    await fetch(url,{body,method:'post',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getDiagnosis();
  }

  let updateDiagnosis = async(name,id)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/diagnosis/'+id;
    await fetch(url,{body,method:'put',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getDiagnosis();
  }
  let deleteDiagnosis=async(id)=>{
    let url='http://localhost:8080/diagnosis/'+id;
    await fetch(url,{method:'delete'})
    getDiagnosis();
  }


useEffect(()=>{
getDiagnosis();
},[]);
console.log(state);
    return ( 
      <div className="patientprofile">

      <div className="header">
          <h2>DIAGNOSIS</h2>
      </div>
      <center>
      

      <AddDiagnosis
              createDiagnosis={createDiagnosis}
            />
</center>

<center className={style1.centerList}>
<DiagnosisList
     diagnosiss={state.diagnosis}
     updateDiagnosis={updateDiagnosis}
     deleteDiagnosis={deleteDiagnosis}
/>
</center>
    </div>
      );
}
 
export default Diagnosis;