
import Test from './injured';
import { Transition, animated } from 'react-spring';
import style1 from '../../App.module.css'


 const ContactList = (props) => {
  
        let { contacts, updateInjured, deleteInjured } = props;
        return (
          
            <Transition
            items={contacts}
            keys={contact => contact.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, contact) => (
                <animated.div className={style1.ListFA} style={style}>
                    <Test
                        key={contact.id}
                        id={contact.id}
                        name={contact.name}
                       updateInjured={updateInjured}
                       deleteInjured={deleteInjured}

                    />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default ContactList