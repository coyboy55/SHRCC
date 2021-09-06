import app from '../app'
const connection = require('../connection/DBConnection');
let toolCRUD = () => {

    /*
function and route for get all the tools
*/
    let gettools = () => {
        app.get('/tool', async (req, res) => {

            connection.con.query('select * from tool', (err, result) => {
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
    function and route for get the tool by id
    */
    let gettool = () => {
        app.get('/tool/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from tool where id=' + id, (err, result) => {
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
    function and route for create tool
    */
    let createtool = () => {
        app.post('/tool', async (req, res) => {
            //   let toolDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj =req.body;

            var sql = "INSERT INTO tool SET ?";
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
    function and route for update tool
    */

    let updatetool = () => {
        app.put('/tool/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update tool SET ? where id=?";
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
  function and route for deleting the tool by id
  */

    let deletetool = () => {
        app.delete('/tool/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from tool where id=' + id, (err, result) => {
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
    gettools();
    createtool();
    updatetool();
    gettool();
    deletetool();
}

module.exports = { toolCRUD };

