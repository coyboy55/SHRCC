import app from '../app'
const connection = require('../connection/DBConnection');

let doctorCRUD = () => {

    /*
function and route for get all the doctors
*/
    let getdoctors = () => {
        app.get('/doctor', async (req, res) => {

            connection.con.query('select * from doctor', (err, result) => {
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
    function and route for get the doctor by id
    */
    let getdoctor = () => {
        app.get('/doctor/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from doctor where id=' + id, (err, result) => {
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
    function and route for create doctor
    */
    let createdoctor = () => {
        app.post('/doctor', async (req, res) => {
            //   let doctorDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj=req.body;

            var sql = "INSERT INTO doctor SET ?";
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
    function and route for update doctor
    */

    let updatedoctor = () => {
        app.put('/doctor/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update doctor SET ? where id=?";
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
  function and route for deleting the doctor by id
  */

    let deletedoctor = () => {
        app.delete('/doctor/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from doctor where id=' + id, (err, result) => {
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
    getdoctors();
    createdoctor();
    updatedoctor();
    getdoctor();
    deletedoctor();
}

module.exports = { doctorCRUD };

