import { useState,forwardRef } from "react";
import FileViewer from 'react-file-viewer';

import axios from 'axios'
import {toast} from 'react-toastify'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TextField} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FileView = (props) => {

  const classes = useStyles();
let file;
let type;



const[show,setShow]=useState(false);
const[edit,setEdit]=useState(false);
const [filee,setFile]=useState([])
const [description,setDescription]=useState('');
let handleToggle=()=>{
  setShow(!show)
}


let handleDelete=async()=>{
  let id=props.id
  let url=`http://localhost:8080/test/${id}`
  let bool=window.confirm('are u sure')
 if(bool){
  let res=await fetch(url,{method:'delete'})
let result=await res.json();
result.success && (toast.success('deleted'));
const delayDebounceFn = setTimeout(() => {props.getHistory()}, 750); return () => clearTimeout(delayDebounceFn)


 }
}

let handleSubmit=async()=>{
  let id=props.id
  let { img } = filee;
  
  let url = `http://localhost:8080/test/${id}`

  let body = null;
 body = new FormData();
  if (img) {
     
      body.append(`fileSrc`, img);
  }
  body.append('description',description);
  axios.request({
    method: "put", 
    url: `http://localhost:8080/test/${id}`, 
    data:body,
    onUploadProgress: (p) => {
      if(p.total){

          props.getHistory();
         
      }
  
    }
  }).then (data => {

  })


}



let handleEdit=()=>{
  setEdit(!edit);
}

let handleChange=(e)=>{
  let value=e.target.value;
  setDescription(value)

}

let handleChangeFile=(e)=> {
   
  let { name, files } = e.target
  setFile({
      [name]: files[0]
  })
}




if(props.file){
 file = props.file;
 type = file.split('.').pop();
}
else{

}


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
              FILE
            </Typography>
          </Toolbar>
        </AppBar>
        <FileViewer

filePath={file}
fileType={type}
/>
<div>
   <Button onClick={handleEdit}>update</Button>
</div>
      

{edit && (
<div>
  <TextField onChange={handleChangeFile} name='img' type='file'/>
   <TextField onChange={handleChange} name='description' type='text'/>
   <Button onClick={handleSubmit}>update</Button>
   <Button onClick={handleEdit}>cancel editing</Button>
   </div>
   )

   }
<Button  onClick={handleToggle}>Cancel</Button> 
</Dialog>
</div>

):(<div>

 <Button onClick={handleToggle}>Show</Button>
 <Button onClick={handleDelete}>delete</Button>
</div>
)

}

    </div>
     );
}
 
export default FileView;







 
   
  