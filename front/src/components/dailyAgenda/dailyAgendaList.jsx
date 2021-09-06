
import DailyAgenda from './dailyAgenda';




const DailyTxList = (props) => {

    let { dailyAgendas, updateDailyAgenda, deleteDailyAgenda } = props;
   
    return (
       
     


        dailyAgendas.map((dailyAgenda) => (
                
                    <DailyAgenda
                        key={dailyAgenda.id}
                        id={dailyAgenda.id}
                       
                        date={dailyAgenda.date}
                    time={dailyAgenda.time}

                    doctorID={dailyAgenda.doctorID}
                    doctor={dailyAgenda.doctor}
price={dailyAgenda.price}
                    paymentMethodID={dailyAgenda.paymentMethodID}
                    paymentMethod={dailyAgenda.paymentMethod}

                    patientID={dailyAgenda.patientID}
                    patient={dailyAgenda.patient}

                    txID={dailyAgenda.txID}
                    tx={dailyAgenda.tx}
                 
                    SessionNB={dailyAgenda.sessionNB}

                    totalSession={dailyAgenda.totalSession}

                        updateDailyAgenda={updateDailyAgenda}
                        deleteDailyAgenda={deleteDailyAgenda}

                    />
            
            ))
       
     
      
    )

}

export default DailyTxList