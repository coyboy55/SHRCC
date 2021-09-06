/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { ListItemAvatar } from '@material-ui/core';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
   let diagnosis=props.diagnosis;

    useEffect(()=>{
    },[])
    let handleChange=(e,values)=>{
      console.log(values);
props.setState((prev)=>({
  ...prev,
  values
}))
    }

    const handleCheckboxChangeS = async(e) => {

      if(e.target.checked){
          let name=e.target.name
        props.setDiagnosisC((prev)=>({...prev,[name]:true})) 
    }else{
        let name=e.target.name
    
        props.setDiagnosisC((prev)=>({...prev,[name]:false}))    
    }
    };
    


  return (
    <Autocomplete
      multiple
   
      
      id="checkboxes-tags-demo"
      options={diagnosis} 
      disableCloseOnSelect onChange={handleChange}
      getOptionLabel={(option) => (option.name)}
      renderOption={(option, {selected} ) => (
        <React.Fragment>
          <Checkbox 
            icon={icon} 
            value={option.id}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={props.diagnosisC[option.name.split(' ')]}
          />
          {option.name}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
   
        <TextField {...params}   variant="outlined" label="Diagnosis"/>
       
      )}
    />
  );
}

