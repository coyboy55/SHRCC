import { Fragment, useContext, useEffect, useState } from 'react';
import SessionContext from '../../components/session/SessionContext'
import Testlist from '../../components/injuredside/injuredList'
import Addinjured from '../../components/injuredside/addInjuredSide'


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
    await fetch(url,{body,method:'post',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getInjuredSide();
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
    await fetch(url,{method:'delete'})
    getInjuredSide();
  }


useEffect(()=>{
getInjuredSide();
},[]);

console.log(state);
    return ( 
    <Fragment>
      <center>
      

      <Addinjured
              createInjuredSide={createInjuredSide}
            />


<Testlist
     contacts={state.contacts}
     updateInjured={updateInjuredSide}
     deleteInjured={deleteInjured}
/>
</center>
    </Fragment>
      );
}
 
export default Home;