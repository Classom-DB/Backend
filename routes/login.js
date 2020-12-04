import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/guest', async (req, res) => {
    const id = req.query.id
    try {
        const sqlStr = `select password from guest where id = '${id}'`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.status(404);
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.get('/employee', async (req, res) => {
    const id = req.query.id
    try {
        const sqlStr = `select password, dept_name from employee where id = '${id}'`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'null data'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.status(404);
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;