import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const room_num = req.query.room_num

    const query = `select clean from room`
    if(room_num !==  undefined) query += ` where room_num = '${room_num}'`
    
    try {
        const result = await db.dbQuery(query)
        if (result === undefined || result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.put('/change', async (req, res) => {
    const room_num = req.query.room_num
    const clean = req.body.clean

    try {
        let query = `select room_num from room where room_num = '${room_num}'`
        const check = await db.dbQuery(query)
        if (check === undefined || check === null) throw 'null data'

        query = `update room set clean = ${clean} where room_num = '${room_num}'`
        const result = await db.dbQuery(query)
        if (result === undefined || check === null) throw 'query error'
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;