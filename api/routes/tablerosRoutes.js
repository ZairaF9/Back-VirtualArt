const express = require('express');
const router = express.Router();
const tabCtrl = require('../controllers/tablerosController');
const fs = require('fs');

const path = require('path');
const multer = require('multer');
const { Console } = require('console');

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(fs.existsSync('public/images/tableros/' + req.body.tableroID + '.jpg')){
            fs.unlink('public/images/tableros/' + req.body.tableroID + '.jpg', function(){});
        }
        else if(fs.existsSync('public/images/tableros/' + req.body.tableroID + '.png')){
            fs.unlink('public/images/tableros/' + req.body.tableroID + '.png',function(){});
        }
        cb(null, 'public/images/tableros');
    },
    filename: (req, file, cb) => {
        console.log("Actualizando imagen del tablero: " + req.body.tableroID);
        console.log(file);
        cb(null, req.body.tableroID + path.extname(file.originalname));
    }
})

const upload = multer({storage: avatarStorage});

router.get('/tableros', tabCtrl.findAll);
router.get('/tableros/last', tabCtrl.getLast);
router.post('/tableros', tabCtrl.create);
router.get('/tableros/:id', tabCtrl.findById);
router.get('/tableros/user/:id', tabCtrl.getUserTableros);
router.put('/tableros/:id', tabCtrl.update);
router.delete('/tableros/:id',tabCtrl.deletetab);


router.post('/tableros/imgtablero', upload.single("imgtablero"), (req, res) => {
    res.send("Imagen guardada");
});
router.get('/tableros/imgtablero/:id', (req, res) => {
    console.log("Buscando imagen del tablero: " + req.params.id);
    console.log('public/images/tableros/' + req.params.id + '.jpg');
    if (fs.existsSync('public/images/tableros/' + req.params.id + '.jpg')) {
        res.status(200).sendFile('public/images/tableros/' + req.params.id + '.jpg', {root: '.' });
    }
    else if (fs.existsSync('public/images/tableros/' + req.params.id + '.png')) {
        res.status(200).sendFile('public/images/tableros/' + req.params.id + '.png', {root: '.' });
    }
    else{
        res.status(404);
    }
});

module.exports = router;