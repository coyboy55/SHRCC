import app from '../app'
const connection = require('../connection/DBConnection');
let dailyTxCRUD = () => {

    /*
function and route for get all the users
*/
    let getDailyTxPatient = () => {
        app.get('/dailytxpatient/:id', async (req, res) => {
let id=req.params.id;
let query=`SELECT dailyTX.id, dailyTX.rating,dailyTX.note, dailyTX.date, 
injuredSide.id as injuredSideID, injuredSide.name as injuredSide, injuredSide.id as injuredSideID,affectedLimb.id as affectedLimbID, affectedLimb.name as affectedLimb,
 tool.id as toolID,tool.name as tool,
diagnosis.id as diagnosisID,diagnosis.name as diagnosis,tx.id as txID,tx.name as tx

FROM dailyTX  

LEFT JOIN affectedLimb ON affectedLimb.id = dailyTX.affectedID  
LEFT JOIN  injuredSide ON injuredSide.id = dailyTX.injuredSideID
LEFT JOIN  tool ON tool.id = dailyTX.toolID
LEFT JOIN  diagnosis ON diagnosis.id = dailyTX.diagnosisID
LEFT JOIN  tx ON tx.id = dailyTX.txID

 WHERE (dailyTX.patientID = ${id})
 ORDER BY dailyTX.date
 `;
            connection.con.query(query, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.status(200).json({ success: true, result: result });
                    } else {
                        res.status(404).json({ success: false });
                    }

                } catch (e) {
                    res.status(500).json({ success: 'error' });

                }
            })
        });
    }





        /*
function and route for get all the dailyTX
*/
let getDailyTx = () => {
    app.get('/dailytx', async (req, res) => {

        connection.con.query('select * from dailyTX', (err, result) => {
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
    function and route for update dailyTX
    */

    let updateDailyTx = () => {
        app.put('/dailytx/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update dailyTX SET ? where id=?";
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
    function and route for create a dailyTX
    */
    let createdailyTX = () => {
        app.post('/dailytx', async (req, res) => {
          

            var obj=req.body;

            var sql = "INSERT INTO dailyTX SET ?";
           
                connection.con.query(sql, [obj], (err, result) => {
                    res.json(result);
                });
       
        })
    }



      /*
  function and route for deleting the dailytx by id
  */

  let deletedailyTx = () => {
    app.delete('/dailytx/:id', async (req, res) => {
        let id = req.params.id;
        connection.con.query('delete from dailyTX where id=' + id, (err, result) => {
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
   
    updateDailyTx();
    getDailyTx();
    createdailyTX();
    deletedailyTx();
    getDailyTxPatient();
   
}

module.exports = { dailyTxCRUD };

