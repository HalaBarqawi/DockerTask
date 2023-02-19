const express = require('express');

const router = express.Router();
const {
  addHarvest,
  getHarvest,
  soldharvest,
  deleteHarvest,
  displaySales
} = require('../controllers/harvest');

router.post('/add-harvest',addHarvest)
router.get('/fetch-harvest/:email',getHarvest)
router.get('/fetch-Sales/:email',displaySales)
router.post('/sellHarvest',soldharvest)
router.delete('/deleteHarvest/:id',deleteHarvest)
module.exports = router;