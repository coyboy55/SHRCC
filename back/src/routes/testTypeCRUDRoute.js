import app from '../app'
const connection = require('../connection/DBConnection');
let testTypeCRUD = () => {

    /*
function and route for get all the testTypes
*/
    let gettestTypes = () => {
        app.get('/testtype', async (req, res) => {

            connection.con.query(`select * from testType`, (err, result) => {
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
function and route for get all the testTypes
*/
let gettestTypesnot = () => {
    app.get('/testtypeNot', async (req, res) => {

        connection.con.query(`select * from testType where name!='history'`, (err, result) => {
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
    function and route for get the testType by id
    */
    let gettestType = () => {
        app.get('/testtype/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from testType where id=' + id, (err, result) => {
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
    function and route for create testType
    */
    let createtestType = () => {
        app.post('/testtype', async (req, res) => {
            //   let testTypeDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj=req.body;

            var sql = "INSERT INTO testType SET ?";
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
    function and route for update testType
    */

    let updatetestType = () => {
        app.put('/testtype/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update testType SET ? where id=?";
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
  function and route for deleting the testType by id
  */

    let deletetestType = () => {
        app.delete('/testtype/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from testType where id=' + id, (err, result) => {
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
    gettestTypes();
    createtestType();
    updatetestType();
    gettestTypesnot();
    gettestType();
    deletetestType();
}

module.exports = { testTypeCRUD };

