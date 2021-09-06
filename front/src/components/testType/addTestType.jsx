import { useState } from "react";
import style from '../../App.module.css'

const AddTestType  =(props)=> {
const [state,setState]=useState({
    name:''
});
    

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();
        props.createTestType(state.name);
    }

  let  handleChange = (event) => {
      let {name,value} = event.target;
      setState((prevState)=>({
        ...prevState,
        [name]:value,
      }));
    }

        return (
            <form className={style.AddTable} onSubmit={handleSubmit}>

                <div>
                    <input className={style.inputFATable}
                        required
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={state.name}
                        onChange={handleChange}
                    />
                </div>     
        
                <button className={style.btnFATable} type="submit">add testType</button>

            </form>
        )
    
}
export default AddTestType;