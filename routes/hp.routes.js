const express = require('express');
const router = express.Router(); //to initialize the router property of express
const {getAllData, createData, recordData, getSpecificData, deleteData} = require('../controllers/hp.controllers');

router.get('/all/data', getAllData);

router.post('/new/data', createData);

router.post('/pureblood', recordData)

router.get('/specific/:id', getSpecificData);

router.delete('/delete/:id', deleteData);

module.exports = router;
