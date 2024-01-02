const res = require("express/lib/response");
const { use } = require("../routes/userRoutes");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class PostTab {

    constructor(pid, ppublicaciones, ptablero) {
        this.idpublicacionestablero = pid;
        this.idtablero = ppublicaciones;
        this.idpublicacion = ptablero;
    }


    static async findAll() {
        var result = await prisma.publicacionestablero.findMany({
            orderBy: {
                idpublicacionestablero: 'desc',
            },
        });
        var posttab = result;
        //console.log(categories);
        if (posttab != null)
            return posttab;
        else
            return 1;
    }

    static async findById(id) {
        var posttabs = await prisma.publicacionestablero.findFirst({
            where: {
                idpublicacionestablero: parseInt(id)
            },
        });
        var posttabLoaded = new PostTab(0, "", "");
        posttabLoaded = posttabs;

        console.log(posttabLoaded);
        if (posttabLoaded != null)
            return posttabLoaded;
        else
            return 1;
    }


    static async findByIdTablero(id) {
        var posttabs = await prisma.publicacionestablero.findFirst({
            select: {
                idpublicacion: true,
            },
            where: {
                idtablero: parseInt(id)
            },
        });
        var posttabLoaded = new PostTab(0, "", "");
        posttabLoaded = posttabs;

        console.log(posttabLoaded);
        if (posttabLoaded != null)
            return posttabLoaded.idpublicacion;
        else
            return 1;
    }

    static async getLast() {
        //Busco el id del post más reciente
        var result = await prisma.publicacionestablero.findMany({
            select: {
                idpublicacionestablero: true
            },
            orderBy: {
                idpublicacionestablero: 'desc',
            },
            take: 1,
        });

        const id = result;
        console.log(id);
        return id;
    }

    static async create(data) {
        var returnPTC = new PostTab(0, data.idtablero, data.idpublicacion);

        const result = await prisma.publicacionestablero.create({
            data: {
                idtablero: parseInt(data.idtablero),
                idpublicacion: parseInt(data.idpublicacion)
            }
        });

        returnPTC = result;
        return returnPTC;
    }

    static async findAllPostInTableros(id) {

        var result = await prisma.publicacionestablero.findMany({
            where: {
                idtablero: parseInt(id),
            },
            include: {
                publicaciones: true,
            }
        });
        var posttab = result.map((publicacionestablero) => publicacionestablero.publicaciones);

        if (posttab != null) {
            return posttab;
        } else {
            return 1;
        }

    }

    static async deletetablero(id){
        var result = await prisma.publicacionestablero.deleteMany({
            where: {
                idtablero: parseInt(id),
            }
        });

        console.log(result);
        return result;
    }

    static async deleteposttablero(id){
        var result = await prisma.publicacionestablero.deleteMany({
            where: {
                idpublicacion: parseInt(id),
            }
        });

        console.log(result);
        return result;
    }

    }

module.exports = PostTab;