import { useEffect, useState } from 'react';

import DailyAgendaList from '../../components/dailyAgenda/dailyAgendaList'

import { Paper, Grid, FormLabel, TextField, makeStyles } from '@material-ui/core'




import { toast } from 'react-toastify'
import moment from 'moment';
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


const DailyAgenda = (props) => {


    const [state, setState] = useState({
        dailyAgenda: []
    })
    let currentdate = new Date();
    let curr = moment(currentdate).format('YYYY-MM-DD')
    const [date, setDate] = useState(curr);
    let getDailyAgenda = async () => {
        try {

            let body = null;
            body = new URLSearchParams();


            if (date) {
                body.append('date', date)
            } else {
                body.append('date', props.match.params.date)
            }


            const response = await fetch('http://localhost:8080/appointmentd', { body, method: 'post' })
            const result = await response.json();

            const dailyAgenda = result.result;
            if (result.success) {
                setState({ dailyAgenda: dailyAgenda })
            } else {
                toast.warning('no Appointment in ' + date)
                setState({ dailyAgenda: [] })
              
            }
        } catch (err) { 
             setState({ dailyAgenda: state.dailyAgenda.length === 1 ? [] : state.dailyAgenda })
            setState({ error_message: err })
        }
    }


    let updateDailyAgenda = async (patientID, date, time, txID, sessionNB, paymentID, doctorID, id) => {
let obj={
    patientID:patientID,
     date:date,
      time:time,
       txID:txID,
        sessionNb:sessionNB,
         paymentMethodID:paymentID,
          doctorID:doctorID
}
        let url = 'http://localhost:8080/appointment/' + id;

        axios.put(url,obj).then(res=>{
            console.log(res.data);
 }).then(
            getDailyAgenda
        )
        
    }

    let deleteDailyAgenda = async (id) => {
        let url = 'http://localhost:8080/appointment/' + id;
        let bool = window.confirm('are u sure')
        bool &&
            await fetch(url, { method: 'delete' });
        getDailyAgenda();
    }

    let handleChangeDate = (e) => {
        let value = e.target.value;
        let date = value.slice(0, 10);
        setDate(date);
    
    }


    useEffect(() => {
        getDailyAgenda();


    }, [date]);
    const classes = useStyles();
    return (
        <div className="patientprofile">

            <div style={{display:'flex',justifyContent:'space-between'}} className="header">

                <h2>DAILY AGENDA</h2>

                <TextField 
                    style={{ marginRight: '4%' }}
                    variant="outlined"
                    label="Date"
                    name="date"

                    size="small"
                    color="white"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChangeDate}
                />


            </div>
            <Paper className={classes.pageContent}>
            <Grid container className={classes.root}>
                    <Grid item xs={1}>
                  
 <FormLabel style={{ color: '#4671A2' }}>Patient </FormLabel>
 </Grid>
 <Grid item xs={3}>
 <FormLabel style={{ color: '#4671A2' }}>Appointment    (Date AND Time)</FormLabel>
              
                 </Grid>
                 <Grid item xs={2}>
                        <FormLabel style={{ color: '#4671A2' }}>TX(traitment)  </FormLabel>
                   
                </Grid>
                <Grid item xs={1}>
                        <FormLabel style={{ color: '#4671A2' }}>S.NB </FormLabel>
                   </Grid>
                   <Grid item xs={1}>
                        <FormLabel style={{ color: '#4671A2' }}>Price</FormLabel>
                   </Grid>
                   <Grid item xs={1}>
                        <FormLabel style={{ color: '#4671A2' }}>Totale S.NB </FormLabel>

                 </Grid>
              
                 <Grid item xs={1}>
                        <FormLabel style={{ color: '#4671A2' }}>Payment </FormLabel>
</Grid>

<Grid item xs={1}>
                  
                        <FormLabel style={{ color: '#4671A2' }}>Doctor </FormLabel>
                        </Grid>
                        <Grid item xs={1}>
                  
                        <FormLabel style={{ color: '#4671A2' }}>Action </FormLabel>
                        </Grid>
                 
                </Grid>
            </Paper>

            {/* <table>

                <thead >

                    <tr >
                        <th  > <FormLabel style={{ color: 'white' }}>Patient </FormLabel></th>
                        <th><FormLabel style={{ color: 'white' }}>Appointment (Date AND Time) </FormLabel></th>
                        <th><FormLabel style={{ color: 'white' }}>TX(traitment) </FormLabel></th>
                        <th> <FormLabel style={{ color: 'white' }}>S.NB</FormLabel> </th>
                        <th> <FormLabel style={{ color: 'white' }}>Price</FormLabel> </th>
                        <th><FormLabel style={{ color: 'white' }}>Totale S.NB</FormLabel> </th>
                        <th><FormLabel style={{ color: 'white' }}>Payment</FormLabel> </th>

                        <th> <FormLabel style={{ color: 'white' }}>Doctor</FormLabel> </th>
                    </tr>
                </thead>
                <tbody > */}


                    {/* <AddDailyAgenda
                        createDailyAgenda={createDailyAgenda}
                    /> */}

                    <DailyAgendaList
                        dailyAgendas={state.dailyAgenda}

                        updateDailyAgenda={updateDailyAgenda}
                        deleteDailyAgenda={deleteDailyAgenda}
                    />
                {/* </tbody>
            </table> */}

        </div>
    );
}

export default DailyAgenda;