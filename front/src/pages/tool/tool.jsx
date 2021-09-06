import { useEffect, useState } from 'react';

import ToolList from '../../components/tool/toolList'
import AddTool from '../../components/tool/addTool'


import style1 from '../../App.module.css'
import {toast} from 'react-toastify';


const Tool = () => {
const [state,setState]=useState({
  tool:[]
}) 
let getTool = async () => {
    try {
      const response = await fetch('//localhost:8080/tool');
      const result = await response.json();

        const tool = result.result;
        setState({tool:tool});

    } catch (err) {
      setState({ error_message: err })
    }
  }

  let createTool = async(name)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/tool';
    try{
   
      await fetch(url,{body,method:'post',
        headers: {
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }});
       toast.success('added')
  getTool();
      }catch(e){
    toast.error('error')
      }
  
  }

  let updateTool = async(name,id)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
    let url='http://localhost:8080/tool/'+id;
    await fetch(url,{body,method:'put',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getTool();
  }
  let deleteTool=async(id)=>{
    let url='http://localhost:8080/tool/'+id;
    let bool=window.confirm('are u sure')
    bool && 
    await fetch(url,{method:'delete'});
    getTool();
  }


useEffect(()=>{
getTool();
},[]);
console.log(state);
    return ( 
      <div className="patientprofile">

      <div className="header">
          <h2>TOOL</h2>
      </div>
      <center>
      

      <AddTool
              createTool={createTool}
            />
</center>
<center className={style1.centerList}>  

<ToolList
     tools={state.tool}
     updateTool={updateTool}
     deleteTool={deleteTool}
/>
</center>
    </div>
      );
}
 
export default Tool;