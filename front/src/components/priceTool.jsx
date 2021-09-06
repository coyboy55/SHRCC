// import { useEffect, useState } from "react";
// import style1 from '/home/fakher/CODI/SHRC/front/src/App.module.css';
// import {Select,MenuItem} from '@material-ui/core'
// import { toast } from "react-toastify";
// import { lightGreen } from "@material-ui/core/colors";
// const PriceTool = (props) => {

    
//             let handleChange=(e)=>{
              
//                 let {value}=e.target
//             let name=props.name
//                 props.setState((p)=>({
//                     ...p,
//                     [name]:value
//                 }))
           
//             }
      


// let listt
// let list=props.list;
// let list1=[];
// let defaultValue;
// props.value && (defaultValue=props.value)
// list ? (
//  listt = props.list.map(tool=>(

//     <option selected={props.selected==tool.id}  value={tool.id}  key={tool.id}>
       
//         {tool.name}
         
//         </option>
// ))
// ):
// (
//     list = list1.map(tool=>(
    
    
//         <MenuItem   key={tool.id}>{tool.name}</MenuItem>
        
//     ))
// )

   
//     return ( 
//     <>
// <select  fullWidth onChange={handleChange}>
// <option ></option>
//     {listt}

// </select>
//     </> 
//     );
// }
 
// export default PriceTool;