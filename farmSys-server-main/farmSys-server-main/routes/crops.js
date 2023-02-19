const express = require('express');

const router = express.Router();
const {
    addCrops,
    displayCrops,
    fetchDetails,
    getCropsList,
    getCrop,
    editCrop,
    deleteCrop,
    getCropName,
    displayCropsAmount
}=require('../controllers/crops');

router.post('/addCrops' ,addCrops);
router.get('/display-crops/:email',displayCrops)
router.get('/fetch-details/:field',fetchDetails)
router.get('/get-crops/:email',getCropsList)
//router.get('/fetch-crop/:field',getCrop)
router.put('/updatecrop/:id',editCrop)
router.delete('/delete-crop/:id',deleteCrop)
router.get('/getName/:field/:email',getCropName)
router.get('/get-bar/:email',displayCropsAmount)
module.exports = router;