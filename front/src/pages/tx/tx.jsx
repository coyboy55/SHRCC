import { useEffect, useState } from 'react';

import TxList from '../../components/tx/txList'
import AddTx from '../../components/tx/addTx'
import style1 from '../../App.module.css'
import {toast} from'react-toastify'


const Tx = () => {
const [state,setState]=useState({
  tx:[]
}) 
let getTx = async () => {
    try {
      const response = await fetch('//localhost:8080/tx');
      const result = await response.json();

        const tx = result.result;
        setState({tx:tx});

    } catch (err) {
      setState({ error_message: err })
    }
  }

  let createTx = async(name,price)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
        body.append('price',price);

        let url='http://localhost:8080/tx';
try{
   
  await fetch(url,{body,method:'post',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
   toast.success('added')
    getTx();
  }catch(e){
toast.error('error')
  }
  }

  let updateTx = async(name,price,id)=>{
    let body=null;
         body = new URLSearchParams();

        body.append('name',name);
        body.append('price',price);

    let url='http://localhost:8080/tx/'+id;
    await fetch(url,{body,method:'put',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
    getTx();
  }

  let deleteTx=async(id)=>{
    let url='http://localhost:8080/tx/'+id;
    let bool=window.confirm('are u sure')
    bool && 
    await fetch(url,{method:'delete'});
    getTx();
    
    
  }


useEffect(()=>{
getTx();
},[]);

    return ( 
<div className="patientprofile">

<div className="header">
    <h2>TRAITMENT (TX)</h2>
</div>
      <center>
      

      <AddTx
              createTx={createTx}
            />
</center>
<center className={style1.centerList}>


<TxList
     txs={state.tx}
     updateTx={updateTx}
     deleteTx={deleteTx}
/>
</center>
    </div>
      );
}
 
export default Tx;