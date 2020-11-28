import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/guest/get/:floor', async (req, res) => {
    const { floor } = req.params
    console.log(floor)
    try {
        const query = `select id, section, emp_id, guest_id from hotel.parking where floor = ${floor}`
        const result = await db.dbQuery(query)

        if (result === null) {
            res.json({"data" : "none", "code" : 200, "timestamp" : new Date().getDate()})
        }
        else res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.get('/employee/get/:emp_id', async (req, res) => {
    const { emp_id } = req.params
    console.log(emp_id)
    try {
        const query = `select id, section, guest_id, floor from hotel.parking where emp_id = '${emp_id}'`
        const result = await db.dbQuery(query)
        if (result === undefined) {
            res.json({"data" : "none", "code" : 200, "timestamp" : new Date().getDate()})
        }
        else res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.post('/add', async (req, res) => {
    const data = req.body

    try {
        const query = `insert into hotel.parking values(default, '${data.section}', ${data.floor}, '${data.emp_id}', '${data.guest_id}')`
        const result = await db.dbQuery(query)
        if(result === undefined) throw 'query error'
        res.json({"data" : "succuess", "code" : 200, "timestamp" : new Date().getDate()})
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})

router.delete('/delete', async (req, res) => {
    const id = req.body.id
    console.log(id)
    try {
        const query = `delete from hotel.parking where id = ${id}`
        const result = await db.dbQuery(query)
        if (result === undefined) throw 'query error'
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})


module.exports = router;