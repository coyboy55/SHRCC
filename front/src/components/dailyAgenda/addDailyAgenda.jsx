import { useEffect, useState } from "react";
import {getTx,getDoctor,getPatients,getPayment} from '../../pages/controller/controller'
import Select from '../Stool';
 import {Button,TextField} from '@material-ui/core'


const AddDailyAgenda  =(props)=> {

const [doctor, setDoctor] = useState([]);
    const [payment, setPayment] = useState([]);
    const [tx, setTx] = useState([]);
    const [patients, setPatients] = useState([]);




  const [appointment, setAppointment] = useState({
      patientID:'',
    date: '',
 time:'',
 doctorID:'',
 sessionNB:'',
 paymentID:'',
     txID: ''
  });
    useEffect(()=>{

     getDoctor(setDoctor);
     getPayment(setPayment);
        getTx(setTx);
        getPatients(setPatients);

       
    },[])

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();
        let {    patientID,
        date,
     time,
     doctorID,
     sessionNB,
     paymentID,
         txID}=appointment
    props.createDailyAgenda(patientID,
        date,
     time,
     doctorID,
     sessionNB,
     paymentID,
         txID)    
   
    }

  let  handleChange = (event) => {
      let {name,value} = event.target;
      setAppointment((prevState)=>({
        ...prevState,
        [name]:value,
      }));
    }

        return (
            <tr>
                <td><Select setState={setAppointment} name='patientID' list={patients}/></td>
                 <td>
                        <TextField 
                            required
                            type="date"
                            name="date"
                            placeholder="date"
                            value={appointment.date}
                            onChange={handleChange}
                        />
                             <TextField 
                            required
                            type="time"
                            name="time"
                            placeholder="time"
                            value={appointment.date}
                            onChange={handleChange}
                        />
                    </td> 
          

                  
                    <td><Select setState={setAppointment} name='txID' list={tx}/></td>

                    
                    <td>
                        <TextField 
                            required
                            type="number"
                            name="sessionNB"
                            placeholder="sessionNB"
                            value={appointment.sessionNB}
                            onChange={handleChange}
                        />
                    </td>
                    <td></td>
                    <td></td>
                    <td><Select setState={setAppointment} name='paymentID' list={payment}/></td>          
                   
                    <td><Select setState={setAppointment} name='doctorID' list={doctor}/></td>
                 <td><Button style={{backgroundColor:'transparent',border:'none'}} onClick={handleSubmit}><i style={{color:'white'}} className='mdi mdi-plus'></i></Button></td>
                    
                </tr>
        )
    
}
export default AddDailyAgenda;