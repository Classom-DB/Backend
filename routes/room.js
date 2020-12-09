import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();


router.get('/get/emptyroom', async (req, res) => {
    const query = req.query
    const sqlStr = `select number, price from room where type = '${query.type}' except select number, price from room inner join reserved as rv on room.number = rv.room_num where room.type = '${query.type}'`
    try {
        const result = await db.dbQuery(query)
        if (Object.keys(result) === 0) throw 'null data'
        res.json(template.jsonCreate(result[0]))
    } catch(err) {
        res.json({"code": 404, "timestamp": new Date().getDate()})
    }
})

router.get('/get/perroom', async (req, res) => {
    const data = req.query
    const query = `select guest.first_name as guest_first_name, guest.last_name as guest_last_name, employee.first_name as emp_first_name, employee.last_name as emp_last_name, 
    guest.gender, 
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
    const query = `select distinct id, first_name, last_name from employee, room where employee.id = room.emp_id`

    try {
        const result = await db.dbQuery(query)

        for(var idx in result){
            const subquery = `select number from room where emp_id = '${result[idx].id}'`;
            const subresult = await db.dbQuery(subquery);

            let tmp = [];
            for(var i in subresult){
                tmp.push(subresult[i].number + "호");
            }
            result[idx].number = tmp;
        }

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