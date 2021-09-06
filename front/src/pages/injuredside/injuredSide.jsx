import {useEffect, useState } from 'react';

import Testlist from '../../components/injuredside/injuredList'
import Addinjured from '../../components/injuredside/addInjuredSide'
import style1 from '../../App.module.css'
import {toast} from 'react-toastify';


const Home = () => {
const [state,setState]=useState({
  contacts:[]
}) 
let getInjuredSide = async () => {
    try {
      const response = await fetch('//localhost:8080/injuredside');
      const result = await response.json();

        const contacts = result.result;
        setState({contacts:contacts});

    } catch (err) {
      setState({ error_message: err })
    }
  }

  let createInjuredSide = async(name)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/injuredside';
    try{
   
      await fetch(url,{body,method:'post',
        headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }});
       toast.success('added')
    getInjuredSide();
      }catch(e){
    toast.error('error')
      }

  }

  let updateInjuredSide = async(name,id)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/injuredside/'+id;
    await fetch(url,{body,method:'put',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getInjuredSide();
  }
  let deleteInjured=async(id)=>{
    let url='http://localhost:8080/injuredside/'+id;
    let bool=window.confirm('are u sure')
    bool && 
    await fetch(url,{method:'delete'});
    getInjuredSide();
  }


useEffect(()=>{
getInjuredSide();
},[]);

console.log(state);
    return ( 
      <div className="patientprofile">

      <div className="header">
          <h2>INJURED SIDE</h2>
      </div>
      <center>
      

      <Addinjured
              createInjuredSide={createInjuredSide}
            />
            </center>

<center className={style1.centerList}>
<Testlist
     contacts={state.contacts}
     updateInjured={updateInjuredSide}
     deleteInjured={deleteInjured}
/>
</center>
    </div>
      );
}
 
export default Home;