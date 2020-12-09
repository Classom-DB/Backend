import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const query = req.query
    const sqlStr = `select price from room where number = ${query.num}`

    try {
        const result = await db.dbQuery(sqlStr)
        if (result === undefined || result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;