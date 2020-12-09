import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express'); 
let router = express.Router();

router.get('/get', async (req, res) => {
    const id = req.query.id

    let query = `select id, first_name, last_name, phone_number, address, email, gender, salary, position, birth, join_date, dept_name from employee`
    if(id !== undefined) query += ` where id = '${id}'`
    console.log(query)
    try{
        const result = await db.dbQuery(query)
        if(result === null) throw 'query error'
        if (Object.keys(result) === 0) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err){
        res.status(404)
        res.json({"code": 404, "error" : err, "timestamp": new Date().getDate()})
    }
})


router.post('/add', async (req, res) => { 
    const data = req.body;
    try {
        let query = `select id, dept_name from employee where id = '${data.id}'`
        const check = await db.dbQuery(query)
        if (Object.keys(check).length !== 0) throw 'id exists'

        if (check[0].dept_name === 'info'){
            query = `insert into info values ('${data.id}', 9)`
        }

        query = `insert into employee values('${data.id}', '${data.password}', 
            '${data.first_name}', '${data.last_name}', '${data.phone_number}', '${data.address}', '${data.email}', '${data.gender}', '${data.salary}', '${data.dept_name}', 
            '${data.position}', '${data.birth}', '${data.join_date}')`
        const result = await db.dbQuery(query)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})
    } catch (error) {
        res.status(404)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate()})
    }
})

router.delete('/delete', async (req, res) => {
    const data = req.query;
    try {
        let query = `select id, dept_name from employee where id = '${data.id}'`
        const check = await db.dbQuery(query)
        if (Object.keys(check).length === 0) throw 'id not exists'

        switch (check[0].dept_name) {
            case 'info' :
                query = `update room set emp_id = null where emp_id = '${data.id}'`
                let subresult = await db.dbQuery(query)
                if(subresult === null) throw 'info_room error'

                query = `delete from info where emp_id = '${data.id}'`
                subresult = await db.dbQuery(query)
                if (subresult === null) throw 'info error'

                break;
            
            case 'planning' :
                query = `delete from planning where emp_id = '${data.id}'`
                const subresult2 = await db.dbQuery(query)
                if (subresult2 === null) throw 'planning error'
        }

        query = `delete from employee where id = '${data.id}'`
        const result = await db.dbQuery(query)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})
    } catch (error) {
        res.status(404)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate()})
    }
})

router.put('/change', async (req, res) => {
    const query = req.query;
    const data = req.body;

    try {
        let sqlStr = `select id, dept_name from employee where id = '${query.id}'`
        const check = await db.dbQuery(sqlStr)

        if (Object.keys(check).length === 0) throw 'not exists'
        if (check[0].dept_name === "info" && data.dept_name !== "info") {
            sqlStr = `update room set emp_id = null where emp_id = '${query.id}'`
            const subcheck_1 = await db.dbQuery(sqlStr)
            if(subcheck_1 === null) throw 'subcheck1_1 error'

            sqlStr = `delete from info where emp_id = '${query.id}'`
            const subcheck = await db.dbQuery(sqlStr)
            if(subcheck === null) throw 'subcheck1 error'
        } else if (check[0].dept_name !== "info" && data.dept_name === "info") {
            sqlStr = `insert into info values ('${query.id}', 9)`
            const subcheck = await db.dbQuery(sqlStr)
            if(subcheck === null) throw 'subcheck2 error'
        }

        sqlStr = `update employee set 
        first_name = '${data.first_name}', 
        last_name = '${data.last_name}', 
        phone_number = '${data.phone_number}',
        address = '${data.address}', 
        email = '${data.email}', 
        gender = '${data.gender}', 
        salary = ${data.salary}, 
        dept_name = '${data.dept_name}', 
        position = '${data.position}',
        birth = '${data.birth}',
        join_date = '${data.join_date}'
        where id = '${query.id}'`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})

    } catch (error) {
        res.status(404)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;