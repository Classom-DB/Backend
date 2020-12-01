import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const data = req.query
    let query = `select id, amount from income`
    try {
        if (Object.keys(data).length !== 0) {
            query += ` where `
            var num = 0
            for (let keys in data) {
                if(++num !== 1) query += `and `
                if(keys === 'year' || keys === 'day' || keys === 'month')query += `${keys} = ${data[keys]} `
                else query += `${keys} = '${data[keys]}' `
            }
        }
    
        const result = await db.dbQuery(query)
        res.json(template.jsonCreate(result))

    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.post('/add', async (req, res) => {
    const data = req.body
    
    try {
        const check = `select year, month, day, type, guest_id from income where year = ${data.year} and month = ${data.month} and day = ${data.day} and type = ${data.type} and guest_id = ${data.guest_id}`
        const check_result = await db.dbQuery(check)
        console.log(check_result)
        if(check_result !== undefined && check_result !== null) throw 'alreay exists'

        const query = `insert into income values(default, ${data.amount}, '${data.type}', ${data.year}, ${data.month}, ${data.day}, '${data.guest_id}')`
        const result = await db.dbQuery(query)
        if(result === undefined || result === null) throw 'query error'
        res.json({"data" : "succuess", "code" : 200, "timestamp" : new Date().getDate()})
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate(), "error" : err})
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