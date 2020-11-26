import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';

let express = require('express');
let router = express.Router();

router.get('/test/', function (req, res, next) {
  const test = template.jsonCreate("hello world")
  res.json(test)
});


router.get('/guest', async (req, res) => {
  const id = req.query.id
  try {
    const query = `select first_name, last_name, phone_number, address, email, gender, grade, mileage, year, month, day from hotel.guest where id = '${id}'`
    const result = await db.dbQuery(query)
    if (result === undefined) throw 'null data'
    res.json(template.jsonCreate(result))
  } catch(err) {
    console.log(err)
    res.json({"code": 404, "timestamp": new Date().getTime() })
  }
})

router.get('/employee/:id', async (req, res) => {
  const { id } = req.params
  try {
    const query = `select first_name, last_name, phone_number, address, email, gender, birth, dept_name, position from hotel.employee where id = '${id}'`
    const result = await db.dbQuery(query)
    if (result === undefined) throw 'null data'
    res.json(template.jsonCreate(result))
  } catch(err) {
    res.json({ "code": 404, "timestamp": new Date().getTime() })
  }
})

module.exports = router;