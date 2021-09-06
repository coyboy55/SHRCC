import { Paper, makeStyles, FormLabel, Radio, TextField, pagi, Select, Button } from "@material-ui/core"
import AddCircle from '@material-ui/icons/AddCircle'
import Search from '@material-ui/icons/Search'
import Pagination from '@material-ui/lab/Pagination'
import { getDiagnosis, getAffectedLimb } from '../controller/controller'
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SELECTM from '../../components/Stool'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    },
    root2: {
        '& > *': {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(10)
        },
    },

    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        width: theme.spacing(18),
        height: theme.spacing(22),
        textAlign: 'center',

    },
    icon: {
        marginTop: theme.spacing(6),
        transform: 'scale(2)'
    },
    icon1: {
        marginTop: theme.spacing(2),
        transform: 'scale(3)'
    },
    label: {
        marginTop: theme.spacing(2),


    },
    label1: {
        marginTop: theme.spacing(3),


    },
    label2: {
        marginTop: theme.spacing(1),


    },
    button: {
        margin: theme.spacing(1),
        width: '80%',

    },
    searchTextColor: {
        '& input': {
            color: "#FFF",
        }
    },

}));


const Patients = () => {
    const classes = useStyles();
    let history = useHistory();
    const [search, setSearch] = useState();
    const [patient, setPatient] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [diagnosis, setDiagnosis] = useState([]);
    const [diagnosisID, setDiagnosisID] = useState();

    const [affectedLimb, setAffectedLimb] = useState([]);
    const [affectedLimbID, setAffectedLimbID] = useState([]);

    const injuredSide = [
        {
            id: 3,
            name: "Left"
        },
        {
            id: 240,
            name: 'Right'
        }
    ]
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);

    let getPatients = async () => {
        let url = 'http://localhost:8080/patient'
        let res = await fetch(url);
        let result = await res.json();
        console.log(result);
        if (result.success) {
            setPatient(result.result)
            setPages(
                Math.floor(result.result.length / perPage)
            )
        }
    }
    let getPatientsD = async () => {
        let url = 'http://localhost:8080/patientDiagnosiss/' + diagnosisID.diagnosisID
        let res = await fetch(url);
        let result = await res.json();
        console.log(result);
        if (result.success) {
            setPatient(result.result)
            setPages(
                Math.floor(result.result.length / perPage)
            )
        }
    }

    let getPatientSearch = async () => {
        let url = 'http://localhost:8080/patientbys'
        let body = new URLSearchParams();
        body.append('search', search);

        let res = await fetch(url, { body, method: 'post' });
        let result = await res.json();
        console.log(result);
        if (result.success) {
            setPatient(result.result)
            setPages(
                Math.floor(result.result.length / perPage)
            )
        } else {
            setPatient([])
        }
    }
    useEffect(() => {
        getDiagnosis(setDiagnosis);
        getAffectedLimb(setAffectedLimb);
    }, [])
    useEffect(() => {
        if (search) {
            const delayDebounceFn = setTimeout(() => {getPatientSearch()}, 750); return () => clearTimeout(delayDebounceFn)
        }
        else if (diagnosisID) {
            getPatientsD()
        } else {
            getPatients()
        }



    }, [search, diagnosisID])
    let handleChange = (e, value) => {
        let page = value;
        setPage(page - 1)
    }
    const [firstName, setFirstName] = useState();
    let handleSearch = (e) => {

    }
    let lis = patient.slice(page * perPage, (page + 1) * perPage)

    let list = lis.map((item) => (
        <Paper key={item.id} className={classes.pageContent} style={{ backgroundColor: '#EAEAEA' }}>
            <div style={{ color: '#4671A2' }} className={classes.icon1}><AccountCircleIcon /></div>
            <div onClick={() => history.push(`/patient/${item.id}/0/0`)} className={classes.label1} style={{ color: '#4671A2', fontWeight: 'bold' }}> {item.firstName} {item.lastName}</div>
            <div className={classes.label2} style={{ color: '#4671A2' }}><span style={{ fontWeight: 'bold' }}>ID</span> {item.id}</div>
            <div style={{ color: '#4671A2' }}><span style={{ fontWeight: 'bold' }}>M</span> {item.mobileNumber}</div>

        </Paper>
    ))
    return (
        <div style={{ backgroundColor: '#CCEEFC' }} className="patientprofile">

            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="header">

                <h2>Patients</h2>
                <div style={{ width: '60%', display: 'flex', justifyContent: 'space-evenly' }}>
                    <SELECTM color={true} label='DIAGNOSIS' name='diagnosisID' setState={setDiagnosisID} list={diagnosis}></SELECTM>
                    {/* <SELECTM label='affectedLimb'  setState={setAffectedLimbID} list={affectedLimb}></SELECTM>  
          <SELECTM label='injuredSide' list={injuredSide}></SELECTM>   */}
                    <Button style={{ color: 'white', backgroundColor: '#CCEEFC' }} onClick={() => setDiagnosisID(null)}>ALL</Button>

                    <FormLabel><Search style={{ color: 'white' }} /><TextField className={classes.searchTextColor} onChange={(e) => { setDiagnosisID(null); setSearch(e.target.value) }}></TextField></FormLabel>
                </div>

            </div>
            <div style={{display: 'flex', flexFlow:'wrap'}}>
                <Paper onClick={() => history.push('/createpatient')} className={classes.pageContent} style={{ backgroundColor: '#EAEAEA' }}>
                    <i style={{ color: '#6DCFF6' }}><AddCircle className={classes.icon} /></i>

                    <div className={classes.label}> <FormLabel style={{ color: '#6DCFF6' }}>
                        Add New
</FormLabel></div>

                </Paper>
                {list}

            </div>
            <div className={classes.root2}>

                <Pagination variant="outlined" color="primary" onChange={handleChange} count={pages + 1} />
            </div>
        </div>

    );
}

export default Patients;