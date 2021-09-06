import app from '../app'
const connection = require('../connection/DBConnection');
let appointmentCRUD = () => {

    /*
function and route for get all the appointments
*/
    let getappointments = () => {
        app.get('/appointment', async (req, res) => {
          let query=`SELECT appointment.date,
           appointment.time,
           
           appointment.sessionNB,
            patient.firstName,
             tx.name as name,
              doctor.name as doctor,
              paymentMethod.name as paymentMethod
          from appointment
         LEFT JOIN patient ON patient.id=appointment.patientID 
         LEFT JOIN tx ON tx.id=appointment.txID
         LEFT  JOIN paymentMethod ON paymentMethod.id=appointment.paymentMethodID

         LEFT JOIN doctor ON doctor.id=appointment.doctorID`

            connection.con.query(query, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.status(200).json({ success: true, result: result });
                    } else {
                        res.status(404).json({ success: false });
                    }

                } catch (e) {
                    res.status(500).json({ success: false });

                }
            })
        });
    }

    /*
    function and route for get the appointment by date
    */
    let getappointment = () => {
        app.post('/appointmentd', async (req, res) => {
            let date= req.body.date;
            let query= `SELECT appointment.date, appointment.id,
            appointment.time,
            
            appointment.sessionNB,
            CONCAT(patient.firstName,' ',patient.lastName) as patient  ,
               tx.name as tx,tx.id as txID,
              tx.price as price,
              patient.totalSession as totalSession,patient.id as patientID,
               doctor.name as doctor,doctor.id as doctorID,
               paymentMethod.name as paymentMethod,paymentMethod.id as paymentMethodID
           from appointment
          LEFT JOIN patient ON patient.id=appointment.patientID 
          LEFT JOIN tx ON tx.id=appointment.txID
          LEFT  JOIN paymentMethod ON paymentMethod.id=appointment.paymentMethodID
 
          LEFT JOIN doctor ON doctor.id=appointment.doctorID
             where appointment.date='${date}'
             ORDER BY appointment.time
             `
            connection.con.query(query, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.json({ success: true, result: result });
                    } else {
                        res.json({ success: false });
                    }

                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }



    let getappointmentByPatient = () => {
        app.get('/appointmentd/:id', async (req, res) => {
            let id= req.params.id;
            let query= `SELECT appointment.date, appointment.id,
            appointment.time
            from appointment 
            Where appointment.patientID=${id}
             `
            connection.con.query(query, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.json({ success: true, result: result });
                    } else {
                        res.json({ success: false });
                    }

                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }






    /*
    function and route for create appointment
    */
    let createappointment = () => {
        app.post('/appointment', async (req, res) => {
            //   let appointmentDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj=req.body;
            var sql = "INSERT INTO appointment SET ?";
            try {
                connection.con.query(sql, [obj], (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })



    }




    /*
    function and route for update appointment
    */

    let updateappointment = () => {
        app.put('/appointment/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update appointment SET ? where id=?";
            var arr = req.body;
            try {
                connection.con.query(sql, [arr, id], (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })

    }
    /*
  function and route for deleting the appointment by id
  */

    let deleteappointment = () => {
        app.delete('/appointment/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from appointment where id=' + id, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }
    /*
    we must call every function we created in above
    */
    getappointments();
    createappointment();
    updateappointment();
    getappointment();
    deleteappointment();
    getappointmentByPatient();
}

module.exports = { appointmentCRUD };

