import {useEffect, useState } from 'react';

import DoctorList from '../../components/doctor/doctorList'
import AddDoctor from '../../components/doctor/addDoctor'
import style1 from '../../App.module.css'


import {toast} from'react-toastify'


const Doctor = () => {
const [state,setState]=useState({
  doctor:[]
}) 
let getDoctor = async () => {
    try {
      const response = await fetch('//localhost:8080/doctor');
      const result = await response.json();

        const doctor = result.result;
        setState({doctor:doctor});

    } catch (err) {
      setState({ error_message: err })
    }
  }

  let createDoctor = async(name,phoneNumber,percentage)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
        body.append('phoneNumber',phoneNumber);

        body.append('percentage',percentage);
        let url='http://localhost:8080/doctor';
try{
   
  await fetch(url,{body,method:'post',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
   toast.success('added')
    getDoctor();
  }catch(e){
toast.error('error')
  }
  }

  let updateDoctor = async(name,phoneNumber,percentage,id)=>{
    console.log({name,phoneNumber,percentage,id});
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
        body.append('phoneNumber',phoneNumber);

        body.append('percentage',percentage);

    let url='http://localhost:8080/doctor/'+id;
    await fetch(url,{body,method:'put',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getDoctor();
  }

  let deleteDoctor=async(id)=>{
    let url='http://localhost:8080/doctor/'+id;
    let bool=window.confirm('are u sure')
    bool && 
    await fetch(url,{method:'delete'});
    getDoctor();
    
    
  }


useEffect(()=>{
getDoctor();
},[]);

    return ( 
<div className="patientprofile">

<div className="header">
    <h2>DOCTOR</h2>
</div>
      <center>
      

      <AddDoctor
              createDoctor={createDoctor}
            />
</center>
<center className={style1.centerList}>


<DoctorList
     doctors={state.doctor}
     updateDoctor={updateDoctor}
     deleteDoctor={deleteDoctor}
/>

</center>
    </div>
      );
}
 
export default Doctor;