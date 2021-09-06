import { useEffect, useState } from 'react';

import AffectedList from '../../components/affectedLimb/affectedLimbList'
import Addaffected from '../../components/affectedLimb/addAffectedLimb'
import style1 from '../../App.module.css'
import {toast} from 'react-toastify'


const Home = () => {
const [state,setState]=useState({
  affectedlimb:[]
}) 
let getAffectedLimb = async () => {
    try {
      const response = await fetch('//localhost:8080/affectedlimb');
      const result = await response.json();

        const affectedLimb = result.result;
        setState({affectedlimb:affectedLimb});

    } catch (err) {
      setState({ error_message: err })
    }
  }

  let createAffectedLimb = async(name)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/affectedlimb';
    try{
   
      await fetch(url,{body,method:'post',
        headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }});
       toast.success('added')
       getAffectedLimb();
      }catch(e){
    toast.error('error')
      }

  }

  let updateAffectedLimb = async(name,id)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/affectedlimb/'+id;
    await fetch(url,{body,method:'put',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getAffectedLimb();
  }
  let deleteInjured=async(id)=>{
    let url='http://localhost:8080/affectedlimb/'+id;
    let bool=window.confirm('are u sure')
    bool && 
    await fetch(url,{method:'delete'});
    getAffectedLimb();
  }


useEffect(()=>{
getAffectedLimb();
},[]);

    return ( 
      <div className="patientprofile">

      <div className="header">
          <h2>AFFECTED LIMB</h2>
      </div>
      <center>
      

      <Addaffected
              createAffectedLimb={createAffectedLimb}
            />
</center> 
<center className={style1.centerList}>

<AffectedList
     affectedlimbs={state.affectedlimb}
     updateAffectedLimb={updateAffectedLimb}
     deleteAffectedLimb={deleteInjured}
/>
</center>
    </div>
      );
}
 
export default Home;