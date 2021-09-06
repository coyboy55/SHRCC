import { useEffect, useState } from 'react';

import DailyTxList from '../../components/dailyTx/dailyTxList'
import AddDailyTx from '../../components/dailyTx/addDailyTx'

import {FormLabel, Paper,makeStyles,Grid} from '@material-ui/core'


import {toast} from'react-toastify'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
      '& .MuiFormControl-root': {
          width: '80%',
          margin: theme.spacing(1),
      }
  },
  pageContent: {
      margin: theme.spacing(1),
      padding: theme.spacing(3)
  },
  button: {
      margin: theme.spacing(1),
      width: '80%'
  }
}));


const DailyTx = (props) => {
  let patientID=props.patientID
const [state,setState]=useState({
  dailyTx:[]
}) 
let getDailyTx = async () => {
    try {
      const response = await fetch(`//localhost:8080/dailytxpatient/${patientID}`);
      const result = await response.json();

        const dailyTx = result.result;
        
        if(result.success){
      setState({dailyTx:dailyTx})
    }else{ 
      toast.warning('no data')
      setState({ dailyTx: state.dailyTx.length === 1 ? [] : state.dailyTx })
  
    }
   

    } catch (err) {
      setState({ error_message: err })

    }
  }

  let createDailyTx = async(date,note,rating,injuredsideID,affectedLimbId,diagnosisID,toolId,txID,patientID)=>{
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
        

    
        let url='http://localhost:8080/dailytx';
try{
   
  await fetch(url,{body,method:'post',
    headers: {
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
   toast.success('added')
    getDailyTx();
  }catch(e){
toast.error('error')
  }
  }

  let updateDailyTx = async(id,date,note,rating,injuredsideID,affectedLimbId,diagnosisID,toolId,txID)=>{
    console.log({id,date,note,rating,injuredsideID,affectedLimbId,diagnosisID,toolId,txID});
     
    let obj={
    
      date:date,
      note:note,
      rating:rating,
      injuredSideID:injuredsideID,
      affectedID:affectedLimbId,
      diagnosisID:diagnosisID,
      toolID:toolId,
      txID:txID
    }
    // let body = null;
    // body = new URLSearchParams();
    // body.append('date', date);
    // body.append('note', note);
    // body.append('rating', rating);
  
    // body.append('injuredSideID', injuredsideID);
    // body.append('affectedID', affectedLimbId);
  
    // body.append('diagnosisID', diagnosisID);
  
    // body.append('toolID', toolId);
    // body.append('txID', txID);

    let url='http://localhost:8080/dailytx/'+id;
    
    // let a=await fetch(url,{body,method:'put',
    // headers: {
    //        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // }});
    // let b=await a.json();
    // console.log(b);
axios.put(url,obj).then((e)=>  getDailyTx())
  
  }

  let deleteDailyTx=async(id)=>{
    let url='http://localhost:8080/dailytx/'+id;
    let bool=window.confirm('are u sure')
    bool && 
    await fetch(url,{method:'delete'});
    getDailyTx();
  }


useEffect(()=>{
getDailyTx();
},[]);

const classes=useStyles();

    return ( 
      <div className="patientprofile">

 
    
 
    
            <Paper className={classes.pageContent}>
            <Grid container className={classes.root}>
                    <Grid item xs={1}>
                    <FormLabel style={{color:'#4671A2'}}>date </FormLabel>  

                      </Grid>

                      <Grid item xs={1}>
        <FormLabel style={{color:'#4671A2'}}>diagnosis </FormLabel>
                      
                      </Grid>

                      <Grid item xs={1}>
          <FormLabel style={{color:'#4671A2'}}>injuredSide </FormLabel>
                      
                      </Grid>

                      <Grid item xs={2}>
            <FormLabel style={{color:'#4671A2'}}>affectedLimb</FormLabel>  
                      
                      </Grid>

                      <Grid item xs={1}>
                 <FormLabel style={{color:'#4671A2'}}>tx</FormLabel>    
                      
                      </Grid>

                      <Grid item xs={1}>
                <FormLabel style={{color:'#4671A2'}}>tool</FormLabel> 
                      
                      </Grid>

                      <Grid item xs={1}>
          <FormLabel style={{color:'#4671A2'}}>note</FormLabel> 
                      
                      </Grid>

                      <Grid item xs={1}>
        <FormLabel style={{color:'#4671A2'}}>rating</FormLabel> 
                      
                      </Grid>

                      <Grid item xs={1}>
                      <FormLabel style={{color:'#4671A2'}}>action</FormLabel> 

                      </Grid>
                      </Grid>
                      <AddDailyTx
              createDailyTx={createDailyTx} patientID={props.patientID}
            />
                      </Paper>
          
            
         
      
        
       

      

<DailyTxList
     dailyTxs={state.dailyTx}
     updateDailyTx={updateDailyTx}
     deleteDailyTx={deleteDailyTx}
/>

   
    </div>
      );
}
 
export default DailyTx;