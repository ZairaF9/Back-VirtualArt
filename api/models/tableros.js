const res = require("express/lib/response");
const { use } = require("../routes/userRoutes");
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient(); 

class Tableros{

    constructor(pid, ptitulo, pprivacidad, pusuario, pimagen){
       this.idtablero = pid;
       this.nombre = ptitulo;
       this.privacidad = pprivacidad;
       this.idusuario = pusuario;
       this.imagen = pimagen;
    }


    static async findAll() {
        var result = await  prisma.tablero.findMany({
            orderBy: {
                idtablero: 'desc',
            },
        });
        var tableros = result;
        //console.log(categories);
        if(tableros != null)
            return tableros;
        else
            return 1;
    }
    
    static async findById(id) {
        var tableros = await prisma.tablero.findFirst({
            where: {
                idtablero: parseInt(id)
            },
        });
        var tableroLoaded = new Tableros(0,"","","","");
        tableroLoaded=tableros;

        console.log(tableroLoaded);
        if(tableroLoaded != null)
            return tableroLoaded;
        else
            return 1;
    }
    
    static async getLast(){
        //Busco el id del post más reciente
        var result = await  prisma.tablero.findMany({
            select: {
                idtablero: true
            },
            orderBy: {
                idtablero: 'desc',
            },
            take: 1,
        });

        const id = result;
        console.log(id);
        return id;  
    }

    static async getUserTableros(id){
        //Busco el id del post más reciente
        var result = await  prisma.tablero.findMany({
            where:{
                idusuario: parseInt(id)
            }
        });

        console.log(result);
        return result;  
    }

    static async create(data) {
        var returnTabC = new Tableros(0, data.title, data.privacity, data.user,"");

        const result =  await prisma.tablero.create({
            data: {
                nombre: data.title,
                privacidad: parseInt(data.privacity),
                idusuario: parseInt(data.user)
            }
        });
        
        returnTabC=result;
        return returnTabC;
    }
    
    static async update(id, data) {
        var returnTabC = new Tableros(0, data.title, data.privacity, data.user,"");

        const result =  await prisma.tablero.update({
            where:{
               idtablero: parseInt(id),
            },
            data: {
                nombre: data.title,
                privacidad: parseInt(data.privacity),
                idusuario: parseInt(data.user)
            }
        });
        
        returnTabC=result;
        return returnTabC;
    }

    static async deletetab(id){
        const result =  await prisma.tablero.delete({
            where:{
               idtablero: parseInt(id),
            },
        });

        console.log(result);
        return result;
    }
    
}

module.exports = Tableros;