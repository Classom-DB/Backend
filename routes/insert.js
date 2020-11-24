import * as db from '../public/javascripts/db';
import * as template from '../public/javascripts/template';
let express = require('express');
let router = express.Router();

router.post('/guest', async (req, res) => {
    console.log(req.body)
    res.send("post")
})

router.post('/employee', async (req, res) => {
    
})

module.exports = router;