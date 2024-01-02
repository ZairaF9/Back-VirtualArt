const Post = require('../models/post');
const { use } = require('../routes/postRoutes');

exports.findAllCategories = async (req, res) => {
    const categoiesOBJ = await Post.findAllCategories();
    if(categoiesOBJ == 1)
      res.status(500).json({response: "Hubo un prblema al buscar las categorías"});
    else
      res.status(200).json(categoiesOBJ);
  };

  exports.findCategoriesById = async (req, res) => {
    const id = req.params.id;
    const categoiesOBJ = await Post.findCategoryById(id);
    if(categoiesOBJ == 1)
      res.status(500).json({response: "Hubo un prblema al buscar las categorías"});
    else
      res.status(200).json(categoiesOBJ);
  };

  exports.findAll = async (req, res) => {
    const categoiesOBJ = await Post.findAll();
    if(categoiesOBJ == 1)
      res.status(500).json({response: "Hubo un prblema al buscar las publicaciones"});
    else
      res.status(200).json(categoiesOBJ);
  };

  exports.findById = async (req, res) => {
    const id = req.params.id;
    console.log("Voy a buscar la publicación: "+ id);
    const postOBJ = await Post.findById(id);
    if(postOBJ == 1)
      res.status(500).json({response: "El usuario que inició sesió no pudo ser encontrado"});
    else
      res.status(200).json(postOBJ);
  };

  exports.getLast = async (req, res) => {
    const postOBJ = await Post.getLast();
    console.log(postOBJ);
    if(postOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al buscar la última publicación"});
    else
      res.status(200).json(postOBJ);
  };

  exports.getUserPosts = async (req, res) =>{
    const id = req.params.id;
    const postOBJ = await Post.getUserPosts(id);
    console.log(postOBJ);
    if(postOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al buscar las publicaciones del usuario"});
    else
      res.status(200).json(postOBJ);
  };

  exports.getCategoryPosts = async (req, res) =>{
    const id = req.params.id;
    const postOBJ = await Post.getCategoryPosts(id);
    console.log(postOBJ);
    if(postOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al buscar las publicaciones de la categoría"});
    else
      res.status(200).json(postOBJ);
  };

  exports.postCategory = async (req,res) => {
         const data = req.body;
         const categoryOBJ = await Post.postCategory(data);
         console.log(categoryOBJ);
         if(categoryOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al crear la categoria"});
    else
      res.status(200).json(categoryOBJ);
  };

  exports.create = async (req, res) => {
    const data = req.body;
    const postOBJ = await Post.create(data);
    console.log(postOBJ);
    if(postOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al crear la publicación"});
    else
      res.status(200).json(postOBJ);
  };

  exports.savePost = async (req, res) => {
    const data = req.body;
    //Verificar si el post ya está guardado por este usuario
    const response = await Post.verifyIfPostIsSaved(data);
    if(response == null){
      const postOBJ = await Post.savePost(data);
      console.log(postOBJ);
      if(postOBJ == null)
        res.status(500).json({error: "Ocurrió un problema al guardar la publicación"});
      else
        res.status(200).json(postOBJ);
    }
    else
      res.status(200).json({error: "El usuario ya guardó esta publicacioón"});
  };

  exports.getSavedPosts = async (req, res) => {
    const id = req.params.id;
    //console.log("Voy a buscar la publicación: "+ id);
    const commentOBJ = await Post.getSavedPosts(id);
    if(commentOBJ == 1)
      res.status(500).json({response: "No se encontraron publicaciones guardadas"});
    else
      res.status(200).json(commentOBJ);
  };

  exports.comment = async (req, res) => {
    const data = req.body;
    const commentOBJ = await Post.comment(data);
    console.log(commentOBJ);
    if(commentOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al crear el comentario"});
    else
      res.status(200).json(commentOBJ);
  };

  exports.getComments = async (req, res) => {
    const id = req.params.id;
    console.log("Voy a buscar la publicación: "+ id);
    const commentOBJ = await Post.getComments(id);
    if(commentOBJ == 1)
      res.status(500).json({response: "No se encontrron comentarios"});
    else
      res.status(200).json(commentOBJ);
  };

  exports.makeASearch = async (req, res) =>{
    const string = req.params.string;
    const postOBJ = await Post.makeASearch(string);
    console.log(postOBJ);
    if(postOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al buscar las publicaciones"});
    else
      res.status(200).json(postOBJ);
  };

  exports.deletePost = async (req,res) => {
    const id = req.params.id;
    const postOBJ = await Post.deletePost(id);
    console.log(postOBJ);
    if(postOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al eliminar la publicacion del usuario"});
    else
      res.status(200).json(postOBJ);
  };

  exports.deleteCommentPost = async (req,res) => {
    const id = req.params.id;
    const postOBJ = await Post.deleteCommentPost(id);
    console.log(postOBJ);
    if(postOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al eliminar la publicacion en la tabla comentarios"});
    else
      res.status(200).json(postOBJ);
  };

  exports.deleteSavedPost = async (req,res) => {
    const id = req.params.id;
    const postOBJ = await Post.deleteSavedPost(id);
    console.log(postOBJ);
    if(postOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al eliminar la publicacion en la tabla de guardados"});
    else
      res.status(200).json(postOBJ);
  };

  exports.updatePost = async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    const PostOBJ = await Post.updatePost(id, data);
    res.json(PostOBJ);

  };