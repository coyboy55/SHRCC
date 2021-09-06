import { useState } from "react";
import style from '../../App.module.css'

const AddDoctor  =(props)=> {
const [state,setState]=useState({
    name:'',
    phoneNumber:'',
    percentage:''
});
    

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();

        props.createDoctor(state.name,state.phoneNumber,state.percentage);
        console.log(state);
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
                <div>
                    <input className={style.inputFATable}
                        required
                        type="number"
                        name="phoneNumber"
                        placeholder="phoneNumber"
                        value={state.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input className={style.inputFATable}
                        required
                        type="number"
                        name="percentage"
                        placeholder="percentage"
                        value={state.percentage}
                        onChange={handleChange}
                    />
                </div>
                


                <button className={style.btnFATable} type="submit">add doctor</button>

            </form>
        )
    
}
export default AddDoctor;