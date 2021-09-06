import "./sidebar.css"
import logo from "./images/SHRC_Logo_white.png"
import { Group, EventNote, Lock, ExitToApp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import SessionContext from '../../components/session/SessionContext';
import {useContext} from 'react'
import moment from 'moment'
import Menu from '../Menu'

const useStyles = makeStyles(theme => ({
    sidebar: {
        flex: 1,
        backgroundColor: '#6DCFF6',
        [theme.breakpoints.down('sm')]: {
            // position: 'absolute',
            // left: -200,
            // width: 200,
            backgroundColor: '#6DCFF6',
            transition: theme.transitions.create('left')
        }
    }
}))


export default function Sidebar() {
    let currentdate=new Date();
    let date=moment(currentdate).format('YYYY-MM-DD')
    const {
        actions: { logout }
    } = useContext(SessionContext);
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.sidebar}>
            <div className="logo-container">
                <img src={logo} alt="SHRC-Logo-White" />
            </div>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <ul className="sidebarList">
                        <li onClick={()=>history.push('/patients')} className="sidebarListItem">
                            <Group className="sidebarIcons" />
                            
                            <Typography/>PATIENTS
                        </li>
                        <li onClick={()=>history.push(`/dailyagenda/${date}`)} className="sidebarListItem">
                            <EventNote className="sidebarIcons" />DAILY AGENDA
                        </li>
                     
                       <Menu />
                       
                    </ul>
                    <ul className="sidebarList2">
                        <div style={{ borderTop: "2px solid #fff ", marginBottom: 10, marginTop: 10, marginLeft: 3, marginRight: 3 }}></div>
                        {/* <li className="sidebarListItem">
                            <Lock className="sidebarIcons" />ADMINS
                        </li> */}
                        <li onClick={logout} className="sidebarListItem">
                            
                            <ExitToApp  className="sidebarIcons" />LOGOUT
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}


