
import Diagnosis from './diagnosis';
import { Transition, animated } from 'react-spring';
import style1 from '../../App.module.css'


 const DiagnosisList = (props) => {
  
        let { diagnosiss, updateDiagnosis, deleteDiagnosis } = props;
        return (
          
            <Transition
            items={diagnosiss}
            keys={diagnosis => diagnosis.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, diagnosis) => (
                <animated.div className={style1.ListFA} style={style}>
                    <Diagnosis
                        key={diagnosis.id}
                        id={diagnosis.id}
                        name={diagnosis.name}
                       updateDiagnosis={updateDiagnosis}
                       deleteDiagnosis={deleteDiagnosis}

                    />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default DiagnosisList