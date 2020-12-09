import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const data = req.query
    try {
        const query = `select roomservice.id, room_num menu, state, roomservice.guest_id, room_num, in_time, out_time 
        from roomservice join reserved on roomservice.guest_id = reserved.guest_id
        where roomservice.emp_id = '${data.id}' and state = '${data.state}' and roomservice.in_time >= reserved.check_in and roomservice.in_time <= reserved.check_out`

        const result = await db.dbQuery(query)
        if (Object.keys(result).length === 0 || result == null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "error": err, "timestamp": new Date().getDate()})
    }
})

router.put('/change', async (req, res) => {
    const id = req.query.id
    const data = req.body

    try {
        const check = db.dbQuery( `select id from roomservice where id = ${id}`)
        if(check === null) throw 'null data'

        const query = `update roomservice set state = 'true', out_time = '${data.out_time}', emp_id = '${data.emp_id}' where id = '${id}'`
        const result = db.dbQuery(query)
        if(result === null || result == undefined) throw 'query error'

    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.post('/add', async (req, res) => {
    const data = req.body
    
    try {
        const query = `insert into roomservice (id, menu, in_time, guest_id, state) values(default, '${data.menu}', '${data.in_time}', '${data.guest_id}', FALSE)`
        const result = await db.dbQuery(query)
        console.log(result)
        if(result === undefined || result === null) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})

router.delete('/delete', async (req, res) => {
    const time = req.body.time
    
    try {
        const query = `delete from roomservice where out_time < '${time}'`
        const result = await db.dbQuery(query)
        if(result === undefined || result === null) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})


module.exports = router;