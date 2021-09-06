import { useEffect, useState } from "react";
import Select from '../Stool';


import { TextField, Grid, FormLabel, Paper, makeStyles } from '@material-ui/core'
import { getPayment, getPatients, getDoctor, getTx } from '../../pages/controller/controller'
import MenuListComposition from "../../MenuListComposition";


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
        width: '80%'
    }
}));

const DailyAgenda = (props) => {
    const classes = useStyles();


    const [doctor, setDoctor] = useState([]);
    const [payment, setPayment] = useState([]);
    const [tx, setTx] = useState([]);

    const [patients, setPatients] = useState([]);
    const [state, setState] = useState({
        edit_mode: false,
        id: props.id,
        date: props.date,
        time: props.time,
        sessionNB: props.SessionNB


    })

    const [appointment, setAppointment] = useState({
        patientID: props.patientID,
        date: props.date,
        time: props.time,
        doctorID: props.doctorID,
        sessionNB: props.SessionNB,
        paymentID: props.paymentMethodID,
        txID: props.txID

    });

    useEffect(() => {
        getDoctor(setDoctor);
        getPayment(setPayment);
        getTx(setTx);
        getPatients(setPatients);

    }, [])


    const toggleEditMode = () => {
        let edit_mode = !state.edit_mode;
        setState((prevState) => ({
            ...prevState,
            edit_mode,
        }));
    }

    const handleChange = (event) => {       console.log(props.patientID);
        let { name, value } = event.target;
        setAppointment((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    }



    const handleSubmit = (event) => {
        event.nativeEvent.preventDefault();
        let { id, updateDailyAgenda } = props;
        let { patientID, date, time, doctorID, sessionNB, paymentID, txID } = appointment;
        
        date = date.slice(0, 10);
        updateDailyAgenda(patientID, date, time, txID, sessionNB, paymentID, doctorID, id);
        toggleEditMode();
    }
    const handleDelete = () => {

        let { id, deleteDailyAgenda } = props;

        deleteDailyAgenda(id);

    }


    const handleReset = (event) => {
        // event.nativeEvent.preventDefault();
        // let { note,date,rating  } = props;
        // setState({ note,date,rating });
        toggleEditMode();
    }

    const renderEditMode = () => {
 
        return (
            <Paper className={classes.pageContent}>
                <Grid container className={classes.root}>
                    <Grid item xs={1}>
                        <Select label='Patient' selected={props.patientID} setState={setAppointment} name='patientID' list={patients} />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField
                            required
                            type="date"
                            name="date"
                            placeholder="date"
                            value={appointment.date}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            required
                            type="time"
                            name="time"
                            placeholder="time"
                            value={appointment.time}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={2}>


                        <Select label='TX' selected={props.txID} name='txID' setState={setAppointment} list={tx} />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            required
                            type="number"
                            name="sessionNB"
                            placeholder="sessionNB"
                            value={appointment.sessionNB}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={1}>{props.price}</Grid>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={1}><Select label='Payment Method' selected={props.paymentMethodID} setState={setAppointment} name='paymentID' list={payment} /></Grid>

                    <Grid item xs={1}><Select label='Doctor' selected={props.doctorID} setState={setAppointment} name='doctorID' list={doctor} /></Grid>


                    <Grid item xs={1}><MenuListComposition
                        layout={2}
                        handleSubmit={handleSubmit}
                        handleReset={handleReset}
                    /></Grid>


                </Grid>
            </Paper>

        )
    }

    const renderViewMode = () => {
        let { tx, date, patient, time, price, paymentMethod, doctor, SessionNB, totalSession } = props;
        date = date.slice(0, 10)


        return (
            <Paper className={classes.pageContent}>
                <Grid container className={classes.root}>
                    <Grid item xs={1}>

                        <FormLabel style={{ color: 'black' }}>{patient} </FormLabel>
                    </Grid>
                    <Grid item xs={2}>
                        <FormLabel style={{ color: 'black' }}>{date}  </FormLabel>

                    </Grid>
                    <Grid item xs={1}>
                        <FormLabel style={{ color: 'black' }}>{time}  </FormLabel>

                    </Grid>
                    <Grid item xs={2}>
                        <FormLabel style={{ color: 'black' }}>{tx}  </FormLabel>

                    </Grid>
                    <Grid item xs={1}>
                        <FormLabel style={{ color: 'black' }}>{SessionNB} </FormLabel>
                    </Grid>
                    <Grid item xs={1}>
                        <FormLabel style={{ color: 'black' }}>{price}</FormLabel>
                    </Grid>
                    <Grid item xs={1}>
                        <FormLabel style={{ color: 'black' }}>{totalSession}</FormLabel>

                    </Grid>

                    <Grid item xs={1}>
                        <FormLabel style={{ color: 'black' }}>{paymentMethod}</FormLabel>
                    </Grid>

                    <Grid item xs={1}>

                        <FormLabel style={{ color: 'black' }}>{doctor} </FormLabel>
                    </Grid>
                    <Grid item xs={1}>
                        <MenuListComposition layout={1}
                            handleDelete={handleDelete}
                            toggleEditMode={toggleEditMode}
                        />

                    </Grid>

                </Grid>
            </Paper>

            //             <tr style={{ backgroundColor: 'white' }}>
            //                 <td><FormLabel>{patient}</FormLabel></td>
            //                 <td><FormLabel>{date} {time}</FormLabel></td>
            //                 <td><FormLabel>{tx}</FormLabel></td>

            //                 <td><FormLabel>{SessionNB}</FormLabel></td>

            //                 <td><FormLabel>{totalSession}</FormLabel></td>
            //                 <td><FormLabel>{price}</FormLabel></td>

            //                 <td><FormLabel>{paymentMethod}</FormLabel></td>



            //                 <td><FormLabel>{doctor}</FormLabel></td>

            //                 <td><MenuListComposition layout={1}
            //                     handleDelete={handleDelete}
            //                     toggleEditMode={toggleEditMode}
            //                 /></td>

            //                 {/* <td><button   onClick={handleDelete} >x</button></td>
            //  <td><button  onClick={toggleEditMode}>edit</button></td> */}

            //             </tr>

        )
    }

    let { edit_mode } = state;

    if (edit_mode) return renderEditMode();
    else return renderViewMode();

}
export default DailyAgenda;