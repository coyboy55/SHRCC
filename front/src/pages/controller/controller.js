import { toast } from 'react-toastify';
import URL from '../../URL'




 async function deleteDailyTX(id) {
  const url = (URL+'dailytx/' + id);
  try {
    let conf = window.confirm('are u sure to delete it');
    if (conf) {
      let response = await fetch(url, { method: 'delete' })
    
        toast.success('delete success');
        
      }
    
  } catch (e) {

  }
}

  const  getDailyTx=async(setState,id,state)=> {
  const url = URL+'dailytxpatient/'+id;

  const response = await fetch(url);
  let res = await response.json();
  if(res.success){
  let result=res.result 
  setState({dailyTx:result});
  }else{
    setState((prevState)=>({
      ...prevState,
      dailyTx: state.dailyTx.length === 1 ? [] : state.dailyTx
    }))
    
    toast.warning('no data')
  }
 

}

   const getInjuredSide=async(setState)=> {
  const url = URL+'injuredside';

  const response = await fetch(url);
  let result = await response.json();
  let injuredSide = result.result
  setState(injuredSide);

}



 async function getTool(setState) {
  const url = URL+'tool';
  let response = await fetch(url);
  let result = await response.json();
let tool=result.result;
  setState(tool);
}

async function getDoctor(setState) {
  const url = URL+'doctor';
  let response = await fetch(url);
  let result = await response.json();
  console.log(result);
let doctor=result.result;
  setState(doctor);

}

async function getPayment(setState) {
  const url = URL+'paymentmethod';
  let response = await fetch(url);
  let result = await response.json();
let payment=result.result;
  setState(payment);
}

async function getPatients(setState) {
  const url = URL+'patientname';
  let response = await fetch(url);
  let result = await response.json();
let patient=result.result;
  setState(patient);
}

async function getAffectedLimb(setState) {
  const url = URL+'affectedlimb';
  let response = await fetch(url);
  let result = await response.json();
  if(result.success){
    let affectedLimb=result.result;

  setState(affectedLimb);
  }

}

async function getDiagnosis(setState) {
  const url = URL+'diagnosis';
  let response = await fetch(url);
  let result = await response.json();
let diagnosis=result.result;
  setState(diagnosis);
}

async function getTx(setState) {
  const url = URL+'tx';
  let response = await fetch(url);
  let result = await response.json();
let tx=result.result;
  setState(tx);
}





 async function createDailytx(date,note,rating,injuredsideID,affectedLimbId,diagnosisID,toolId,txID,patientID) {
  const url = URL+'dailytx';
  let body = {};
  body = new URLSearchParams();
  body.append('date', date);
  body.append('note', note);
  body.append('rating', rating);

  body.append('injuredSideID', injuredsideID);
  body.append('affectedID', affectedLimbId);

  body.append('diagnosisID', diagnosisID);

  body.append('toolID', toolId);
  body.append('txID', txID);
  body.append('patientID', patientID);
try{
  let a=await fetch(url, { method: 'post', body });
  let b=await a.json();
  toast.success('succcess');
  
}catch(e){
  toast.warning('fill all the field')
}

}

 
export {
  getDailyTx,
  getInjuredSide,
  getDiagnosis,
  getTx,
  getAffectedLimb,
  getTool,
  createDailytx,
  deleteDailyTX,
  getPayment,
  getDoctor,
  getPatients
  

}
  ;
