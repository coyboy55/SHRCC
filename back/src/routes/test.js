import app from '../app'
const connection = require('../connection/DBConnection');
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const testCRUD = async () => {


    const upload = () => {
        const multerStorage = multer.diskStorage({
            destination: path.join(__dirname, '../../public/uploads'),
            filename: (req, file, cb) => {
                const { fieldname, originalname } = file;

                const date = Date.now();
                // filename will be: image-1345923023436343-filename.png
                const filename = `${fieldname}-${date}-${originalname}`;
                cb(null, filename);

            }
        })

        const upload = multer({ storage: multerStorage })

        // CREATE image
        app.post('/test', upload.single('fileSrc'), async (req, res, next) => {

            let obj = {
                'fileSrc': req.file && req.file.filename,
                'description': req.body.description
            }

            let sql = 'INSERT INTO test SET ?';
            try {
                connection.con.query(sql, obj, (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                next(e)
            }

        })
    }


    const update = () => {

        const multerStorage = multer.diskStorage({
            destination: path.join(__dirname, '../../public/uploads'),
            filename: (req, file, cb) => {
                const { fieldname, originalname } = file;
                const date = Date.now();
                // filename will be: image-1345923023436343-filename.png
                const filename = `${fieldname}-${date}-${originalname}`;
                cb(null, filename);
            }
        })

        const upload = multer({ storage: multerStorage })


        app.put('/test/:id', upload.single('fileSrc'), (req, res, next) => {

            let { id } = req.params;
            let sql = 'select fileSrc from test where id=' + id
            var sql1 = "update test SET ? where id=" + id;
            if (req.file) {
                connection.con.query(sql, (err, result) => {
                    let a = 'public/uploads/' + result[0].fileSrc;

                    fs.unlink(a, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    });
                })
            }
            let obj = {};
            if (req.file && !req.body.description) {
                obj = {
                    'fileSrc': req.file && req.file.filename
                }
            } else if (req.body && !req.file && req.body.description) {
                obj = {
                    'description': req.body.description
                }
            } else if (req.body && req.file && req.file.filename && req.body.description) {
                obj = {
                    'fileSrc': req.file && req.file.filename,
                    'description': req.body.description
                }
            }
            console.log(obj);


            connection.con.query(sql1, obj, (err, result) => {
                res.send(result)
            })





        })
    }

    const remove = () => {

        app.delete('/test/:id', (req, res) => {

            let { id } = req.params;
            let sql = 'select fileSrc from test where id=' + id
            let sql1 = 'delete from test where id=' + id;

            connection.con.query(sql, (err, result) => {
                let a = 'public/uploads/' + result[0].fileSrc;

                // let a='/home/fakher/CODI/SHRC/back/public/images/Screenshot from 2021-07-01 22-05-31.png'
                
                fs.unlink(a, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    } else {
                        connection.con.query(sql1, (err, result) => {
                            res.send({ success: true });
                        })
                    }


                });

            })

        })

    }

    upload();
    remove();
    update();

}

module.exports = { testCRUD };