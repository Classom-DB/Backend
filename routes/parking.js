import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

<<<<<<< HEAD
router.get('/guest/get', async (req, res) => {
    const query = req.params
=======
router.get('/pad/get/:id', async (req, res) => {
    const { id } = req.params
    try {
        const query = `select section, floor from parking where guest_id = '${id}'`
        const result = await db.dbQuery(query)
        if (result === undefined || result === null) throw 'null null'
        res.json(template.jsonCreate(result))
    } catch (err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})


router.get('/guest/get/:floor', async (req, res) => {
    const { floor } = req.params
>>>>>>> 325337d7d34e87b316763242f0a5cb3140f38cbd
    console.log(floor)
    try {
        const sqlStr = `select count(id) from parking where floor = ${query.floor} and section = '${query.section}'`
        const result = await db.dbQuery(sqlStr)

        if (result === undefined || result === null) throw 'null data'
       res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.get('/employee/get/:emp_id', async (req, res) => {
    const { emp_id } = req.params
    console.log(emp_id)
    try {
        const query = `select id, section, guest_id, floor from parking where emp_id = '${emp_id}'`
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
        const query = `insert into parking values(default, '${data.section}', ${data.floor}, '${data.emp_id}', '${data.guest_id}')`
        const result = await db.dbQuery(query)
        if(result === undefined || result === null) throw 'query error'
        res.json({"data" : "succuess", "code" : 200, "timestamp" : new Date().getDate()})
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})

router.delete('/delete', async (req, res) => {
    const id = req.query.id
    console.log(id)
    try {
        const query = `delete from parking where id = ${id}`
        const result = await db.dbQuery(query)
        if (result === undefined) throw 'query error'
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})


module.exports = router;