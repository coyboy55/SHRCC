import app from '../app'
const connection = require('../connection/DBConnection');
let affectedLimbCRUD = () => {

    /*
route and controller for getting all the IaffectedLimbs
*/
    let getaffectedLimbs = () => {

        app.get('/affectedlimb', (req, res) => {
            let sql = "SELECT * FROM affectedLimb";
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
    /*
    route and controller for getting a specific IaffectedLimb by id
    */
    let getaffectedLimb = () => {
        app.get('/affectedlimb/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from affectedLimb where id=' + id, (err, result) => {
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
    route and controller for create a specific affectedLimb
    */
    let createaffectedLimb = () => {
        app.post('/affectedlimb', async (req, res) => {

            var createStudent = req.body

            var sql = "INSERT INTO affectedLimb SET ?";
            try {
                connection.con.query(sql, [createStudent], (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })
    }

    /*
    route and controller for update a specific IaffectedLimb by id
    */
    let updateaffectedLimb = () => {
        app.put('/affectedlimb/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update affectedLimb SET ? where id=?";
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
    route and controller for delete a specific affectedLimb by id
    */
    let deleteaffectedLimb = () => {
        app.delete('/affectedLimb/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from affectedLimb where id=' + id, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }

    deleteaffectedLimb();
    createaffectedLimb();
    getaffectedLimbs();
    getaffectedLimb();
    updateaffectedLimb();
}
module.exports = { affectedLimbCRUD };
