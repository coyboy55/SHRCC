import app from '../app'
const connection = require('../connection/DBConnection');
let smokingCRUD = () => {

    /*
function and route for get all the smokings
*/
// here we have the route and the controller 
    let getsmokings = () => {
        app.get('/smoking', async (req, res) => {// route 

            connection.con.query('select * from smoking', (err, result) => { // controller 
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
    function and route for get the smoking by id
    */
    let getsmoking = () => {
        app.get('/smoking/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from smoking where id=' + id, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.json(result);
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
    function and route for create smoking
    */
    let createsmoking = () => {
        app.post('/smoking', async (req, res) => {
 

            var obj=req.body
            var sql = "INSERT INTO smoking SET ?";
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
    function and route for update smoking
    */

    let updatesmoking = () => {
        app.put('/smoking/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update smoking SET ? where id=?";
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
  function and route for deleting the smoking by id
  */

    let deletesmoking = () => {
        app.delete('/smoking/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from smoking where id=' + id, (err, result) => {
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
    getsmokings();
    createsmoking();
    updatesmoking();
    getsmoking();
    deletesmoking();
}

module.exports = { smokingCRUD };

