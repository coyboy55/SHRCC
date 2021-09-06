import { useState } from "react";
import style from '../../App.module.css'

const AddAffectedLimb  =(props)=> {
const [name,setName]=useState('');
    

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();

        props.createAffectedLimb(name);
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


                <button className={style.btnFATable} type="submit">add affectedLimb</button>

            </form>
        )
    
}
export default AddAffectedLimb;