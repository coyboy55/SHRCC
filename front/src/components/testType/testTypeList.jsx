
import TestType from './testType';
import { Transition, animated } from 'react-spring';
import style1 from '../../App.module.css'

 const TestTypeList = (props) => {
  
        let { testTypes, updateTestType, deleteTestType } = props;
        return (
          
            <Transition
            items={testTypes}
            keys={testType => testType.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, testType) => (
                <animated.div className={style1.ListFA} style={style}>
                    <TestType
                        key={testType.id}
                        id={testType.id}
                        name={testType.name}
                            price={testType.price}
                    
                            updateTestType={updateTestType}
                            deleteTestType={deleteTestType}

                        />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default TestTypeList