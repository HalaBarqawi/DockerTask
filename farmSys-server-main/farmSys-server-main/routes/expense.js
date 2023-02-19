const express = require('express');
const router = express.Router();
const {
   getEq,
   getExpense,
   updateEq,
   addExpense,
   getExpenseBar,
   deleteExp,
   addcatExp,
   getcatExp,
   deleteEq,
   EditEq,
   displayEq,
   addEq,
   getCatName,
   displayRev,
   DisplayAllExpense,
   editExpense,
   displayExpenses,
   displaySales
}=require('../controllers/expense')

router.get('/display-expense/:id', getExpense)
router.put('/updateAmount/:Name',updateEq)
router.post('/add-expense',addExpense)
router.get('/geteqName/:email',getEq)
router.get('/getExpense/:email', getExpense)
router.delete('/delete-exp/:id',deleteExp)
router.post('/add-catExp',addcatExp)
router.get('/get-catExp/:email',getcatExp)
router.get('/display-equipment/:email',displayEq)
router.post('/add-equipment',addEq)
router.delete('/delete-Eq/:id',deleteEq)
router.put('/Edit-eq/:id',EditEq)
router.get('/catNames/:email', getCatName)
router.get('/data/:email',displayRev)
router.get('/display-exp-cat/:email',DisplayAllExpense)
router.put('/edit-expense/:id',editExpense)
router.get('/display-expenses-cat/:email',displayExpenses)
router.get('/display-sales-cat/:email',displaySales)
module.exports = router;