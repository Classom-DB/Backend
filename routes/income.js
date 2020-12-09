import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {

    let query = `select type, sum(amount) as sum from income group by type`
    try {
        const result = await db.dbQuery(query)

        if(Object.keys(result).length === 0) throw 'null data'
        if(result === null) throw 'query error'
        res.json(template.jsonCreate(result))

    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.post('/add', async (req, res) => {
    const data = req.body
    try {
        const query = `insert into income values(default, ${data.amount}, '${data.type}', ${data.year}, ${data.month}, ${data.day}, '${data.guest_id}')`
        const result = await db.dbQuery(query)
        if(result === null) throw 'query error'
        res.json({"data" : "succuess", "code" : 200, "timestamp" : new Date().getDate()})
    } catch(err) {
        res.json({"code": 404, "error" : err, "timestamp": new Date().getDate()})
    }
})

router.put('/change', async (req, res) => {
    const id = req.query.id
    const data = req.body
    try {
        let query = `select id from income where id = ${id}`
        const check = await db.dbQuery(query)
        if (check === null) throw 'null data'

        query = `update income set type = '${data.type}', year = ${data.year}, month = ${data.month}, day = ${data.day}, amount = ${data.amount} where id = ${id}`
        const result = await db.dbQuery(query)
        if (result === undefined) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
    }
})


module.exports = router;