
import app from '../app'
const connection = require('../connection/DBConnection');
let patientCRUD = () => {

    /*
route and controller for getting all the patients
*/
    let getpatients = () => {

        app.get('/patient', (req, res) => {
            let sql = "SELECT * FROM patient";
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



    let getpatientName = () => {

        app.get('/patientname', (req, res) => {
            let sql = `SELECT id, CONCAT(patient.firstName,' ',patient.lastName) as name           
            FROM patient`;
            try {
                connection.con.query(sql, (err, result) => {
                    if (result && result.length > 0) {
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
    route and controller for getting a specific patient by id
    */
    let getpatient = () => {
        app.get('/patient/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select *  from patient where patient.id=' + id, (err, result) => {
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
    route and controller for getting a specific patient by id
    */
    let getpatientBySearch = () => {
        app.post('/patientbys/', async (req, res) => {
            let search = req.body.search
            connection.con.query(`select *  from patient where patient.firstName LIKE '%${search}%'`, (err, result) => {
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
    route and controller for getting a specific patient report by id
    */
    let getpatientReport = () => {
        app.get('/patientR/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select report from patient where patient.id=' + id, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.json({ success: true, report: result[0].report });
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
    route and controller for create a specific patient
    */
    let createpatient = () => {
        app.post('/patient', async (req, res) => {
let name=req.body.firstName+' '+req.body.lastName;
            var createStudent = req.body
            createStudent['name']=name;
            var sql = "INSERT INTO patient SET ?";
            try {
                connection.con.query(sql, [createStudent], (err, result) => {
                    res.json(result);
                  //  var sql=`INSERT INTO patient set name='${req.body.firstName} ${lastName}'`
                });
            } catch (e) {
                res.send('error')
            }
        })
    }

    /*
    route and controller for update a specific patient by id
    */
    let updatepatient = () => {
        app.put('/patient/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update patient SET ? where id=?";
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
    function and route for update total session
    */

    let sessionTotal = () => {
        app.put('/patientst/:id/', async (req, res) => {

            let id = req.params.id; 
            var sql = `update patient SET patient.totalSession=patient.totalSession+1 where id=${id}`;
          
            try {
                connection.con.query(sql, (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })

    }


      /*
    route and controller for update report a specific patient by id
    */
    let updatepatientR = () => {
        app.put('/patientr/:id', async (req, res) => {

            let id = req.params.id;
             var report = req.body.report;
            var sql = "update patient SET report = '"+report+"' where id="+id;
           
            try {
                connection.con.query(sql, (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })
    }

    /*
    route and controller for delete a specific patient by id
    */
    let deletepatient = () => {
        app.delete('/patient/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from patient where id=' + id, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }

    deletepatient();
    createpatient();
    getpatients();
    updatepatient();
    getpatient();
    getpatientReport();
    sessionTotal();
    updatepatientR();
    getpatientBySearch();
    getpatientName();
}
module.exports = { patientCRUD };
