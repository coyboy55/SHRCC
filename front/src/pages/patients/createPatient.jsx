import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { FormLabel, Grid, TextField, FormControl, RadioGroup, FormControlLabel, Radio, MenuItem, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';


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


// const initialFValues = {

    
//     firstName: '',
//     lastName: '',
//     birthday: '',
//     jobOccupation: '',
//     mobileNumber: '',
//     homeNumber: '',
//     fatherName: '',
//     motherName: '',
//     status: '',
//     spouseFamily: '',
//     email: '',
//     sex: 'male',
//     blood: '',
//     height: '',
//     weight: '',
//     religion: '',
//     nationality: '',
//     city: '',
//     address: '',
//     insurance: '',

// }

export default function CreatePatient(props) {
    let history=useHistory();
let patientID=props.patientID;
    let [values, setValues] = useState({
        birthday:'2021-2-2'
    });
    let classes = useStyles();

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    

    let createPatient=async()=>{

        let url='http://localhost:8080/patient';
         axios.post(url,values).then(async res => {
            const result = res.data;
           if(result.insertId){
               history.push(`/patient/${result.insertId}/0/0`)
           }
          });
            }
         let handleSubmit=(e)=>{
             e.preventDefault();
             createPatient();
         }

    useEffect(()=>{
      
    },[])
    console.log(values);

    return (
        <form onSubmit={handleSubmit} className="patientprofile">
          

<div className="header">

    <h2>ADD NEW PATIENT</h2>
    </div>
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
                        />
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Birthday"
                            name="birthday"
                            value={values.birthday.slice(0,10)}
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
                        />
                        <TextField
                            variant="outlined"
                            label="Mother Full Name"
                            name="motherName"
                            value={values.motherName}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
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
                        />
                        <TextField
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={values.email}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Job"
                            name="jobOccupation"
                            value={values.jobOccupation}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
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
                        />
                        <TextField
                            variant="outlined"
                            label="City"
                            name="city"
                            value={values.city}
                            size="small"
                            color="secondary"
                            onChange={handleInputChange}
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
                     onClick={createPatient}
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                        {/* <Link to="/patient/0/0/1" style={{ textDecoration: 'none' }}> */}
                 
                        {/* </Link> */}
                   
                    </Grid>
                </Grid>
            </Paper>
        </form>
    )
}