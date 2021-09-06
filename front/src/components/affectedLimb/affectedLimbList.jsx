
import AffectedLimb from './affectedLimb';
import { Transition, animated } from 'react-spring';
import style1 from '../../App.module.css'

 const AffectedLimbList = (props) => {
  
        let { affectedlimbs, updateAffectedLimb, deleteAffectedLimb } = props;
        return (
          
            <Transition
            items={affectedlimbs}
            keys={affectedLimb => affectedLimb.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, affectedLimb) => (
           <animated.div className={style1.ListFA} style={style}>
                    <AffectedLimb
                        key={affectedLimb.id}
                        id={affectedLimb.id}
                        name={affectedLimb.name}
                       updateAffectedLimb={updateAffectedLimb}
                       deleteAffectedLimb={deleteAffectedLimb}

                    />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default AffectedLimbList