const express = require('express');

const router = express.Router();
const {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
  addWorker,
  getAdmin,
  getWorker,
  getWorkers,
  getCount,
  EditWorker,
  deleteWorker
} = require('../controllers/user');
const{
  addField,
  getLocation,
  getField,
  getCropField,
  getFieldnotPlanting,
  updateFieldCrop,
  updateFieldHarvest
}=require('../controllers/field')
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require('../middlewares/validation/user');

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.post(
  '/upload-profile/:email',
  uploads.single('profile'),
  uploadProfile,
  
);
router.post('/add-worker',addWorker)
router.post('/add-field',addField)
router.get('/get-admin/:email',getAdmin)
router.get('/get-location/:adminEmail',getLocation)
router.get('/get-worker/:email',getWorker)
router.get('/get-workers/:email',getWorkers)
router.get('/get-field/:email',getField)
router.get('/get-count/:email',getCount)
router.put('/update-Worker/:id',EditWorker)
router.delete('/delete-Worker/:id',deleteWorker)
router.get('/get-fieldCrop/:email',getCropField)
router.get('/getfield/:email',getFieldnotPlanting)
router.put('/updateFieldCrop/:field/:email',updateFieldCrop)
router.put('/updateFieldHarvest/:field/:email',updateFieldHarvest)

module.exports = router;
