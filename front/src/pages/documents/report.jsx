import { useEffect, useState } from "react";
import {FormLabel,TextareaAutosize,Button, Paper} from '@material-ui/core'
import { toast } from "react-toastify";
import '../../style.css'

const Report = (props) => {
    const [report,setReport]=useState('');
    let [toggle,setToggle]=useState(false);
    let [rep,setRep]=useState('');

let getReport=async()=>{
    let url=`http://localhost:8080/patientR/${patientID}`
    let res=await fetch(url);
    let result=await res.json();
    let report=result.report;
 
if(result.report){
     setReport(report);
     
}
   
}

let patientID=props.patientID
let handleEdit=async()=>{
    let url=`http://localhost:8080/patientr/${patientID}`
    let body=null;
    body=new URLSearchParams();
    body.append('report',rep)
    let res=await fetch(url,{method:'put',body})

    let result=await res.json();
if(result.changedRows===1){getReport();toast.success('updated')}

}



let handleChange=(e)=>{
let value=e.target.value
setRep(value);
console.log(rep);

}

let handleToggle=()=>{
    setToggle(!toggle);
}
    useEffect(()=>{
getReport();
    },[])


let firstView=()=>{
return (
    <div className="patientprofile">
        <FormLabel>
            YOUR FIRST REPORT PLEASE :
        </FormLabel>
        <textarea onChange={handleChange} rows="8" cols="40"/>
            <Button onClick={async()=>{await handleEdit();}}>Save</Button>  
    </div>
)
}

    let editMode=()=>{
return (
    <div className="patientprofile">
<textarea onChange={handleChange} rows="4" cols="50">
{report}
  </textarea>
            <Button onClick={async()=>{await handleEdit();handleToggle();}}>Save</Button>
            <Button onClick={handleToggle}>Cancel</Button>
</div>
)
    }

    let viewMode=()=>{
return (
    <div className="patientprofile">
<center style={{marginTop:'1%'}} ><Paper  style={{width:'20%',height:'80%'}}>
{report}
</Paper>
<Button onClick={handleToggle}>EDIT</Button></center>

</div>
)
    }
;
if(!report){
    return firstView();
}else{
    if(toggle)return editMode();
return viewMode();
}}

 
export default Report;