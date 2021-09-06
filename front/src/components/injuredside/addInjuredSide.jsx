import { useState } from "react";
import style from '../../App.module.css'

const AddInjuredSide  =(props)=> {
const [name,setName]=useState('');
    

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();

        props.createInjuredSide(name);
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


                <button className={style.btnFATable}  type="submit">add contact</button>

            </form>
        )
    
}
export default AddInjuredSide;