const express = require('express');

const router = express.Router();

const {
   getSales,
   
}=require('../controllers/sales');

router.get('/get-sales/:email' ,getSales);
module.exports = router;