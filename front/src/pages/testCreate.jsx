import {  useState } from "react";

const CreatePatient = () => {

    const [tool,setTool]=useState('');



let handleChange=(e)=>{
let value=e.target.value
setTool(value);
}
    return ( <>
    <input onChange={handleChange} type='text'/>

    <button value='create'/>
    </>
     );
}
 
export default CreatePatient;