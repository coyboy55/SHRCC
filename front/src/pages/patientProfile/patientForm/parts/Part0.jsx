import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { FormLabel, Grid, TextField, FormControl, RadioGroup, FormControlLabel, Radio, MenuItem, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import {toast} from 'react-toastify'
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },

    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },

    button: {
        margin: theme.spacing(1),
        width: '80%',

    }

}));


const initialFValues = {

    
    firstName: '',
    lastName: '',
    birthday: '',
    jobOccupation: '',
    mobileNumber: '',
    homeNumber: '',
    fatherName: '',
    motherName: '',
    status: '',
    spouseFamily: '',
    email: '',
    sex: 'male',
    blood: '',
    height: '',
    weight: '',
    religion: '',
    nationality: '',
    city: '',
    address: '',
    insurance: '',
name:'',

}

export default function PatientForm(props) {
    let history=useHistory();
let patientID=props.patientID;

    let [values, setValues] = useState(initialFValues);
    let classes = useStyles();

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            [name]: value
        })
   
    }

    console.log(values);
    let createPatient=async()=>{
values.name=values.firstName+' '+values.lastName
let url=`http://localhost:8080/patient/${patientID}`;
 axios.put(url,values).then(async res => {
    const result = res.data;
    const success = res.data;

  }).then(getPatientID);
    }

    let deletePatient = async () => {
        let url =` http://localhost:8080/patient/${patientID}`;

          let boolean = window.confirm('Are you sure you want to delete this?');
          if (boolean===true) {

            let response = await fetch(url, { method: 'delete' });
            let result = await response.json();
            if (result.result.affectedRows > 0) {
                toast .success("Patient Deleted");
                history.push('/patients')
            }
        }
          }

    let getPatientID=async()=>{
        let url=`http://localhost:8080/patient/${patientID}`
        axios.get(url).then(async res => {
            const result = res.data.result[0];
            const success = res.data;
           if(success){
               setValues(result)
           }
          });
   
    }

    useEffect(()=>{
        getPatientID(); 

    },[])
    let name=values.firstName+' '+values.lastName
    props.setName(name)
    return (
        <form  >
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
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                           
                        />
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Birthday"
                            name="birthday"
                            value={values.birthday ? (values.birthday.slice(0,10)):(values.birthday)}
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
                            label="Mobile Number"
                            name="mobileNumber"
                            value={values.mobileNumber}
                            size="small"
                            color="secondary"
                            type="number"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Phone Number"
                            name="homeNumber"
                            value={values.homeNumber}
                            size="small"
                            color="secondary"
                            type="number"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            

                        />
                        <TextField
                            variant="outlined"
                            label="Height"
                            name="height"
                            value={values.height}
                            size="small"
                            color="secondary"
                            type="number"
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Weight"
                            name="weight"
                            value={values.weight}
                            size="small"
                            color="secondary"
                            type="number"
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                name="sex"
                                value={values.sex}
                                size="small"
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            label="Father Name"
                            name="fatherName"
                            value={values.fatherName}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Mother Full Name"
                            name="motherName"
                            value={values.motherName}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            select
                            variant="outlined"
                            label="Marital Status"
                            name="status"
                            value={values.status}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                       
                        >
                            <MenuItem value="Single">Single</MenuItem>
                            <MenuItem value="Married">Married</MenuItem>
                            <MenuItem value="Seperated">Seperated</MenuItem>
                        </TextField>
                        <TextField
                            variant="outlined"
                            label="Spouse Family Name"
                            name="spouseFamily"
                            value={values.spouseFamily}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={values.email}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Job"
                            name="jobOccupation"
                            value={values.jobOccupation}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            select
                            variant="outlined"
                            label="Blood Type"
                            name="blood"
                            value={values.blood}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                        
                        >
                            <MenuItem value="O-">O-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                        </TextField>
                        <TextField
                            variant="outlined"
                            label="Insurance Provider"
                            name="insurance"
                            value={values.insurance}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            select
                            variant="outlined"
                            label="Religion"
                            name="religion"
                            value={values.religion}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            <MenuItem value="Muslim">Muslim</MenuItem>
                            <MenuItem value="Christian">Christian</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                        <TextField
                            variant="outlined"
                            label="Nationality"
                            name="nationality"
                            value={values.nationality}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="City"
                            name="city"
                            value={values.city}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Address"
                            name="address"
                            value={values.address}
                            multiline
                            rows={4}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {/* <TextField
                            variant="outlined"
                            label="Date Created"
                            name="dateCreation"
                            value={values.dateCreation}
                            size="small"
                            color="secondary"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                        /> */}
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                        type='button'
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={createPatient}
                        >
                            Save
                        </Button>
                        {/* <Link to="/patient/0/0/1" style={{ textDecoration: 'none' }}> */}
                            <Button onClick={()=>{history.push(`/patient/${patientID}/0/1`)}}
                                variant="contained"
                                color="secondary"
                                size="small"
                                className={classes.button}
                                startIcon={<ArrowForwardIosIcon />}
                            >
                                Next
                            </Button>
                        {/* </Link> */}
                      
<Button onClick={deletePatient}
                            variant="contained"
                            size="small"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    )
}