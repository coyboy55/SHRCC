import app from '../app'
const connection = require('../connection/DBConnection');
let patientDiagnosisCRUD = () => {

    /*
function and route for get all the patientDiagnosiss
*/
//localhost:8000/patientDiagnosis
// here we have the route and the controller 
    let getpatientDiagnosiss = () => {
        app.get('/patientDiagnosis', async (req, res) => {// route 

            connection.con.query('select * from patientDiagnosis', (err, result) => { // controller 
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
    function and route for get the patientDiagnosis by id
    */
    let getpatientDiagnosis = () => {
        app.get('/patientDiagnosis/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select patientDiagnosis.id as id, diagnosis.name as name from patientDiagnosis join diagnosis on patientDiagnosis.diagnosisID=diagnosis.id where patientID=' + id, (err, result) => {
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
    function and route for get the patientDiagnosis by id
    */
    let getpatientDiagnosisss = () => {
        app.get('/patientDiagnosiss/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select patient.id as id, patient.firstName as firstName,patient.lastName as lastName, patient.mobileNumber as mobileNumber from patientDiagnosis join patient on patientDiagnosis.patientID=patient.id where diagnosisID=' + id, (err, result) => {
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
    function and route for create patientDiagnosis
    */
    let createpatientDiagnosis = () => {
        app.post('/patientDiagnosis', async (req, res) => {
            //   let patientDiagnosisDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var createStudent =req.body

            var sql = "INSERT INTO patientDiagnosis SET ?";
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
    function and route for update patientDiagnosis
    */

    let updatepatientDiagnosis = () => {
        app.put('/patientDiagnosis/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update patientDiagnosis SET ? where id=?";
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
  function and route for deleting the patientDiagnosis by id
  */

    let deletepatientDiagnosis = () => {
        app.delete('/patientDiagnosis/:id', async (req, res) => {
            let id = req.params.id;
          
            connection.con.query(`delete from patientDiagnosis where id=${id}`, (err, result) => {
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
    getpatientDiagnosiss();
    createpatientDiagnosis();
    updatepatientDiagnosis();
    getpatientDiagnosis();
    deletepatientDiagnosis();
    getpatientDiagnosisss();
}

module.exports = { patientDiagnosisCRUD };

