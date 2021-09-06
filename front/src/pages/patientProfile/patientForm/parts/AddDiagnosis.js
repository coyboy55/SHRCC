import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { blue } from '@material-ui/core/colors';
import { Chip, Paper, TextField } from '@material-ui/core';
import { Add,SearchSharp  } from '@material-ui/icons';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles(theme=>({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },

  pageContent: {
   width:'100%',
    padding: theme.spacing(1)
},
txt:{
  margin: theme.spacing(1),
  width:'50%'
}
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const[diagnosis,setDiagnosis]=useState([]);
const [search,setSearch]=useState();
  const handleClose = () => {
    onClose(selectedValue);
  };

  let getDiagnosis=async()=>{
    const url = 'http://localhost:8080/'+'diagnosis';
    let response = await fetch(url);
    let result = await response.json();
    if(result.success){
      let diagnosis=result.result;
    setDiagnosis(diagnosis);
    }
}

let getDiagnosisSearch=async()=>{
  const url = 'http://localhost:8080/'+'diagnosiss';
  let body=new URLSearchParams();
  body.append('search',search)
  let response = await fetch(url,{body,method:'post'});
  let result = await response.json();
  if(result.success){
    let diagnosis=result.result;
  setDiagnosis(diagnosis);
  }
}
let handleChannge=(e)=>{
  setSearch(e.target.value)
}
useEffect(()=>{
  if(search){    const delayDebounceFn = setTimeout(() => {getDiagnosisSearch()}, 500); return () => clearTimeout(delayDebounceFn)}else{getDiagnosis()}

},[search])
  const handleListItemClick = async(id) => {
    console.log(props.patientID);

    let url=`http://localhost:8080/patientDiagnosis`
        let body=new URLSearchParams()
        body.append('patientID',props.patientID)
        body.append('diagnosisID',id)
      await  fetch(url,{method:'post',body})
      props.getDiagnosis();
    onClose(id);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
 
      <DialogTitle style={{color:'#4671A2'}} id="simple-dialog-title">Set Diagnosis as a tag</DialogTitle> 
      <center>
    <TextField className={classes.txt} value={search} label={ <SearchSharp />} onChange={handleChannge} placeholder='search..'></TextField>
    </center>
       
      <List>
        {diagnosis.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email.id)} key={email.id}>
         
     <Paper className={classes.pageContent}>
     <center>
     
       {email.name}
       </center>
       </Paper>

            {/* <ListItemText  primary={email.name}>

            </ListItemText> */}
          </ListItem>
        ))}

       
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>

       <Chip color='primary' avatar={<Avatar><Add/></Avatar>} label='Add' onClick={handleClickOpen}/>
      <SimpleDialog getDiagnosis={props.getDiagnosis} patientID={props.patientID} selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
