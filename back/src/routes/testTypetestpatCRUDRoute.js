import app from '../app'
const connection = require('../connection/DBConnection');
let testTypeTestCRUD = () => {

    /*
function and route for get all the testTypeTests
*/
    let gettestTypeTests = () => {
        app.get('/testtypetest', async (req, res) => {

            connection.con.query('select * from testTypeTest', (err, result) => {
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
    function and route for get the testTypeTest by id
    */
    let gettestTypeTest = () => {
        app.get('/testtypetest/:idp/:idt', async (req, res) => {
            let { idp, idt } = req.params;
            let query = `select test.id, test.fileSrc,test.description
from testTypeTest

JOIN test ON test.id=testTypeTest.testID

where patientID=${idp} AND testTypeID=${idt}`
            connection.con.query(query, (err, result) => {
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
    function and route for get the testTypeTest by id and not hitory
    */
    let gettestTypeTestNot = () => {
        app.get('/testtypetest/:idp', async (req, res) => {
            let { idp, idt } = req.params;
            let query = `select test.id, test.fileSrc,test.description,testType.name as testType
from testTypeTest

JOIN test ON test.id=testTypeTest.testID
JOIN testType ON testType.id=testTypeTest.testTypeID


where patientID=${idp} AND testType.name!='history'`
            connection.con.query(query, (err, result) => {
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
    function and route for create testTypeTest
    */
    let createtestTypeTest = () => {
        app.post('/testtypetest/:idp/:idtype', async (req, res) => {



            connection.con.query('SELECT id FROM test WHERE id=(SELECT max(id) FROM test)', (err, result) => {
                var sql = "INSERT INTO testTypeTest SET ?";
                const obj = {
                    'testID': result[0].id,
                    'patientID': req.params.idp,
                    'testTypeID': req.params.idtype

                }
                try {
                    connection.con.query(sql, obj, (err, result) => {
                        res.json(result);
                    });
                } catch (e) {
                    res.send('error')
                }
        
            })
        })




    }

    /*
    function and route for update testTypeTest
    */

    let updatetestTypeTest = () => {
        app.put('/testtypetest/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update testTypeTest SET ? where id=?";
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
  function and route for deleting the testTypeTest by id
  */

    let deletetestTypeTest = () => {
        app.delete('/testTypeTest/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from testTypeTest where id=' + id, (err, result) => {
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
    gettestTypeTests();
    createtestTypeTest();
    updatetestTypeTest();
    gettestTypeTest();
    gettestTypeTestNot();
    deletetestTypeTest();
}

module.exports = { testTypeTestCRUD };

