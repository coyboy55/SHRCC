import { useState } from "react";
import style from '../../App.module.css'

const AddTx  =(props)=> {
const [state,setState]=useState({
    name:'',
    price:''
});
    

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();

        props.createTx(state.name,state.price);
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
                        name="price"
                        placeholder="price"
                        value={state.price}
                        onChange={handleChange}
                    />
                </div>
           
                


                <button className={style.btnFATable} type="submit">add TX</button>

            </form>
        )
    
}
export default AddTx;