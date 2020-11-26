import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/get', async (req, res) => {
    const id = req.query.id
    let query = `select first_name, last_name, phone_number, address, email, gender, grade, mileage, year, month, day from hotel.guest `
    if (id !== undefined) query += `where id = '${id}'`
    
    try {
        const result = await db.dbQuery(query)
        res.json(template.jsonCreate(result))
    } catch(err){
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.post('/add', async (req, res) => {
    const data = req.body;
    try {
        console.log(data.id)
        let query = `select id from hotel.guest where id = '${data.id}'`
        const check = await db.dbQuery(query)
        if (check.length !== 0) throw 'id exists'
        query = `insert into hotel.guest values('${data.id}', '${data.password}', 
            '${data.first_name}', '${data.last_name}', '${data.phone_number}', '${data.address}', '${data.email}', ${data.gender}, '${data.grade}', ${data.mileage}, 
            ${data.year}, ${data.month}, ${data.day})`
        const result = await db.dbQuery(query)
        if (result === null) throw 'query error'
        res.json({"data": "success", "code": 200, "timestamp": new Date().getDate()})
    } catch (error) {
        console.log(error)
        res.json({"data": error, "code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;