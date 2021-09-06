import { useEffect, useState } from "react";
import {getInjuredSide, getAffectedLimb, getTool, getDiagnosis, getTx} from '../../pages/controller/controller'
import Select from '../Stool';
 import {Button,TextField,Paper,Grid,makeStyles} from '@material-ui/core'
import {Add} from '@material-ui/icons';


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

const AddDailyTx  =(props)=> {
    const classes=useStyles();

const [affectedLimb, setAffectedLimb] = useState([]);
    const [tool, setTool] = useState([]);
    const [diagnosis, setDiagnosis] = useState([]);
    const [tx, setTx] = useState([]);
  const [injuredSide, setInjuredSide] = useState([]);


  const [dailyTx, setDailytx] = useState({
    date: '',
    note: '',
    rating: '',
    injuredSideID: '',
    affectedLimbID: '',
    diagnosisID: '',
    toolID: '',
    txID: ''
  });
    useEffect(()=>{
        getInjuredSide(setInjuredSide);
        getTx(setTx);
        getDiagnosis(setDiagnosis);
        getTool(setTool);
        getAffectedLimb(setAffectedLimb);
    },[])

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();
        let {date, note, rating, injuredSideID, affectedLimbID, diagnosisID, toolID, txID}=dailyTx
    props.createDailyTx(date, note, rating, injuredSideID, affectedLimbID, diagnosisID, toolID, txID, props.patientID)    
   
    }

  let  handleChange = (event) => {
      let {name,value} = event.target;
      setDailytx((prevState)=>({
        ...prevState,
        [name]:value,
      }));
    }

        return (
    
            <Grid container className={classes.root}>
                <Grid item xs={1}>
                  <TextField 
                            required
                            type="date"
                            name="date"
                            placeholder="date"
                            value={dailyTx.date}
                            onChange={handleChange}
                        />
                </Grid>

                <Grid item xs={1}>
                <Select setState={setDailytx} name='diagnosisID' list={diagnosis}/>
               
                </Grid>

                <Grid item xs={1}>
                <Select setState={setDailytx} name='injuredSideID' list={injuredSide}/>
               
                </Grid>


                <Grid item xs={2}>
                <Select setState={setDailytx} name='affectedLimbID' list={affectedLimb}/>
               
               </Grid>

               <Grid item xs={1}>
               <Select setState={setDailytx} name='txID' list={tx}/>
               </Grid>

               <Grid item xs={1}>
               <Select setState={setDailytx} name='toolID' list={tool}/>
               </Grid>

               <Grid item xs={1}>
               <TextField 
                            required
                            type="text"
                            name="note"
                            placeholder="note"
                            value={dailyTx.note}
                            onChange={handleChange}
                        />
                    
               </Grid>

               <Grid item xs={1}>
               <TextField 
                            required
                            type="number"
                            name="rating"
                            placeholder="rating"
                            min='0'
                            max='5'
                            value={dailyTx.rating}
                            onChange={handleChange}
                        />
               </Grid>

               <Grid item xs={1}>
               <Button style={{backgroundColor:'transparent',border:'none'}} onClick={handleSubmit}><i style={{color:'#4671A2'}} ><Add/></i></Button>
               
               </Grid>
               </Grid>
           
                      
                     




                   

                
                    
                   
                   
                
                    
                       
                    
                

                    
                   
              
        )
    
}
export default AddDailyTx;