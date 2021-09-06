import app from '../app'
const connection = require('../connection/DBConnection');
let txCRUD = () => {

    /*
function and route for get all the txs
*/
    let gettxs = () => {
        app.get('/tx', async (req, res) => {

            connection.con.query('select * from tx', (err, result) => {
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
    function and route for get the tx by id
    */
    let gettx = () => {
        app.get('/tx/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from tx where id=' + id, (err, result) => {
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
    function and route for create tx
    */
    let createtx = () => {
        app.post('/tx', async (req, res) => {
            //   let txDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj=req.body;

            var sql = "INSERT INTO tx SET ?";
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
    function and route for update tx
    */

    let updatetx = () => {
        app.put('/tx/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update tx SET ? where id=?";
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
  function and route for deleting the tx by id
  */

    let deletetx = () => {
        app.delete('/tx/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from tx where id=' + id, (err, result) => {
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
    gettxs();
    createtx();
    updatetx();
    gettx();
    deletetx();
}

module.exports = { txCRUD };

