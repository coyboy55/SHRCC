import app from '../app'
const connection = require('../connection/DBConnection');
let affectedLimbInjuredSidePatientCRUD = () => {

    /*
route and controller for getting all the IaffectedLimbInjuredSidePatients
*/
    let getaffectedLimbInjuredSidePatients = () => {

        app.get('/affectedlimbinjuredsidepatient', (req, res) => {
            let sql = "SELECT * FROM affectedLimbInjuredSidePatient";
            try {
                connection.con.query(sql, (err, result) => {
                    if (result.length > 0) {
                        res.status(200).json({ success: true, result: result });

                    } else {
                        res.status(404).json({ success: false });
                    }
                });

            } catch (e) {
                res.status(500).json({ success: false });
            }
        })
    }
    /*
    route and controller for getting a specific IaffectedLimbInjuredSidePatient by id
    */
    let getaffectedLimbInjuredSidePatient = () => {
        app.get('/affectedlimbinjuredsidepatient/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from affectedLimbInjuredSidePatient where patientID=' + id, (err, result) => {
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
    route and controller for create a specific affectedLimbInjuredSidePatient
    */
    let createaffectedLimbInjuredSidePatient = () => {
        app.post('/affectedlimbinjuredsidepatient', async (req, res) => {

            var createStudent = req.body

            var sql = "INSERT INTO affectedLimbInjuredSidePatient SET ?";
            try {
                connection.con.query(sql, [createStudent], (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })
    }

    /*
    route and controller for update a specific IaffectedLimbInjuredSidePatient by id
    */
    let updateaffectedLimbInjuredSidePatient = () => {
        app.put('/affectedlimbinjuredsidepatient/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update affectedLimbInjuredSidePatient SET ? where patientID=?";
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
    route and controller for delete a specific affectedLimbInjuredSidePatient by id
    */
    let deleteaffectedLimbInjuredSidePatient = () => {
        app.delete('/affectedlimbinjuredsidepatient/:idA/:idI', async (req, res) => {
            let {idA,idI}=req.params;
            connection.con.query(`delete from affectedLimbInjuredSidePatient where affectedLimbID=${idA} AND injuredSideID=${idI}`, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }

       /*
    route and controller for getting for each patient what side is error
    */
    let injuredSidePerPatient = () => {
        app.get('/injuredSidePerPatient/:id', async (req, res) => {
            let id = req.params.id;

          let q1=`SELECT        injuredSide.*
          FROM            patient  JOIN
          affectedLimbInjuredSidePatient ON patient.id = affectedLimbInjuredSidePatient.patientID  JOIN
                                   injuredSide ON affectedLimbInjuredSidePatient.injuredSideID = injuredSide.id
          WHERE        (patient.id = ${id})`


            connection.con.query(q1, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }

       /*
    route and controller for getting for each patient what LEFT affectedLiimb
    */
    let affectedLimbL = () => {
        app.get('/affectedLimbb/:idp/:idi', async (req, res) => {
            let {idp,idi} = req.params;

          let q1=`SELECT  affectedLimb.name as name 
          from affectedLimbInjuredSidePatient 
          JOIN affectedLimb on affectedLimb.id=affectedLimbInjuredSidePatient.affectedLimbID
          where 
          affectedLimbInjuredSidePatient.patientID=${idp} AND affectedLimbInjuredSidePatient.injuredSideID=${idi}
          
          `


            connection.con.query(q1, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }


           /*
    route and controller for getting for each patient what affectedLimb and wich Side
    */
    let sideAffectPatient = () => {
        app.get('/sideAffectPatient/:id', async (req, res) => {
            let id = req.params.id;

          let q1=`SELECT        affectedLimb.name as affectedLimb, injuredSide.name as injuredSide, smoking.quantity as smoking
          FROM            patient  JOIN
          affectedLimbInjuredSidePatient ON patient.id = affectedLimbInjuredSidePatient.patientID  JOIN
                                   affectedLimb ON affectedLimbInjuredSidePatient.affectedLimbID = affectedLimb.id
                                   JOIN
                                   injuredSide ON affectedLimbInjuredSidePatient.injuredSideID = injuredSide.id
                                   JOIN
                                   smoking ON affectedLimbInjuredSidePatient.smokingID = smoking.id
                           
          WHERE        (patient.id = ${id})`


            connection.con.query(q1, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }

 /*
    search by injured side
    
    */
    let searchPatientByInjuredSide = () => {
        app.get('/searchpatientbyinjuredside/:id', async (req, res) => {
            let id = req.params.id;
          let q1=`SELECT        patient.*
          FROM            injuredSide  JOIN
          affectedLimbInjuredSidePatient ON injuredSide.id = affectedLimbInjuredSidePatient.injuredSideID  JOIN
                                   patient ON affectedLimbInjuredSidePatient.patientID = patient.id
          WHERE        (injuredSide.id = ${id})`

            connection.con.query(q1, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }


 /*
    search by affectedLimb
    
    */
    let searchPatientByAffectedLimb = () => {
        app.get('/searchpatientbyaffectedlimb/:id', async (req, res) => {
            let id = req.params.id;
          let q1=`SELECT        patient.*
          FROM            affectedLimb  JOIN
          affectedLimbInjuredSidePatient ON affectedLimb.id = affectedLimbInjuredSidePatient.affectedLimbID  JOIN
                                   patient ON affectedLimbInjuredSidePatient.patientID = patient.id
          WHERE        (affectedLimb.id = ${id})`

            connection.con.query(q1, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }


    /*
    filter
    */
    searchPatientByInjuredSide();
    searchPatientByAffectedLimb();


    sideAffectPatient();
    injuredSidePerPatient();

    deleteaffectedLimbInjuredSidePatient();
    createaffectedLimbInjuredSidePatient();
    getaffectedLimbInjuredSidePatients();
    getaffectedLimbInjuredSidePatient();
    affectedLimbL();
    updateaffectedLimbInjuredSidePatient();
    
}
module.exports = { affectedLimbInjuredSidePatientCRUD };
