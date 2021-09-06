import { useState } from "react";
import style from "../../App.module.css"

const AddDiagnosis  =(props)=> {
const [name,setName]=useState('');
    

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();

        props.createDiagnosis(name);
    }

  let  handleChange = (event) => {
      let value = event.target.value;
  setName(value);
  
    }

        return (
            <form className={style.AddTable} onSubmit={handleSubmit}>

                <div>
                    <input className={style.inputFATable}
                        required
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>


                <button className={style.btnFATable} type="submit">add diagnosis</button>

            </form>
        )
    
}
export default AddDiagnosis;