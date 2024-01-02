const res = require("express/lib/response");
const { use } = require("../routes/userRoutes");
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient(); 

class User{

    constructor(pid, pemail, pusername, ppassword, pfotoperfil){
        this.idusuario=pid;
        this.email=pemail;
        this.username=pusername;
        this.userpassword=ppassword;
        this.fotoperfil=pfotoperfil
    }

    //ACTIONS
    static async login(pemail, ppassword){
        console.log("Buscando si el usuario existe");
        //Primero verifico si existe el usuario
        var user = await prisma.usuario.findFirst({
            where: {
                email: pemail
            }
        });
        if(user == null){
            console.log("El usuario no existe");
            return 1;
        }

        //Después si la contraseña es correcta
        console.log("Comprabando que la contraseña coincida")
        user = await prisma.usuario.findFirst({
            where: {
                email: pemail,
                userpassword: ppassword
            }
        });
        var userLogged = new User(0,"","","", "");
        userLogged=user;

        console.log(userLogged);
        if(userLogged != null)
            return userLogged;
        else
            return 2;
    }

    static async findAll() {
        var user = await prisma.usuario.findMany();
        var userLogged = new User(0,"","","",  "");
        userLogged=user;

        console.log(userLogged);
        if(userLogged != null)
            return userLogged;
        else
            return 1;
    }
    
    static async findById(id) {
        var user = await prisma.usuario.findFirst({
            where: {
                idusuario: parseInt(id)
            },
        });
        var userLogged = new User(0,"","","", "");
        userLogged=user;

        console.log(userLogged);
        if(userLogged != null)
            return userLogged;
        else
            return 1;
    }
    
    static async create(data) {
        var returnUser = new User(0, data.email, data.username, data.password, "");

        const result =  await  prisma.usuario.create({
            data: {
                username: data.username,
                userpassword: data.password,
                email: data.email
            }
        });
        
        returnUser=result;
        return returnUser;
    }
    
    static async update(id, data) {
        var returnUser = new User(0, data.email, data.username, data.password, "");

        const result =  await  prisma.usuario.update({
            where:{
                idusuario: parseInt(id)
            },
            data: {
                username: data.username,
                userpassword: data.password,
                email: data.email
            }
        });
        
        returnUser=result;
        return returnUser;
    }
    
    static delete(id) {
        // Código para eliminar un usuario específico de una base de datos o un archivo
    }
}

module.exports = User;