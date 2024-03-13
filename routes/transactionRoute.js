const express = require('express');
const  {addTransaction, getAllTransaction, editTransaction, deleteTransaction} = require( '../controllers/transactionController');

// Router Object
const router = express.Router();

//Routes

// Create Transaction
router.post('/addTransaction', addTransaction)

//Get Transaction
router.post('/getTransactions', getAllTransaction);

// Edit transaction
router.patch('/editTransaction', editTransaction)

// Delete Transaction
router.delete('/deleteTransaction', deleteTransaction)

module.exports = router;