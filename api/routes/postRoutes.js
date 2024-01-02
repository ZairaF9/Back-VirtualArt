const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');
const fs = require('fs');

const path = require('path');
const multer = require('multer');
const { Console } = require('console');
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(fs.existsSync('public/images/post/' + req.body.postID + '.jpg')){
            fs.unlink('public/images/post/' + req.body.postID + '.jpg', function(){});
        }
        else if(fs.existsSync('public/images/post/' + req.body.postID + '.png')){
            fs.unlink('public/images/post/' + req.body.postID + '.png',function(){});
        }
        cb(null, 'public/images/post');
    },
    filename: (req, file, cb) => {
        console.log("Actualizando imagen de la publicacación: " + req.body.postID);
        console.log(file);
        cb(null, req.body.postID + path.extname(file.originalname));
    }
})

const upload = multer({storage: avatarStorage});

//Categorías
router.post('/categories',postCtrl.postCategory);
router.get('/categories', postCtrl.findAllCategories);
router.get('/categories/:id', postCtrl.findCategoriesById);
router.get('/categories/image/:id', (req, res) => {
    console.log("Buscando imagen de la categoría: " + req.params.id);
    if (fs.existsSync('public/images/category/' + req.params.id + '.jpg')) {
        res.status(200).sendFile('public/images/category/' + req.params.id + '.jpg', {root: '.' });
    }
    else{
        res.status(404);
    }
});

//Publicaciones
router.get('/post', postCtrl.findAll);
router.get('/post/last', postCtrl.getLast);
router.get('/post/:id', postCtrl.findById);
router.get('/post/user/:id', postCtrl.getUserPosts);
router.get('/post/category/:id', postCtrl.getCategoryPosts);
router.post('/post', postCtrl.create);

router.put('/post/:id', postCtrl.updatePost);

router.delete('/post/:id', postCtrl.deletePost);
router.delete('/post/comment/:id', postCtrl.deleteCommentPost);
router.delete('/post/saved/:id', postCtrl.deleteSavedPost);


router.post('/post/image', upload.single("image"), (req, res) => {
    res.send("Imagen guardada");
});
router.get('/post/image/:id', (req, res) => {
    console.log("Buscando imagen de la publicacióN: " + req.params.id);
    console.log('public/images/post/' + req.params.id + '.jpg');
    if (fs.existsSync('public/images/post/' + req.params.id + '.jpg')) {
        res.status(200).sendFile('public/images/post/' + req.params.id + '.jpg', {root: '.' });
    }
    else if (fs.existsSync('public/images/post/' + req.params.id + '.png')) {
        res.status(200).sendFile('public/images/post/' + req.params.id + '.png', {root: '.' });
    }
    else{
        res.status(404);
    }
});
router.get('/post/comment/:id', postCtrl.getComments);
router.post('/post/comment', postCtrl.comment);
router.post('/post/saved', postCtrl.savePost);
router.get('/post/saved/:id', postCtrl.getSavedPosts);
router.get('/post/search/:string', postCtrl.makeASearch);

module.exports = router;