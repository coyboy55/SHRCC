
import DailyTx from './dailyTx';
const DailyTxList = (props) => {

    let { dailyTxs, updateDailyTx, deleteDailyTx } = props;
    return (
       
     


            dailyTxs.map((dailyTx) => (
                
                    <DailyTx
                        key={dailyTx.id}
                        id={dailyTx.id}
                        note={dailyTx.note}
                        date={dailyTx.date}
                        rating={dailyTx.rating}

                        injuredSideID={dailyTx.injuredSideID}
                        injuredSide={dailyTx.injuredSide}
                  
                        affectedLimbID={dailyTx.affectedLimbID}
                        affectedLimb={dailyTx.affectedLimb}

                        toolID={dailyTx.toolID}
                        tool={dailyTx.tool}

                        txID={dailyTx.toolID}
                        tx={dailyTx.tx}

                        diagnosisID={dailyTx.diagnosisID}
                        diagnosis={dailyTx.diagnosis}
                        updateDailyTx={updateDailyTx}
                        deleteDailyTx={deleteDailyTx}

                    />
            
            ))
       
     
      
    )

}

export default DailyTxList