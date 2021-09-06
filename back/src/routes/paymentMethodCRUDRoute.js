import app from '../app'
const connection = require('../connection/DBConnection');
let paymentMethodCRUD = () => {

    /*
function and route for get all the paymentMethods
*/
//localhost:8000/paymentMethod
// here we have the route and the controller 
    let getpaymentMethods = () => {
        app.get('/paymentmethod', async (req, res) => {// route 

            connection.con.query('select * from paymentMethod', (err, result) => { // controller 
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
    function and route for get the paymentMethod by id
    */
    let getpaymentMethod = () => {
        app.get('/paymentmethod/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from paymentMethod where id=' + id, (err, result) => {
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
    function and route for create paymentMethod
    */
    let createpaymentMethod = () => {
        app.post('/paymentmethod', async (req, res) => {
            //   let paymentMethodDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var createStudent = {
                'name': req.body.name,
                'email': req.body.email,
                'password': req.body.password
            }

            var sql = "INSERT INTO paymentMethod SET ?";
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
    function and route for update paymentMethod
    */

    let updatepaymentMethod = () => {
        app.put('/paymentmethod/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update paymentMethod SET ? where id=?";
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
  function and route for deleting the paymentMethod by id
  */

    let deletepaymentMethod = () => {
        app.delete('/paymentmethod/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from paymentMethod where id=' + id, (err, result) => {
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
    getpaymentMethods();
    createpaymentMethod();
    updatepaymentMethod();
    getpaymentMethod();
    deletepaymentMethod();
}

module.exports = { paymentMethodCRUD };

