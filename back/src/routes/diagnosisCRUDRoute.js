import app from '../app'
const connection = require('../connection/DBConnection');
let diagnosisCRUD = () => {

    /*
function and route for get all the diagnosiss
*/
    let getdiagnosiss = () => {
        app.get('/diagnosis', async (req, res) => {

            connection.con.query('select * from diagnosis', (err, result) => {
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
function and route for get all the diagnosiss
*/
let getdiagnosissS = () => {
    app.post('/diagnosiss', async (req, res) => {
        let search=req.body.search

        connection.con.query(`select * from diagnosis where diagnosis.name LIKE '%${search}%'` , (err, result) => {
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
    function and route for get the diagnosis by id
    */
    let getdiagnosis = () => {
        app.get('/diagnosis/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from diagnosis where id=' + id, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.json({ success: true, result: result });
                    } else {
                        res.json({ success: false });
                    }

                } catch (e) {
                    res.json({ success: error });

                }
            })
        });
    }

    /*
    function and route for create diagnosis
    */
    let creatediagnosis = () => {
        app.post('/diagnosis', async (req, res) => {
            //   let diagnosisDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj =req.body;

            var sql = "INSERT INTO diagnosis SET ?";
            try {
                connection.con.query(sql, obj, (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })



    }

    /*
    function and route for update diagnosis
    */

    let updatediagnosis = () => {
        app.put('/diagnosis/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update diagnosis SET ? where id=?";
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
  function and route for deleting the diagnosis by id
  */

    let deletediagnosis = () => {
        app.delete('/diagnosis/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from diagnosis where id=' + id, (err, result) => {
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
    getdiagnosiss();
    creatediagnosis();
    updatediagnosis();
    getdiagnosis();
    deletediagnosis();
    getdiagnosissS();
}

module.exports = { diagnosisCRUD };

