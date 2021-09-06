import React, { useContext, useEffect, useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { FormLabel, Grid, FormControl, FormControlLabel, Checkbox, FormGroup, Radio, RadioGroup, Button, Chip, Avatar, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import patientFormData from '..';
import SaveIcon from '@material-ui/icons/Save';
import AutoComplete from '../../../../components/testAutoComplete'
import { useHistory } from 'react-router';
import SessionContext from '../../../../components/session/SessionContext'
import { Add, PlusOneTwoTone } from '@material-ui/icons';
import AddDiagnosis from './AddDiagnosis'


// export const specificName3 = () => {} for more than 1 export

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1),
        }
    },

    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    pageContent1: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(4),
        marginRight: theme.spacing(4),


        padding: theme.spacing(1),
        
        width:'100%'
    },

    button: {

        margin: theme.spacing(1),
        width: '80%',
    }

}));

export default function PatientFormTwo(props) {
let patientID=props.patientID;
    const classes = useStyles();
let history=useHistory();
    // Checkbox Group
    const [state,setState]=useState({})
    const [values, setValues] = useState();
    const [affected,setAffected]=useState([]);
    const [diagnosisC,setDiagnosisC]=useState([]);
    const [smokingC,setSmokingC]=useState({});
    const [physC,setPhysC]=useState({});





    const [affectedCR,setAffectedCR]=useState({});
    const [smoking,setSmoking]=useState([]);
    const [physcl,setPhyscl]=useState([]);
    const [tags,setTags]=useState([]);

    const {
        session : {result1}
    } = useContext(SessionContext);


// let arr=affectedCL.map(item=>({ [item.name]:true}
   
// ))

    
    let getAffectedLimb=async()=>{
        const url = 'http://localhost:8080/'+'affectedlimb';
        let response = await fetch(url);
        let result = await response.json();
        if(result.success){
          let affectedLimb=result.result;
        setAffected(affectedLimb);
        }      
      }



 
      let getSmoking=async()=>{
        const url = 'http://localhost:8080/'+'smoking';
        let response = await fetch(url);
        let result = await response.json();
        if(result.success){
          let smoking=result.result;
        setSmoking(smoking);
        }
      
      }
      let getPhyscl=async()=>{
        const url = 'http://localhost:8080/'+'physicl';
        let response = await fetch(url);
        let result = await response.json();
        if(result.success){
          let physcl=result.result;
        setPhyscl(physcl);
        }
      }
   

useEffect(()=>{
    getAffectedLimb();
    getSmoking();
    getPhyscl();
    
props.state.map(item=>(
    setState((prev)=>({...prev,[item.name]:true}))
     ))

     props.state1.map(item=>(
        setAffectedCR((prev)=>({...prev,[item.name]:true}))
         ))

         props.physC.map(item=>(
            setPhysC((prev)=>({...prev,[item.name.split(' ')]:true}))
             ))

         props.smokingC.map(item=>(
            setSmokingC((prev)=>({...prev,[item.name]:true}))
             ))

   
     getDiagnosisChecked();

   
},[])

const handleCheckboxChangeL = async(e) => { 
   if(e.target.checked){
       let url=`http://localhost:8080/affectedlimbinjuredsidepatient`
       let body=new URLSearchParams()
       body.append('patientID',patientID);
       body.append('injuredSideID',3);
       body.append('affectedLimbID',e.target.value)
       let result;
       fetch(url,{method:'post',body}).then(res=> result=res.json())


   }else{
    let url=`http://localhost:8080/affectedlimbinjuredsidepatient/${e.target.value}/${3}`
    let res=await  fetch(url,{method:'delete'})
    let resuult=res.json();

 
   }
  
};

let createTagsPatient=()=>{ 
     let url=`http://localhost:8080/patientDiagnosis`
     
tags.values.map(async(item)=>{
    let body=new URLSearchParams()
    body.append('patientID',patientID)
    body.append('diagnosisID',item.id)
  await  fetch(url,{body,method:'post'})
 
})
}



const handleCheckboxChangeR = async(e) => {
    // console.log("before the if  "+await state.json());
    // console.log(e.target.checked);

    // e.target.checked ? : setState({[e.target.name]:false})
    // console.log(state);
    // return

  if(e.target.checked){
      let name=e.target.name
    setState((prev)=>({...prev,[name]:true})) 
    let url=`http://localhost:8080/affectedlimbinjuredsidepatient`
    let body=new URLSearchParams()
    body.append('patientID',patientID);
    body.append('injuredSideID',240);
    body.append('affectedLimbID',e.target.value)
    let result
    fetch(url,{method:'post',body}).then(res=> result=res.json())


}else{
    let name=e.target.name

    setState((prev)=>({...prev,[name]:false}))
 let url=`http://localhost:8080/affectedlimbinjuredsidepatient/${e.target.value}/${240}`
 let res=await fetch(url,{method:'delete'})
 let resuult=await res.json();



}
};


const handleCheckboxChangeS = async(e) => {

  if(e.target.checked){
      let name=e.target.name
    setSmokingC((prev)=>({...prev,[name]:true})) 
    let url=`http://localhost:8080/smokingPatient`
    let body=new URLSearchParams()
    body.append('patientID',patientID);
    body.append('smokingID',e.target.value)
    let result
    fetch(url,{method:'post',body}).then(res=> result=res.json())


}else{
    let name=e.target.name

    setSmokingC((prev)=>({...prev,[name]:false}))
 let url=`http://localhost:8080/smokingPatient/${e.target.value}`
 let res=await fetch(url,{method:'delete'})




}
};


const handleRadioC = async(e) => {


  if(e.target.checked){
      let name=e.target.value

    setPhysC((prev)=>({[name.split(' ')]:true}) )
    let url=`http://localhost:8080/physPatient`
    let body=new URLSearchParams()
    body.append('patientID',patientID);
    body.append('physID',e.target.name)
    let result
    fetch(url,{method:'post',body}).then(res=> result=res.json())


}

};
let getDiagnosisChecked=async()=>{
    const url = 'http://localhost:8080/'+'patientDiagnosis/'+patientID;
    let response = await fetch(url);
    let result = await response.json();
    if(result.success){
      let diagnosisC=result.result;
    setDiagnosisC(diagnosisC);
    }      
  }

let handleDelete=()=>{
    let url=`http://localhost:8080/patient`
    let bool = window.confirm('are u sure u delete this')
    bool && fetch(url,{method:'delete'})
    history.push('/patients')
}

let onblur=async(e)=>{
    // let name=e.target.value;
    // setPhysC((prev)=>({...prev,[name.split(' ')]:false})) 

 let url=`http://localhost:8080/physPatient/${patientID}/${e.target.name}`
 let res=await fetch(url,{method:'delete'})
}


const handleCheckboxChangePhys= (e) => {
 //   setValues({ ...values, [event.target.value]: event.target.name });
 
};
const handleCheckboxChangeSmok= (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
   
};
    let deleteDiagnosis=async(id)=>{
let res=await fetch(`http://localhost:8080/patientDiagnosis/${id}`,{method:'delete'})
console.log(res);
getDiagnosisChecked();
    }

 let affectedL=affected.map((item)=>(


    <FormControlLabel key={item.id}
    control={ 
        <Checkbox  checked={affectedCR[item.name]}
        value={item.id}
        onChange={handleCheckboxChangeL}
            name={item.name}
            
        />
    
    }
    label={item.name}
/>
 
 ))


 //checked={affectedCR[item.name]}
// hecked={affectedCR[item.name]}
 let affectedR=affected.map(item=>(

    <FormControlLabel key={item.id}
    control={
        <Checkbox checked={state[item.name]}
        value={item.id}     
           onChange={handleCheckboxChangeR}
            name={item.name}
        />
    }
    label={item.name}
/>
 ))
 let phys=physcl.map(item=>(

    <FormControlLabel key={item.id} value={item.name} name={item.id}  control={<Radio checked={physC[item.name.split(' ')]} />} label={item.name} />

 ))

 let smokingList=smoking.map(item=>(

    <FormControlLabel key={item.id}
    control={
        <Checkbox
        value={item.id} checked={smokingC[item.name]}
           // checked={values.headR}
            onChange={handleCheckboxChangeS}
            name={item.name}
        />
    }
    label={item.name}
/>
 ))

 let diagnosiss=diagnosisC.map(item=>(
     
<Chip color='secondary' style={{margin:'1%'}} size="small" label={item.name} onDelete={()=>deleteDiagnosis(item.id)}/>
     
 ))

    return (
        <form >
            {/* <PatientProfile/> */}
            <Paper className={classes.pageContent}>
                <Grid container className={classes.root}>
                    <Grid item xs={3}>
                        {/* <Typography variant="h5" gutterBottom>
                            Checkbox Group
                        </Typography> */}
                        <FormControl component="fieldset">

                            <FormLabel>Physical Activity Weekly</FormLabel>
                            <RadioGroup
                               // name="physicalActivity"
                                //value={values.physicalActivity}
                                size="small"
                                onChange={handleRadioC}
                                onBlur={onblur}
                            >
                       
                                {phys}
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Smoking</FormLabel>
                            <FormGroup>
                             
                                {smokingList}
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Affected Limb - Injured Side Right</FormLabel>
                            <FormGroup>
                            {affectedR}
                                                      </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Affected Limb - Injured Side Left</FormLabel>
                            <FormGroup>
                                {affectedL}
                            
                            </FormGroup>
                        </FormControl>

                    </Grid>
                    <Grid item xs={3}>

                        <Button onClick={()=>history.goBack()}
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<ArrowBackIosIcon />}
                        >
                            back
                        </Button>
                        <Paper className={classes.pageContent1}>
                <Grid>        <FormLabel>
DIAGNOSIS
            </FormLabel>  </Grid>
    <Grid>{diagnosiss}
    <AddDiagnosis getDiagnosis={getDiagnosisChecked} patientID={patientID}/>
    {/* <Chip avatar={<Avatar><Add/></Avatar>} label='Add' onClick={} /> */}
    </Grid>

            
            </Paper>

                    </Grid>
    
                    {/* <AutoComplete diagnosisC={diagnosisC} setDiagnosisC={setDiagnosisC} setState={setTags} diagnosis={diagnosis}/> */}
                </Grid>
      
            </Paper>
      
     
        </form>
    )
}