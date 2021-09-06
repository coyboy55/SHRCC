import { useEffect, useState } from "react";
import Select from '../Stool';
import { TextField, FormLabel, Grid,Paper,makeStyles } from '@material-ui/core'
import { getInjuredSide, getAffectedLimb, getTool, getDiagnosis, getTx } from '../../pages/controller/controller'
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
    pageContentt: {
        margin: theme.spacing(1),
        padding: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(1),
        width: '80%'
    }
}));


const DailyTx = (props) => {
const classes=useStyles();
    const [affectedLimb, setAffectedLimb] = useState([]);
    const [tool, setTool] = useState([]);
    const [diagnosis, setDiagnosis] = useState([]);
    const [tx, setTx] = useState([]);
    const [injuredSide, setInjuredSide] = useState([]);


    const [state, setState] = useState({
        edit_mode: false,
        id: props.id,
        note: props.note,
        date: props.date,
        rating: props.rating,


    })

    const [dailyTx, setDailytx] = useState({
        date: props.date,
        note: props.note,
        rating: props.rating,
        injuredSideID: props.injuredSideID,
        affectedLimbID: props.affectedLimbID,
        diagnosisID: props.diagnosisID,
        toolID: props.toolID,
        txID: props.txID
    });
    useEffect(() => {
        getInjuredSide(setInjuredSide);
        getTx(setTx);
        getDiagnosis(setDiagnosis);
        getTool(setTool);
        getAffectedLimb(setAffectedLimb);
    }, [])


    const toggleEditMode = () => {
        let edit_mode = !state.edit_mode;
        setState((prevState) => ({
            ...prevState,
            edit_mode,
        }));
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
        setDailytx((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    }



    const handleSubmit = (event) => {
        event.nativeEvent.preventDefault();
        let { id, updateDailyTx } = props;
        let { note, rating, injuredSideID, affectedLimbID, diagnosisID, toolID, txID } = dailyTx;
        let date = dailyTx.date.slice(0, 10)
        updateDailyTx(id, date, note, rating, injuredSideID, affectedLimbID, diagnosisID, toolID, txID);
        toggleEditMode();
    }
    const handleDelete = () => {

        let { id, deleteDailyTx } = props;

        deleteDailyTx(id);

    }


    const handleReset = (event) => {
        event.nativeEvent.preventDefault();
        let { note, date, rating } = props;
        setState({ note, date, rating });
        toggleEditMode();
    }

    const renderEditMode = () => {

        return (


            <Paper className={classes.pageContent}>
                <Grid container className={classes.root}>
                    <Grid item xs={1}>
                    <TextField
                            required
                            type="date"
                            name="date"
                            placeholder="Name"
                            value={dailyTx.date.slice(0, 10)}
                            onChange={handleChange}
                        />
                       

                    </Grid>

                    <Grid item xs={1}>
                    <Select label='Diagnosis' setState={setDailytx} value={props.diagnosis} name='diagnosisID' list={diagnosis} />


                    </Grid>

                    <Grid item xs={1}>
                    <Select label='injured Side' setState={setDailytx} name='injuredSideID' list={injuredSide} />


                    </Grid>

                    <Grid item xs={2}>
                        <Select label='Affected Limb' setState={setDailytx} name='affectedLimbID' list={affectedLimb} />

                    </Grid>

                    <Grid item xs={1}>
                    <Select label='TX' setState={setDailytx} name='txID' list={tx} />

                    </Grid>


                    <Grid item xs={1}>
                        <Select label='Tool' setState={setDailytx} name='toolID' list={tool} />

                    </Grid>

            
                    <Grid item xs={1}>
                        <TextField
                            required
                            type="text"
                            name="note"
                            placeholder="Name"
                            value={dailyTx.note}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid item xs={1}>
                        <TextField
                            required
                            type="number"
                            name="rating"
                            placeholder="Name"
                            min='0'
                            max='5'
                            value={dailyTx.rating}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <MenuListComposition
                            layout={2}
                            handleSubmit={handleSubmit}
                            handleReset={handleReset}
                        />
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    const renderViewMode = () => {
        let { note, tx, date, rating, injuredSide, affectedLimb, tool, diagnosis } = props;
        date = date.slice(0, 10)
        return (





            <Paper className={classes.pageContent}>
                <Grid container className={classes.root}>
                    <Grid item xs={1}>
       
                <FormLabel>{date}</FormLabel>
                       

                    </Grid>

                    <Grid item xs={1}>
                    <FormLabel>{diagnosis}</FormLabel>



                    </Grid>

                    <Grid item xs={1}>
                    <FormLabel>{injuredSide}</FormLabel>


                    </Grid>

                    <Grid item xs={2}>
                    <FormLabel>{affectedLimb}</FormLabel>
                    </Grid>

                    <Grid item xs={1}>
                            
       <FormLabel>{tx}</FormLabel>

                    </Grid>

                    <Grid item xs={1}>                  
               <FormLabel>{tool}</FormLabel>

                    </Grid>

                    <Grid item xs={1}>
                        <center>         <FormLabel style={{wordWrap:'break-word'}}>{note}</FormLabel></center>
           

                    </Grid>

                    <Grid item xs={1}>
                        <center><FormLabel>{rating}</FormLabel></center>
                    

                    </Grid>
                    <Grid item xs={1}>
                    
                <MenuListComposition layout={1}
                    handleDelete={handleDelete}
                    toggleEditMode={toggleEditMode}
                />

                    </Grid>
                </Grid>
            </Paper>


            
        )
    }

    let { edit_mode } = state;

    if (edit_mode) return renderEditMode();
    else return renderViewMode();

}
export default DailyTx;