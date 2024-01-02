const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const fs = require('fs');

const path = require('path');
const multer = require('multer');
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(fs.existsSync('public/images/avatar/usuario' + req.body.userID + '.jpg')){
            fs.unlink('public/images/avatar/usuario' + req.body.userID + '.jpg', function(){});
        }
        else if(fs.existsSync('public/images/avatar/usuario' + req.body.userID + '.png')){
            fs.unlink('public/images/avatar/usuario' + req.body.userID + '.png',function(){});
        }
        cb(null, 'public/images/avatar');
    },
    filename: (req, file, cb) => {
        console.log("Actualizando avatar del usuario: " + req.body.userID);
        console.log(file);
        cb(null, "usuario"+ req.body.userID + path.extname(file.originalname));
    }
})

const upload = multer({storage: avatarStorage});

router.post('/users/login', userCtrl.login);
router.get('/users', userCtrl.findAll);
router.get('/users/:id', userCtrl.findById);
router.post('/users/create', userCtrl.create);
router.put('/users/:id', userCtrl.update);
router.delete('/users/:id', userCtrl.delete);
router.post('/users/avatar', upload.single("avatar"), (req, res) => {
    res.send("Imagen guardada");
});
router.get('/users/avatar/:id', (req, res) => {
    console.log("Buscando avatar" + req.params.id);
    if (fs.existsSync('public/images/avatar/usuario' + req.params.id + '.jpg')) {
        res.status(200).sendFile('public/images/avatar/usuario' + req.params.id + '.jpg', {root: '.' });
    }
    else if (fs.existsSync('public/images/avatar/usuario' + req.params.id + '.png')) {
        res.status(200).sendFile('public/images/avatar/usuario' + req.params.id + '.png', {root: '.' });
    }
    else{
        res.status(404);
    }
});

module.exports = router;
