import { useState,forwardRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Grid,FormLabel,Paper} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    '& .MuiFormControl-root': {
        width: '80%',
        margin: theme.spacing(1),
    }
},
pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    width:'75%'
},
pageContent2: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    width:'25%'
},
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AllAppointment = (props) => {

    const [show,setShow]=useState(false);

  const classes = useStyles();
let handleToggle=()=>{
  setShow(!show)
}



let list=props.appointments.reverse().map(item=>(
    <>
    <Grid style={{borderBottom:'1px #4671A2 solid',marginTop:'10px'}} item xs={6}>
     <FormLabel> {item.date}</FormLabel>
</Grid>
<Grid style={{borderBottom:'1px #4671A2 solid',marginTop:'10px'}}  item xs={6}>
  <FormLabel>  {item.time} </FormLabel>
</Grid>
</>
))

    return (

     <div>
     
{show ? (

  <div>
<Dialog fullScreen open={show}  onClose={handleToggle} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleToggle} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Appointments
            </Typography>
          </Toolbar>
        </AppBar>
        <center>
        <Paper className={classes.pageContent2}>
                <Grid container >
                    <Grid item xs={6}>
                        <FormLabel style={{color:'#4671A2'}}>DATE</FormLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel style={{color:'#4671A2'}}>TIME</FormLabel>
                    </Grid>
                     </Grid>
                     <Grid container >
                 {list}
                     </Grid>                       
                    </Paper>
                    </center>


</Dialog>
</div>

):(<div>

 <Button onClick={handleToggle}>Show More</Button>
</div>
)

}

    </div>
     );
}
 
export default AllAppointment;







 
   
  