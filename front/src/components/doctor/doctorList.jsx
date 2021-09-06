
import Doctor from './doctor';
import { Transition, animated } from 'react-spring';
import style1 from "../../App.module.css"


 const DoctorList = (props) => {
  
        let { doctors, updateDoctor, deleteDoctor } = props;
        return (
          
            <Transition
            items={doctors}
            keys={doctor => doctor.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, doctor) => (
                <animated.div className={style1.ListFA} style={style}>
                    <Doctor
                        key={doctor.id}
                        id={doctor.id}
                        name={doctor.name}
                            phoneNumber={doctor.phoneNumber}
                            percentage={doctor.percentage}
                            updateDoctor={updateDoctor}
                            deleteDoctor={deleteDoctor}

                        />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default DoctorList