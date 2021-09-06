import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SelectType from '../../components/Stool'
import FileView from '../../components/fileViewer/fileViewer'
import {TextField,Button,Select,FormLabel,Paper,Grid,makeStyles} from '@material-ui/core';
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



const Test = (props) => {
const classes=useStyles();

let patientID=props.patientID;
const [history,setHistory]=useState([])
const [file,setFile]=useState({
  img:{
    name:''
  }
})
const [description,setDescription]=useState('');
const [types,setTypes]=useState([]);
const [typeID,setTypeID]=useState(0);





let getHistory=async()=>{
    let url=`http://localhost:8080/testtypetest/${patientID}`

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
          let history=history.length === 1 ? [] : history 
          setHistory(history)
         // setHistory({ error_message: err })
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
  let url1=`http://localhost:8080/testtypetest/${patientID}/${typeID.typeID}`

  let body = null;
    body = new FormData();
  if (img) {
  
      body.append(`fileSrc`, img);
  }
  body.append('description',description);
  const response = await fetch(url, { method: 'POST', body });
  let res=await response.json()
 
if(res.insertId){


  let res1=await fetch(url1,{method:'post'}).then(()=> getHistory());
  // let result1=await res1.json();

  
}
}


let handleChange=(e)=>{
let value=e.target.value;
setDescription(value);

}



let getTestType=async()=>{
    let url=`http://localhost:8080/testtypeNot`

        try {
          const response = await fetch(url);
          const result = await response.json();
    
            const types = result.result;
           if(result.success){
            setTypes(types);
           }else{
             toast.warning('no data')
           }
    
        } catch (err) {
          setTypes({ error_message: err })
        }   
    
}

useEffect(()=>{
getHistory();
getTestType();
},[])



// let list1=types.map((item)=>(
// <Paper>  
//    <FormLabel>{item.name}</FormLabel>
//    {history.filter(z=><p>{z.testType==item.name}</p>

//   )}
   
//     </Paper>


// ))



let list2=[]

let path='http://localhost:8080/uploads/';
let list=history.map((item)=>( 

 <Paper className={classes.root1}> 
 TYPE :<FormLabel>{item.testType} </FormLabel>
 DESCRIPTION :<FormLabel>{item.description} </FormLabel>
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
                    <FormLabel>Type :</FormLabel>
    <SelectType setState={setTypeID} name='typeID' list={types}/>


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
 
export default Test;







 
   
  