import { Fragment, useContext, useEffect, useState } from 'react';
import SessionContext from '../../components/session/SessionContext'
import SmokingList from '../../components/smoking/smokingList'
import AddSmoking from '../../components/smoking/addSmoking'
import style1 from '../../App.module.css'
import {toast} from 'react-toastify';

const Smoking = () => {
const [state,setState]=useState({
  smoking:[]
}) 
let getSmoking = async () => {
    try {
      const response = await fetch('//localhost:8080/smoking');
      const result = await response.json();

        const smoking = result.result;
        setState({smoking:smoking});

    } catch (err) {
      setState({ error_message: err })
    }
  }

  let createSmoking = async(name)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/smoking';
    try{
   
      await fetch(url,{body,method:'post',
        headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }});
       toast.success('added')
      getSmoking();
      }catch(e){
    toast.error('error')
      }
   
  }

  let updateSmoking = async(name,id)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/smoking/'+id;
    await fetch(url,{body,method:'put',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getSmoking();
  }
  let deleteSmoking=async(id)=>{
    let url='http://localhost:8080/smoking/'+id;
    let bool=window.confirm('are u sure')
    bool && 
    await fetch(url,{method:'delete'});
    getSmoking();
  }


useEffect(()=>{
getSmoking();
},[]);
    return ( 
<div className="patientprofile">

<div className="header">
    <h2>SMOKING</h2>
</div>
     
      <center>

      <AddSmoking
              createSmoking={createSmoking}
            />
</center>
<center className={style1.centerList} >
<SmokingList
     smokings={state.smoking}
     updateSmoking={updateSmoking}
     deleteSmoking={deleteSmoking}
/>
</center>
    </div>
      );
}
 
export default Smoking;