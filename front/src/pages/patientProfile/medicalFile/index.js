import Menu from '../../../components/Menu'
import React from 'react';
import { useParams } from "react-router-dom";
import DailyTx from '../../dailyTx/DailyTx';
import History from '../../documents/History';
import Test from '../../documents/test';
import theme from '../../../components/theme'
import Report from '../../documents/report';
import {useHistory} from 'react-router-dom'
import { Paper, Tab, Tabs, makeStyles, ThemeProvider } from '@material-ui/core'

const useStyles = makeStyles({
        root: {
                flexGrow: 1,
                backgroundColor: '#F5F5F5',
                marginTop: theme.spacing(1)
        },
        tab: {
                backgroundColor: 'primary',
                textColor: 'white'
        }
});



export default function MedicalFile(props) {
        let history=useHistory();
        let [value, setValue] = React.useState(0);

        let patientID=props.patientID
        // let patientID = props.match.params.patientID;
    
        let handleChange = (event, newValue) => {
             history.push(`/patient/${patientID}/1/${newValue}`)
                setValue(newValue);
            };
        const classes = useStyles();
        return (
                <Paper elevation={0} square className={classes.root}>

                        <Tabs
                                 value={value}
                                 onChange={handleChange}
                                variant="fullWidth"
                                indicatorColor="primary"
                                textColor="secondary"
                                onChange={handleChange}

                        >

                                <Tab className={classes.tab} label="DAILY TX" />
                                <Tab label="HISTORY" />
                                <Tab label="TESTS" />
                                <Tab label="REPORT" />
                        </Tabs>
                        {value === 0 && <DailyTx patientID={patientID}/>}
            {value === 1 && <History patientID={patientID}/>}
            {value === 2 && <Test patientID={patientID}/>}
            {value === 3 && <Report patientID={patientID}/>}

                </Paper>

        )

   
}

