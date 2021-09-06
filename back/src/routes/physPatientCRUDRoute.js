import app from '../app'
const connection = require('../connection/DBConnection');
let physPatientCRUD = () => {

    /*
function and route for get all the physPatients
*/
//localhost:8000/physPatient
// here we have the route and the controller 
    let getphysPatients = () => {
        app.get('/physPatient', async (req, res) => {// route 

            connection.con.query('select * from physPatient', (err, result) => { // controller 
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
    function and route for get the physPatient by id
    */
    let getphysPatient = () => {
        app.get('/physPatient/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select physicl.name as name from physPatient join physicl on physPatient.physID=physicl.id where physPatient.patientID=' + id, (err, result) => {
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
    function and route for create physPatient
    */
    let createphysPatient = () => {
        app.post('/physPatient', async (req, res) => {
            //   let physPatientDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var createStudent = req.body

            var sql = "INSERT INTO physPatient SET ?";
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
    function and route for update physPatient
    */

    let updatephysPatient = () => {
        app.put('/physPatient/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update physPatient SET ? where id=?";
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
  function and route for deleting the physPatient by id
  */

    let deletephysPatient = () => {
        app.delete('/physPatient/:id/:idPh', async (req, res) => {
            let id = req.params.id;
            let idPh=req.params.idPh;
            connection.con.query(`delete from physPatient where physPatient.patientID=${id} AND physPatient.physID<>${idPh}`, (err, result) => {
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
    getphysPatients();
    createphysPatient();
    updatephysPatient();
    getphysPatient();
    deletephysPatient();
}

module.exports = { physPatientCRUD };

