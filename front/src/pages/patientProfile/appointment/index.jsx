import React, { useState,useEffect } from 'react';
import { Grid, TextField, Button, FormLabel, } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import AllAppoin from './allAppointment'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        width:'75%'
    },
    pageContent2: {
        margin: theme.spacing(2),
        padding: theme.spacing(3),
        width:'25%'
    },
    button: {
        margin: theme.spacing(1),
        width: '80%'
    }
}));

const initialFValues = {
    firstName: '',
    lastName: '',
    date: '',
    time: '',
    mobileNumber: '',
}

export default function Appointment(props) {
 let patientID=props.patientID
let history=useHistory();

let getPatient=async()=>{
    let url=`http://localhost:8080/patient/${patientID}`

    let response=await fetch(url);
    let result=await response.json();
   let patient=result.result[0];
  console.log(result
    );
   if(result.success){
    setValues(patient)
   }
}

const [appointment,setAppointment]=useState([]);

let getAppointment=async()=>{
    let url=`http://localhost:8080/appointmentd/${patientID}`
    let res=await fetch(url)
    let result=await res.json();
    if (result.success){
        let data=result.result;
        setAppointment(data)
    }
}

let createAppointment=async()=>{
let url='http://localhost:8080/appointment';
let date = values.date.slice(0,10);
let time=values.time;
let body = new URLSearchParams();

body.append('date',date);
body.append('time',time);
body.append('patientID',patientID)
let res=await fetch(url,{method:'post',body});
let result=await res.json();
if(result.insertId){
   // history.push(`/dailyagenda/${date}`);
   getAppointment().then(()=>fetch('http://localhost:8080/patientst/'+patientID,{method:'put'}))
}
}

useEffect(()=>{
getPatient();
getAppointment();
},[])



    const [values, setValues] = useState(initialFValues);
   
    const classes = useStyles();

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
       
    }
    let list=appointment.slice(appointment.length-5,appointment.length).reverse().map(item=>(
        <>
        <Grid style={{borderBottom:'1px #4671A2 solid',marginTop:'10px'}} item xs={6}>
         <FormLabel> {item.date}</FormLabel>
    </Grid>
    <Grid style={{borderBottom:'1px #4671A2 solid',marginTop:'10px'}}  item xs={6}>
      <FormLabel>  {item.time} </FormLabel>
    </Grid>
    </>
         
    ))

    return (
        <form style={{display:'flex'}}>
            <Paper className={classes.pageContent}>
                <Grid container className={classes.root}>
                    <Grid item xs={3}>
                        <TextField
                        
                            variant="outlined"
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            size="small"
                            color="secondary"
                            // onChange={handleInputChange}
                        />
                        

                        <TextField
                        disabled
                            variant="outlined"
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            size="small"
                            color="secondary"
                            // onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            label="Date"
                            name="date"
                            value={values.date}
                            size="small"
                            color="secondary"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Time"
                            name="time"
                            value={values.time}
                            size="small"
                            color="secondary"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            label="Mobile Number"
                            name="mobileNumber"
                            value={values.mobileNumber}
                            size="small"
                            color="secondary"
                            type="number"
                            // onChange={handleInputChange}
                        />
                        {/* <Button
                            variant="contained"
                            size="small"
                            className={classes.button}
                            color="secondary"
                            startIcon={<SendIcon />}
                        >
                            Send Google Form
                        </Button> */}
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                        onClick={createAppointment}
                            variant="contained"
                            size="small"
                            className={classes.button}
                            color="secondary"
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                       
                        <Button 
                            variant="contained"
                            size="small"
                            className={classes.button}

                        >
                            Cancel
                        </Button>
                    </Grid>
                   
                </Grid>
            </Paper> 
            <Paper className={classes.pageContent2}>
                <Grid container >
                    <Grid item xs={6}>
                        <FormLabel style={{color:'#4671A2'}}>DATE</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel style={{color:'#4671A2'}}>TIME</FormLabel>
                    </Grid>
                     </Grid>
                     <Grid container >
                 {list}
                     </Grid>
                     <center>
                     <AllAppoin appointments={appointment}/>
                     </center>
                   
                       
                    </Paper>
        </form>
    )
}