const express = require('express');
const router = express.Router();
const posttabCtrl = require('../controllers/posttabController');
const fs = require('fs');

const path = require('path');
const multer = require('multer');
const { Console } = require('console');


router.get('/posttablero', posttabCtrl.findAll);
router.get('/posttablero/last', posttabCtrl.getLast);
router.post('/posttablero/create', posttabCtrl.create);
router.get('/posttablero/:id', posttabCtrl.findById);
router.get('/posttablero/posts/:id', posttabCtrl.findAllPostInTableros);
router.delete('/posttablero/:id',posttabCtrl.deletetablero);
router.delete('/posttablero/publi/:id',posttabCtrl.deleteposttablero);


module.exports = router;