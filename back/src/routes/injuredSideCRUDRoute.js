import app from '../app'
const connection = require('../connection/DBConnection');
let injuredSideCRUD = () => {

    /*
route and controller for getting all the InjuredSides
*/
    let getInjuredSides = () => {

        app.get('/injuredside', (req, res) => {
            let sql = "SELECT * FROM injuredSide";
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
    route and controller for getting a specific InjuredSide by id
    */
    let getInjuredSide = () => {
        app.get('/injuredside/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from injuredSide where id=' + id, (err, result) => {
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
    route and controller for create a specific InjuredSide
    */
    let createInjuredSide = () => {
        app.post('/injuredside', async (req, res) => {

            var createStudent = req.body

            var sql = "INSERT INTO injuredSide SET ?";
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
    route and controller for update a specific InjuredSide by id
    */
    let updateInjuredSide = () => {
        app.put('/injuredside/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update injuredSide SET ? where id=?";
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
    route and controller for delete a specific InjuredSide by id
    */
    let deleteInjuredSide = () => {
        app.delete('/injuredside/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from injuredSide where id=' + id, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }

    deleteInjuredSide();
    createInjuredSide();
    getInjuredSides();
    getInjuredSide();

    updateInjuredSide();
}
module.exports = { injuredSideCRUD };
