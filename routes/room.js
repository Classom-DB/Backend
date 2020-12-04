import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();


router.get('/get/perroom', async (req, res) => {
    const data = req.query
    const query = `select guest.first_name, guest.last_name, employee.first_name, employee.last_name, guest.gender, 
    grade, mileage, year, month, day, guest.phone_number, guest.email, guest.address 
    from guest
    join reserved on guest.id = reserved.guest_id
    join room on reserved.room_num = room.number
    join employee on employee.id = room.emp_id
    where reserved.guest_id = guest.id and reserved.room_num = room.number and room_num = ${data.room}`

    try {
        const result = await db.dbQuery(query)
        if (Object.keys(result) === 0) throw 'null data'
        if (result === null) throw 'query error'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.get('/get/peremp', async (req, res) => {
    const query = `select id, first_name, last_name, number from employee, room where employee.id = room.emp_id`

    try {
        const result = await db.dbQuery(query)
        if (Object.keys(result) === 0) throw 'null data'
        if (result === null) throw 'query error'
        res.json(template.jsonCreate(result))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.put('/change/price', async (req, res) => {
    const info = req.query
    const price = req.body.price

    try {
        let query = `select room_num from room where type = '${info.type}'`
        if(Object.keys(data).length !== 1) query += ` and room_num = ${info.room_num}`
        const check = await db.dbQuery(query)
        if (check === undefined || check === null) throw 'null data'

        query = `update room set price = ${price} where type = '${info.type}'`
        if(Object.keys(data).length !== 1) query += ` and room_num = ${info.room_num}`
        const result = await db.dbQuery(query)
        if (result === undefined || check === null) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.put('/change/emp', async (req, res) => {
    const room_num = req.query.room_num
    const emp_id = req.body.emp_id

    try {
        let query = `select room_num from room where room_num = ${room_num}`
        const check = await db.dbQuery(query)
        if (check === undefined || check === null) throw 'null data'

        query = `update room set emp_id = '${emp_id}' where room_num = '${room_num}'`
        const result = await db.dbQuery(query)
        if (result === undefined || check === null) throw 'query error'
    } catch(err) {
        console.log(err)
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

module.exports = router;