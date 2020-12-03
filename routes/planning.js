import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    let query = `select id, in_time, content, first_name, last_name from planning, employee where planning.emp_id = employee.id`
    if(req.query !== undefined) query += ` where id = ${req.query.id}`
    try {
        const result = await db.dbQuery(query)
        res.json(template.jsonCreate(result))
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.put('/change', async (req, res) => {
    const data = req.body
    
    try {
        const check = `select id from planning where id = ${data.id}`
        const check_result = await db.dbQuery(check)
        console.log(check_result)
        if(check_result === undefined) throw 'null data'

        const query = `update planning set content = '${data.content}' where id = ${data.id}`
        const result = await db.dbQuery(query)
        if(result === undefined || result === null) throw 'query error'
        res.json({"data" : "succuess", "code" : 200, "timestamp" : new Date().getDate()})
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})

router.post('/add', async (req, res) => {
    const data = req.body
    try {
        const query = `insert into planning values('${data.in_time}', '${content}', '${emp_id}')`
        const result = await db.dbQuery(query)
        if (result === undefined) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})

router.delete('/delete', async (req, res) => {
    const inquery = req.query
    try {
        const query = `delete from planning where id = ${inquery.id}`
        const result = await db.dbQuery(query)
        if (result === undefined) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})


module.exports = router;