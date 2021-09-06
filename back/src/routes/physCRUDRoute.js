import app from '../app'
const connection = require('../connection/DBConnection');
let physiclCRUD = () => {

    /*
function and route for get all the physicls
*/
//localhost:8000/physicl
// here we have the route and the controller 
    let getphysicls = () => {
        app.get('/physicl', async (req, res) => {// route 

            connection.con.query('select * from physicl', (err, result) => { // controller 
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
    function and route for get the physicl by id
    */
    let getphysicl = () => {
        app.get('/physicl/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from physicl where id=' + id, (err, result) => {
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
    function and route for create physicl
    */
    let createphysicl = () => {
        app.post('/physicl', async (req, res) => {
            //   let physiclDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var createStudent = {
                'name': req.body.name,
                'email': req.body.email,
                'password': req.body.password
            }

            var sql = "INSERT INTO physicl SET ?";
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
    function and route for update physicl
    */

    let updatephysicl = () => {
        app.put('/physicl/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update physicl SET ? where id=?";
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
  function and route for deleting the physicl by id
  */

    let deletephysicl = () => {
        app.delete('/physicl/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from physicl where id=' + id, (err, result) => {
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
    getphysicls();
    createphysicl();
    updatephysicl();
    getphysicl();
    deletephysicl();
}

module.exports = { physiclCRUD };

