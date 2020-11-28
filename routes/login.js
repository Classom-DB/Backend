import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/guest', async (req, res) => {
    const id = req.query.id
    try {
        const query = `select password from hotel.guest where id = '${id}'`
        const result = await db.dbQuery(query)
        if (result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.get('/employee', async (req, res) => {
    const id = req.query.id
    try {
        const query = `select password, dept_name from hotel.employee where id = '${id}'`
        const result = await db.dbQuery(query)
        if (result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;