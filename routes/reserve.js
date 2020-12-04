import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/room/get', async (req, res) => {
    const time = req.query.curtime;
    try {
        let sqlStr = `select reserved.id, guest_id, first_name, last_name, guest_number, room_num, check_in, check_out, status from reserved join guest on reserved.guest_id = guest.id`
        if (time === true) sqlStr += ` where check_in > (select current_timestamp + '-1 days')`
        const result = await db.dbQuery(sqlStr)
        if (result === null || result === undefined) throw 'query error'
        res.json({ "data": result, "code": 200, "timestamp": new Date().getDate() })
    } catch (error) {
        console.log(error)
        res.json({ "data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.put('/room/change', async (req, res) => {
    const data = req.body
    try {
        let sqlStr = `insert into reserved values(DEFAULT, ${data.guest_number}, ${data.room_num}, '${data.check_in}', '${data.check_out}', '${data.guest_id}', ${data.status})`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({ "data": "success", "code": 200, "timestamp": new Date().getDate() })
    } catch (error) {
        console.log(error)
        res.json({ "data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.post('/room/add', async (req, res) => {
    const query = req.query
    try {
        let sqlStr = `update reserved set state = 'true' where id = '${query.id}'`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({ "data": "success", "code": 200, "timestamp": new Date().getDate() })
    } catch (error) {
        console.log(error)
        res.json({ "data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.delete('/room/delete', async (req, res) => {
    const time = req.query.time;
    try {
        let sqlStr = `delete from reserved where check_out < '${time}'`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})
    } catch (error) {
        console.log(error)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.get('/restaurant/get', async (req, res) => {
    const query = req.query
    try {
        let sqlStr = `select rr.id, type, customer_num, rr.year, rr.month, rr.day, time, first_name, last_name, guest_id from restaurantreserved as rr, guest where rr.guest_id = guest.id`
        console.log(sqlStr)
        const result = await db.dbQuery(sqlStr)
        
        if (result === null || result === undefined) throw 'query error'
        res.json({ "data": result, "code": 200, "timestamp": new Date().getDate() })
    } catch (error) {
        console.log(error)
        res.json({ "data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.post('/restaurant/add', async (req, res) => {
    const data = req.body
    try {
        let sqlStr = `insert into restaurantreserved values(DEFAULT, '${data.type}', ${data.customer_num}, ${data.year}, ${data.month}, ${data.day}, ${data.time},'${data.guest_id}')`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({ "data": "success", "code": 200, "timestamp": new Date().getDate() })
    } catch (error) {
        console.log(error)
        res.json({ "data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.delete('/restaurant/delete', async (req, res) => {
    const time = req.query.time;
    try {
        let sqlStr = `delete from restaurantreserved where time < '${time}'`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})
    } catch (error) {
        console.log(error)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.get('/hall/get', async (req, res) => {
    const id = req.query.id
    try {
        let sqlStr = `select id, type, customer_num, year, month, day, time from hallreserved where guest_id = '${id}`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({ "data": result, "code": 200, "timestamp": new Date().getDate() })
    } catch (error) {
        console.log(error)
        res.json({ "data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.post('/hall/add', async (req, res) => {
    const data = req.body
    try {
        let sqlStr = `insert into hallreserved values(DEFAULT, '${data.type}', ${data.number}, ${data.year}, ${data.month}, ${data.day}, ${data.time}, '${data.guest_id}')`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({ "data": "success", "code": 200, "timestamp": new Date().getDate() })
    } catch (error) {
        console.log(error)
        res.json({ "data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

router.delete('/hall/delete', async (req, res) => {
    const time = req.query.time;
    try {
        let sqlStr = `delete from hallreserved where time < '${time}'`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})
    } catch (error) {
        console.log(error)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate() })
    }
})

module.exports = router