import {useEffect, useState } from 'react';

import TestTypeList from '../../components/testType/testTypeList'
import AddtestType from '../../components/testType/addTestType'
import style1 from '../../App.module.css'
import {toast} from'react-toastify'


const TestType = () => {
const [state,setState]=useState({
  testType:[]
}) 
let gettestType = async () => {
    try {
      const response = await fetch('//localhost:8080/testtype');
      const result = await response.json();

        const testType = result.result;
        setState({testType:testType});

    } catch (err) {
      setState({ error_message: err })
    }
  }

  let createtestType = async(name)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);

        let url='http://localhost:8080/testtype';
try{
   
  await fetch(url,{body,method:'post',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
   toast.success('added')
    gettestType();
  }catch(e){
toast.error('error')
  }
  }

  let updatetestType = async(name,id)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);

    let url='http://localhost:8080/testtype/'+id;
    await fetch(url,{body,method:'put',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    gettestType();
  }

  let deletetestType=async(id)=>{
    let url='http://localhost:8080/testtype/'+id;
    let bool=window.confirm('are u sure')
    bool && 
    await fetch(url,{method:'delete'});
    gettestType();
    
    
  }


useEffect(()=>{
gettestType();
},[]);

    return ( 
<div className="patientprofile">

<div className="header">
    <h2>TEST TYPE</h2>
</div>
      <center>
      

      <AddtestType
              createTestType={createtestType}
            />
</center>
<center className={style1.centerList}>


<TestTypeList
     testTypes={state.testType}
     updateTestType={updatetestType}
     deleteTestType={deletetestType}
/>
</center>
    </div>
      );
}
 
export default TestType;