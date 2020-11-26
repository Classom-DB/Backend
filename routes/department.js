import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get/:name', async (req, res) => {
    const { name } = req.params
    try {
        const query = `select budget, phone_number, floor from hotel.department where name = '${name}'`
        const result = await db.dbQuery(query)
        if (result === undefined) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;