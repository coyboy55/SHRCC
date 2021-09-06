import app from '../app'
const connection = require('../connection/DBConnection');

let teacherCRUD=()=>{
/*
route and controller for getting all the teacher
*/
let getTeachers=()=>{

app.get('/teachers', (req,res)=>{
let sql="SELECT * FROM teacher";
   connection.con.query(sql, (err, result)=>{
    res.status(200).json({ success: true, result: result });
        });
})
}
/*
route and controller for getting a specific teacher by id
*/
let getTeacher=()=>{

}

/*
route and controller for create a specific teacher
*/
let createTeacher=()=>{

}

/*
route and controller for update a specific teacher by id
*/
let updateTeacher=()=>{

}

/*
route and controller for delete a specific teacher by id
*/
let deleteTeacher=()=>{

}
getTeachers();
}

module.exports={teacherCRUD};