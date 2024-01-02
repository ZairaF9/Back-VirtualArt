const User = require('../models/user');
const { use } = require('../routes/userRoutes');

//Nota: Cambiar los nombres de las variables después para mejor contexto (userOBJ)

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const response = await User.login(email, password);
    if (response == 1)
      res.status(404).json({response: "El usuario no existe"}); 
    else if (response == 2)
      res.status(401).json({response: "Credenciales incorrectas"}); 
    else
    res.status(200).json(response);
};

exports.findAll = async (req, res) => {
  const userOBJ = await User.findAll();
  if(userOBJ == 1)
    res.status(500).json({response: "Hubo un prblema al buscar los usuarios"});
  else
    res.status(200).json(userOBJ);
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  console.log("Voy a buscar al usuario: "+ id);
  const userOBJ = await User.findById(id);
  if(userOBJ == 1)
    res.status(500).json({response: "El usuario que inició sesió no pudo ser encontrado"});
  else
    res.status(200).json(userOBJ);
};

exports.create = async (req, res) => {
  const data = req.body;
  const userOBJ = await User.create(data);
  console.log(userOBJ);
  if(userOBJ == null)
    res.status(500).json({error: "Ocurrió un problema al crear el usuario"});
  else
    res.status(200).json(userOBJ);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const userOBJ = await User.update(id, data);
  res.json(userOBJ);
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.delete(id);
  res.json({ message: 'Usuario eliminado con éxito' });
};
