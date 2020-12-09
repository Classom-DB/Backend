import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const num = req.query.room_num
    const body = req.body

    const query = `select price * guest_number * ${body.handler}, check_in from room, reserved where room.number = reserved.room_num and room.number = ${num}`

    try {
        const result = await db.dbQuery(query)
        if (result === undefined || result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;