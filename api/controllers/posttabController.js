const PostTab = require('../models/postTab');
const { use } = require('../routes/posttabRoutes');

exports.findAll = async (req, res) => {
    const postabOBJ = await PostTab.findAll();
    if(postabOBJ == 1)
      res.status(500).json({response: "Hubo un prblema al buscar las publicaciones del tablero"});
    else
      res.status(200).json(postabOBJ);
  };

  exports.findById = async (req, res) => {
    const id = req.params.id;
    console.log("Voy a buscar la publicacion del tablero tal: "+ id);
    const postabOBJ = await PostTab.findById(id);
    if(postabOBJ == 1)
      res.status(500).json({response: "El usuario que inició sesión no pudo ser encontrado"});
    else
      res.status(200).json(postabOBJ);
  };

  exports.getLast = async (req, res) => {
    const postabOBJ = await PostTab.getLast();
    console.log(postabOBJ);
    if(postabOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al buscar el ultimo tablero con la publicacion"});
    else
      res.status(200).json(postabOBJ);
  };

  exports.create = async (req, res) => {
    const data = req.body;
    const postabOBJ = await PostTab.create(data);
    console.log(postabOBJ);
    if(postabOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al guardar la publicacion al tablero"});
    else
      res.status(200).json(postabOBJ);
  };


  exports.findAllPostInTableros = async (req, res) => {
    const id = req.params.id;
    const postabOBJ = await PostTab.findAllPostInTableros(id);
    if(postabOBJ == 1)
      res.status(500).json({response: "Hubo un prblema al buscar las publicaciones del tablero"});
    else
      res.status(200).json(postabOBJ);
  };

  exports.deletetablero = async(req,res)=>{
    const id = req.params.id;
    const postabOBJ = await PostTab.deletetablero(id);
    if(postabOBJ == 1)
      res.status(500).json({response: "No se elimino correctamente el tablero en la relacion"});
    else
      res.status(200).json(postabOBJ);
  }

  exports.deleteposttablero = async(req,res)=>{
    const id = req.params.id;
    const postabOBJ = await PostTab.deleteposttablero(id);
    if(postabOBJ == 1)
      res.status(500).json({response: "No se elimino correctamente la publicacion en el tablero"});
    else
      res.status(200).json(postabOBJ);
  }
