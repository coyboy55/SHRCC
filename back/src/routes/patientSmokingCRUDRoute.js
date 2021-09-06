import app from '../app'
const connection = require('../connection/DBConnection');
let smokingPatientCRUD = () => {

    /*
function and route for get all the smokingPatients
*/
//localhost:8000/smokingPatient
// here we have the route and the controller 
    let getsmokingPatients = () => {
        app.get('/smokingPatient', async (req, res) => {// route 

            connection.con.query('select * from smokingPatient', (err, result) => { // controller 
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
    function and route for get the smokingPatient by id
    */
    let getsmokingPatient = () => {
        app.get('/smokingPatient/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from smokingPatient where id=' + id, (err, result) => {
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


    let getsmokingPatientS = () => {
        app.get('/smokingPatientS/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select smoking.name as name from smokingPatient join smoking on smokingPatient.smokingID=smoking.id where smokingPatient.patientID=' + id, (err, result) => {
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
    function and route for create smokingPatient
    */
    let createsmokingPatient = () => {
        app.post('/smokingPatient', async (req, res) => {
            //   let smokingPatientDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var createStudent = req.body;
            var sql = "INSERT INTO smokingPatient SET ?";
            try {
                connection.con.query(sql, createStudent, (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })



    }

    /*
    function and route for update smokingPatient
    */

    let updatesmokingPatient = () => {
        app.put('/smokingPatient/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update smokingPatient SET ? where id=?";
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
  function and route for deleting the smokingPatient by id
  */

    let deletesmokingPatient = () => {
        app.delete('/smokingPatient/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from smokingPatient where smokingPatient.smokingID=' + id, (err, result) => {
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
    getsmokingPatients();
    createsmokingPatient();
    updatesmokingPatient();
    getsmokingPatient();
    deletesmokingPatient();
    getsmokingPatientS();
}

module.exports = { smokingPatientCRUD };

