import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {TextField,Button,FormLabel,Paper, makeStyles,Grid} from '@material-ui/core'
import '../../style.css'

import FileView from '../../components/fileViewer/fileViewer'

const useStyles = makeStyles(theme => ({
  root: {
      '& .MuiFormControl-root': {
          width: '80%',
          margin: theme.spacing(1),
      }
      
  },
  root1: {
 
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    width:'20%'
    
    
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

const History = (props) => {

  // let {idtype}=props.match.params
// console.log(props);
const [history,setHistory]=useState([])
const [file,setFile]=useState({
  img:{
    name:''
  }
})
const [description,setDescription]=useState('');


let patientID=props.patientID
let getHistory=async()=>{
    let url=`http://localhost:8080/testtypetest/${patientID}/1`

        try {
          const response = await fetch(url);
          const result = await response.json();
    
            const history = result.result;
           if(result.success){
            setHistory(history);
           }else{
             toast.warning('no data')
             setHistory([])
         
           }
    
        } catch (err) {
          let history= history.length === 1 ? [] : history 
      setHistory(history)

       //   setHistory({ error_message: err })
        }   
    
}
let handleChangefile=(e)=> {
   
  let { name, files } = e.target
  setFile({
      [name]: files[0]
  })
}

let createFile=async()=>{
  let { img } = file;
  
  let url = `http://localhost:8080/test`
  let url1=`http://localhost:8080/testtypetest/${patientID}/1`
  let body = null;
    body = new FormData();
  if (img) {
  
      body.append(`fileSrc`, img);
  }
  body.append('description',description);
  const response = await fetch(url, { method: 'POST', body });
  let res=await response.json();
  getHistory();
if(res.insertId){

  fetch(url1,{method:'post'});
  
}
}


let handleChange=(e)=>{
let value=e.target.value;
setDescription(value);

}

useEffect(()=>{
getHistory();

},[])
const classes=useStyles();
let path='http://localhost:8080/uploads/';
let list=history.map((item)=>(

 <Paper className={classes.root1}> 
 <FormLabel>{item.testType} </FormLabel>
 <FormLabel>{item.description} </FormLabel>
 <FileView getHistory={getHistory} id={item.id} getHistory={getHistory} description={item.description} file={path+item.fileSrc}/> 
 </Paper> 
))


    return (
      <div className="patientprofile">

<Paper className={classes.pageContent}>
                <Grid container className={classes.root}>
                    <Grid item xs={1}>
                                <label for='inpFile'>choose file :<FormLabel>{file.img.name}</FormLabel></label> 
                    </Grid>
                    <Grid item xs={2}>
                    <input style={{display:'none'}} id='inpFile' onChange={handleChangefile} type='file' name='img'/>

                    </Grid>
                    <Grid item xs={2}>
                    <TextField onChange={handleChange} placeholder='description....' type='text' name='description'/>


                    </Grid>
                    <Grid item xs={2}>
                    <Button   onClick={createFile}><i class='mdi mdi-upload'> </i>UPLOAD</Button>
                    </Grid>
                    </Grid>
                    </Paper>
      
<div style={{display:'flex',flexFlow:'wrap',justifyContent:'center'}}>{list}</div>


    </div>
     );
}
 
export default History;







 
   
  