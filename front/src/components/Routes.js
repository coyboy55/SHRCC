import React, { useContext } from 'react';
import SessionContext from './session/SessionContext';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/login/Login';
import injuredSide from '../pages/injuredside/injuredSide';
import AffectedLimb from '../pages/affectedLimb/affectedLimb';
import Smoking from '../pages/smoking/smoking';
import Diagnosis from '../pages/diagnosis/diagnosis';
import Tool from '../pages/tool/tool';
import Doctor from '../pages/doctor/doctor';
import Tx from '../pages/tx/tx';
import testType from '../pages/testType/testType';
import STool from './Stool';

import TestFetching from '../pages/patient';
import  FileViewer  from '../components/fileViewer/fileViewer';
import PatientProfile from '../pages/patientProfile/index'
import theme from './theme'
import {ThemeProvider,CssBaseline} from '@material-ui/core'
import SideBar from './sidebar/Sidebar'

import DailyAgenda from '../pages/dailyAgenda/dailyAgenda'
import Patients from '../pages/patients';
import CreatePatient from '../pages/patients/createPatient';
import BasicPagination from './pag';
import CheckboxesTags from './testAutoComplete';


const layouts = {
    '/login': 'fullpage'
  



}


export default function Routes(props) {
    let layout = layouts[props.location.pathname] || "default";
    const {
        session: { user: { token } }
    } = useContext(SessionContext);

    return (
        <>
        {layout != "fullpage" ? (
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className='container'>
              
              <SideBar/>
            <Switch>
    
               
                <PrivateRoute path="/" component={DailyAgenda} token={token} exact />
                <PrivateRoute path="/injuredside" component={injuredSide} token={token}/>
             

                <PrivateRoute path="/affectedlimb" component={AffectedLimb} token={token}/>
                <PrivateRoute path="/smoking" component={Smoking} token={token}/>
                <PrivateRoute path="/diagnosis" component={Diagnosis} token={token}/>
                <PrivateRoute path="/tool" component={Tool} token={token}/>
                <PrivateRoute path="/doctor" component={Doctor} token={token}/>
                <PrivateRoute path="/tx" component={Tx} token={token}/>
                <PrivateRoute path="/testtype" component={testType} token={token}/>
                <PrivateRoute path="/stool" component={STool} token={token}/>
                <PrivateRoute path="/patients" component={Patients} token={token}/>
                <PrivateRoute path="/createpatient" component={CreatePatient} token={token}/>
                <PrivateRoute path="/pag" component={BasicPagination} token={token}/>
                <PrivateRoute path="/autocomplete" component={CheckboxesTags} token={token}/>





           
                {/* <PrivateRoute path="/patient/:patientID/:tab/:page" component={DailyTx} token={token}/> */}
                <PrivateRoute path="/dailyagenda/:date" component={DailyAgenda} token={token}/>
                

    
                {/* <PrivateRoute path="/patient/:patientID/:tab/:page/:idtyp" component={History} token={token}/> */}
                <PrivateRoute path="/testfetching" component={TestFetching} token={token}/>
         
                <PrivateRoute path="/fileviewer" component={FileViewer} token={token}/>
                {/* <PrivateRoute path="/patient/:patientID/:tab/:page" component={Test} token={token}/> */}
                {/* <PrivateRoute path="/patient/patientID/:tab/:page" component={Report} token={token}/> */}
                <Route path="/patient/:patientID/:tab/:page" component={PatientProfile} />
    
    
    
            </Switch>
      
             </div>
    </ThemeProvider>
        ):(
            <Switch>
 <PublicRoute path="/login" component={Login} token={token} />
            </Switch>
        )
    
    }

   
    </>
    );
}

function PublicRoute({ path, component: Component, token, ...props }) {
    return (
        <Route {...props} path={path} render={props => token ?
            <Redirect to="/" /> :
            <Component {...props} />
        } />
    )
}

function PrivateRoute({ path, component: Component, token, ...props }) {
    return (
        <Route {...props} path={path} render={props => token ?
            <Component {...props} /> :
            <Redirect to="/login" />
        } />
    )
}