import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const data = req.query
    const query = `select room_num, type, price, floor, emp_id from room `
    if(Object.keys(data).length !== 1) query += `and type = '${data.type}'`
    try {
        const result = await db.dbQuery(query)
        if (result === undefined || result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.put('/change/price', async (req, res) => {
    const info = req.query
    const price = req.body.price

    try {
        let query = `select room_num from room where type = '${info.type}'`
        if(Object.keys(data).length !== 1) query += ` and room_num = ${info.room_num}`
        const check = await db.dbQuery(query)
        if (check === undefined || check === null) throw 'null data'

        query = `update room set price = ${price} where type = '${info.type}'`
        if(Object.keys(data).length !== 1) query += ` and room_num = ${info.room_num}`
        const result = await db.dbQuery(query)
        if (result === undefined || check === null) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.put('/change/emp', async (req, res) => {
    const room_num = req.query.room_num
    const emp_id = req.body.emp_id

    try {
        let query = `select room_num from room where room_num = ${room_num}`
        const check = await db.dbQuery(query)
        if (check === undefined || check === null) throw 'null data'

        query = `update room set emp_id = '${emp_id}' where room_num = '${room_num}'`
        const result = await db.dbQuery(query)
        if (result === undefined || check === null) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;