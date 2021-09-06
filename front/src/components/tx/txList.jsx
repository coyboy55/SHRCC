
import Tx from './tx';
import { Transition, animated } from 'react-spring';
import style1 from '../../App.module.css'


 const TxList = (props) => {
  
        let { txs, updateTx, deleteTx } = props;
        return (
          
            <Transition
            items={txs}
            keys={tx => tx.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, tx) => (
                <animated.div className={style1.ListFA} style={style}>
                    <Tx
                        key={tx.id}
                        id={tx.id}
                        name={tx.name}
                            price={tx.price}
                    
                            updateTx={updateTx}
                            deleteTx={deleteTx}

                        />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default TxList