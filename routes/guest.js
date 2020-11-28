import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const id = req.query.id
    let sqlStr = `select first_name, last_name, phone_number, address, email, gender, grade, mileage, year, month, day from guest `
    if (id !== undefined) sqlStr += `where id = '${id}'`
    
    try {
        const result = await db.dbQuery(sqlStr)
        res.json(template.jsonCreate(result))
    } catch(err){
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.post('/add', async (req, res) => {
    const data = req.body;
    try {
        let sqlStr = `select id from guest where id = '${data.id}'`
        const check = await db.dbQuery(sqlStr)
        if (Object.keys(check).length !== 0) throw 'id exists'
        sqlStr = `insert into guest values('${data.id}', '${data.password}', 
            '${data.first_name}', '${data.last_name}', '${data.phone_number}', '${data.address}', '${data.email}', ${data.gender}, '${data.grade}', ${data.mileage}, 
            ${data.year}, ${data.month}, ${data.day})`
        const result = await db.dbQuery(sqlStr)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})
    } catch (error) {
        console.log(error)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;