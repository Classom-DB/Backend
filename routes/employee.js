import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const id = req.query.id
    const dept_name = req.query.dept_name
    let query = `select first_name, last_name, phone_number, address, email, gender, salary, position, birth, join_date, dept_name`

    const isId = (id == undefined) ? false : true;
    const isDN = (dept_name == undefined) ? false : true;

    const infoQuery = `, max_guest from hotel.employee, hotel.info where hotel.info.emp_id = hotel.employee.id`
    const deptQuery = `, facility_name from hotel.employee, hotel.management where hotel.management.emp_id = hotel.employee.id`
    
    try {
        if(isDN === true){
            if(dept_name == "info") query += infoQuery
            else if(dept_name == "facility") query += deptQuery
            else query += `from hotel.employee where dept_name = '${dept_name}'`

            if(isId === true) query += ` and id = '${id}'`
        } else if(isId === true) {
            const tmp_query = `select dept_name from hotel.employee where id = '${id}'`
            const result = await db.dbQuery(tmp_query)

            if(result[0]['dept_name'] == "info") query += infoQuery + ` and hotel.employee.id = '${id}'`
            else if(result[0]['dept_name'] == "facility") query += deptQuery +` and hotel.employee.id = '${id}'`
            else query += ` from hotel.employee where id = '${id}'`
            
        }
        else query += ` from hotel.employee`

    
        const result = await db.dbQuery(query)
        res.json(template.jsonCreate(result))
    } catch(err){
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})


router.post('/add', async (req, res) => {
    const data = req.body;
    try {
        console.log(data.id)
        let query = `select id from hotel.employee where id = '${data.id}'`
        const check = await db.dbQuery(query)
        if (check.length !== 0) throw 'id exists'
        query = `insert into hotel.employee values('${data.id}', '${data.password}', 
            '${data.first_name}', '${data.last_name}', '${data.phone_number}', '${data.address}', '${data.email}', '${data.gender}', '${data.salary}', '${data.dept_name}', 
            '${data.position}', '${data.birth}', '${data.join_date}')`
        const result = await db.dbQuery(query)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})
    } catch (error) {
        console.log(error)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;