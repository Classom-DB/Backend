import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const id = req.query.reserved_id
    const handler = req.body.price_handler

    const query = `select price from room, reserved where floor = ${data.floor}`

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