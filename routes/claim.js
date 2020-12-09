import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => { 
    const data = req.query
    try {
        const query = `select claim.id, type, message, claim.state, claim.guest_id, emp_id, in_time, out_time, room_num 
        from claim
        join reserved on claim.guest_id = reserved.guest_id
        where claim.emp_id = '${data.id}' and state = '${data.state}' and claim.in_time >= reserved.check_in and claim.in_time <= reserved.check_out`
        const result = await db.dbQuery(query)
        if (Object.keys(result).length === 0 || result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.put('/change', async (req, res) => {
    const id = req.query.id
    const data = req.body

    try {
        const check = await db.dbQuery( `select id from claim where id = ${id}`)
        if(check === null) throw 'null data'

        const query = `update claim set state = 'true', out_time = '${data.out_time}', emp_id = '${data.emp_id}' where id = '${id}'`
        const result = await db.dbQuery(query)
        if(result === null || Object.keys(result).length === 0) throw 'query error'

    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.post('/add', async (req, res) => {
    const data = req.body
    
    try {
        const query = `insert into claim (id, type, in_time, guest_id, message, state) values(default, '${data.type}', '${data.in_time}', '${data.guest_id}', '${data.message}', FALSE)`
        const result = await db.dbQuery(query)
        if(Object.keys(result).length === 0 || result === null) throw 'query error'
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})

router.delete('/delete', async (req, res) => {
    const time = req.body.time
    
    try {
        const query = `delete from claim where out_time < '${time}'`
        const result = await db.dbQuery(query)
        if(Object.keys(result).length === 0 || result === null) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})




module.exports = router;