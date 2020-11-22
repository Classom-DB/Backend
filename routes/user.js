import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';
let express = require('express');
let router = express.Router();

router.get('/test/', function (req, res, next) {
  const test = template.jsonCreate("hello world")
  res.json(test)
});


router.get('/guest/:id', async (req, res) => {
  const { id } = req.params

  let query = `select first_name, last_name, phone_number, address, email, gender, grade, mileage, year, month, day from hotel.guest where id = '${id}'`
  const result = await db.dbQuery(query)
  res.json(template.jsonCreate(result))
})

router.get('/employee/:id', async (req, res) => {

})

module.exports = router;