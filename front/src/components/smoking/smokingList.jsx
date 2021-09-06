
import Smoking from './smoking';
import { Transition, animated } from 'react-spring';
import style1 from '../../App.module.css'


 const SmokingList = (props) => {
  
        let { smokings, updateSmoking, deleteSmoking } = props;
        return (
          
            <Transition  
            items={smokings}
            keys={smoking => smoking.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, smoking) => (
                <animated.div className={style1.ListFA} style={style}>
                    <Smoking 
                        key={smoking.id}
                        id={smoking.id}
                        name={smoking.name}
                       updateSmoking={updateSmoking}
                       deleteSmoking={deleteSmoking}

                    />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default SmokingList