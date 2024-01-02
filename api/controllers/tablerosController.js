const Tableros = require('../models/tableros');
const { use } = require('../routes/tablerosRoutes');

exports.findAll = async (req, res) => {
    const tablerosOBJ = await Tableros.findAll();
    if(tablerosOBJ == 1)
      res.status(500).json({response: "Hubo un prblema al buscar los tableros"});
    else
      res.status(200).json(tablerosOBJ);
  };

  exports.findById = async (req, res) => {
    const id = req.params.id;
    console.log("Voy a buscar el tablero: "+ id);
    const tableroOBJ = await Tableros.findById(id);
    if(tableroOBJ == 1)
      res.status(500).json({response: "El usuario que inició sesión no pudo ser encontrado"});
    else
      res.status(200).json(tableroOBJ);
  };

  exports.getLast = async (req, res) => {
    const tableroOBJ = await Tableros.getLast();
    console.log(tableroOBJ);
    if(tableroOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al buscar el ultimo tablero"});
    else
      res.status(200).json(tableroOBJ);
  };

  exports.getUserTableros = async (req, res) =>{
    const id = req.params.id;
    const tableroOBJ = await Tableros.getUserTableros(id);
    console.log(tableroOBJ);
    if(tableroOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al buscar los tableros del usuario"});
    else
      res.status(200).json(tableroOBJ);
  };

  exports.create = async (req, res) => {
    const data = req.body;
    const tableroOBJ = await Tableros.create(data);
    console.log(tableroOBJ);
    if(tableroOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al crear el tablero"});
    else
      res.status(200).json(tableroOBJ);
  };

  exports.update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const tableroOBJ = await Tableros.update(id, data);
    res.json(tableroOBJ);
  };

  exports.deletetab = async(req,res)=>{
    const id = req.params.id;
    const tableroOBJ = await Tableros.deletetab(id);
    console.log(tableroOBJ);
    if(tableroOBJ == null)
      res.status(500).json({error: "Ocurrió un problema al eliminar el tablero del usuario"});
    else
      res.status(200).json(tableroOBJ);
  }

