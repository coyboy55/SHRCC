import { useState } from "react";
import style1 from '../../App.module.css'


const Doctor = (props)=> {

const[state,setState]=useState({
      edit_mode: false,
        id: props.id,
        name: props.name,
        phoneNumber: props.phoneNumber,

        percentage: props.percentage,

      
})


   const toggleEditMode = () => {
        let edit_mode = !state.edit_mode;
        setState((prevState)=>({
            ...prevState,
            edit_mode,
          }));
    }

    const handleChange = (event) => {
        let { name, value } = event.target;
     setState((prevState)=>({
            ...prevState,
            [name]:value,
          }));
    }

    

const    handleSubmit = (event) => {
        event.nativeEvent.preventDefault();
        let { id, updateDoctor } = props;
        let { name,phoneNumber,percentage } = state;
        updateDoctor(name,phoneNumber,percentage,id);
        toggleEditMode();
    }
    const    handleDelete = () => {
  
        let { id, deleteDoctor } = props;
       
        deleteDoctor(id);
       
    }

   const handleReset = (event) => {
        event.nativeEvent.preventDefault();
        let { name  } = props;
        setState({ name });
        toggleEditMode();
    }

   const renderEditMode = () => {
   
        return (
            <div className="contact_card">
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div>
                        <input className={style1.inputFATable}
                            required
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={state.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input className={style1.inputFATable}
                            required
                            type="text"
                            name="phoneNumber"
                            placeholder="phoneNumber"
                            value={state.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input className={style1.inputFATable}
                            required
                            type="text"
                            name="percentage"
                            placeholder="percentage"
                            value={state.percentage}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                       
                    </div>
                    <button className={style1.btnFATable} type="reset" className="marginRight">cancel</button>
                    <button className={style1.btnFATable} type="submit">update Doctor</button>
                </form>
            </div>
        )
    }

   const renderViewMode = () => {
        let {name,phoneNumber,percentage } = props;
        return (
            <div className="contact_card">
                <p>{name}</p>
                <p>{phoneNumber}</p>

                <p>{percentage}</p>

             
                <button className="delete marginRight" onClick={handleDelete} >x</button>
                <button onClick={toggleEditMode}>edit</button>
            </div>
        )
    }

        let { edit_mode } = state;

        if (edit_mode) return renderEditMode();
        else return renderViewMode();
    
}
export default Doctor;