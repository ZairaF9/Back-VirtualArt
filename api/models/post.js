const res = require("express/lib/response");
const { use } = require("../routes/userRoutes");
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient(); 

class Post{

    constructor(pid, ptitulo, pdescripcion, pcategoria, pusuario){
       this.idpublicaciones = pid;
       this.titulo = ptitulo;
       this.descripcion = pdescripcion;
       this.idcategoria = pcategoria;
       this.idusuario = pusuario;
    }

    //ACTIONS
    static async findAllCategories() {
        var categoriesArray = await prisma.categorias.findMany();
        var categories = new Post(0,"","",0, 0);
        categories=categoriesArray;

        console.log(categories);
        if(categories != null)
            return categories;
        else
            return 1;
    }

    static async findCategoryById(id) {
        var result = await prisma.categorias.findFirst({
            where: {
                idcategorias:parseInt(id)
            }
        });
        var posts = result;
        //console.log(categories);
        if(posts != null)
            return posts;
        else
            return 1;
    }

    static async findAll() {
        var result = await  prisma.publicaciones.findMany({
            orderBy: {
                idpublicaciones: 'desc',
            },
        });
        var posts = result;
        //console.log(categories);
        if(posts != null)
            return posts;
        else
            return 1;
    }
    
    static async findById(id) {
        var post = await prisma.publicaciones.findFirst({
            where: {
                idpublicaciones: parseInt(id)
            },
        });
        var postLoaded = new Post(0,"","","", "");
        postLoaded=post;

        console.log(postLoaded);
        if(postLoaded != null)
            return postLoaded;
        else
            return 1;
    }
    
    static async getLast(){
        //Busco el id del post más reciente
        var result = await  prisma.publicaciones.findMany({
            select: {
                idpublicaciones: true
            },
            orderBy: {
                idpublicaciones: 'desc',
            },
            take: 1,
        });

        const id = result;
        console.log(id);
        return id;  
    }

    static async getUserPosts(id){
        //Busco el id del post más reciente
        var result = await  prisma.publicaciones.findMany({
            where:{
                idusuario: parseInt(id)
            }
        });

        console.log(result);
        return result;  
    }

    static async getCategoryPosts(id){
        //Busco el id del post más reciente
        var result = await  prisma.publicaciones.findMany({
            where:{
                idcategoria: parseInt(id)
            }
        });

        console.log(result);
        return result;  
    }

    static async postCategory(data){
        const result = await prisma.categorias.create({
             data:{
                nombre: data.name
             }
        });

        return result;
    }

    static async create(data) {
        var returnPost = new Post(0, data.title, data.description, data.category, data.user);

        const result =  await  prisma.publicaciones.create({
            data: {
                titulo: data.title,
                descripcion: data.description,
                idcategoria: parseInt(data.category),
                idusuario: parseInt(data.user)
            }
        });
        
        returnPost=result;
        return returnPost;
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

    static async verifyIfPostIsSaved(data){
        const result = await prisma.publicacionesguardadas.findFirst({
            where:{
                idusuario: parseInt(data.user),
                idpublicacion: parseInt(data.post)
            }
        });
        return result;
    }

    static async savePost(data){
        const result =  await  prisma.publicacionesguardadas.create({
            data: {
                idusuario: parseInt(data.user),
                idpublicacion: parseInt(data.post)
            }
        });
        
        return result;
    }

    static async getSavedPosts(id){
        const result =  await  prisma.publicacionesguardadas.findMany({
            where: {
                idusuario: parseInt(id),
            }
        });
        
        return result;
    }

    static async getComments(id){
        var comments = await prisma.comentarios.findMany({
            where: {
                idpublicacion: parseInt(id)
            },
        });
        var commentsReturn = comments;

        console.log(commentsReturn);
        if(commentsReturn != null)
            return commentsReturn;
        else
            return 1;
    }

    static async comment(data){
        const result =  await  prisma.comentarios.create({
            data: {
                descripcion: data.description,
                fecha: data.date,
                idusuario: parseInt(data.user),
                idpublicacion: parseInt(data.post)
            }
        });
        
        return result;
    }

    static async makeASearch(string){
        var result = await  prisma.publicaciones.findMany({
            where:{
                OR:[
                    {
                        titulo:{
                            contains: string
                        }
                    },
                    {
                        descripcion:{
                            contains: string
                        }
                    }
                ]
            }
        });

        return result
    }
    
    static async deletePost(id) {
        const result =  await prisma.publicaciones.delete({
            where:{
                idpublicaciones: parseInt(id)
            },
        });

        console.log(result);
        return result;
    }

    static async deleteCommentPost(id) {
        const result =  await prisma.comentarios.deleteMany({
            where:{
                idpublicacion: parseInt(id)
            },
        });

        console.log(result);
        return result;
    }

    static async deleteSavedPost(id) {
        const result =  await prisma.publicacionesguardadas.deleteMany({
            where:{
                idpublicacion: parseInt(id)
            },
        });

        console.log(result);
        return result;
    }

    static async updatePost(id,data){
        var returnPost = new Post(0, data.title, data.description, data.category, data.user);

        const result =  await  prisma.publicaciones.update({
            where:{
                idpublicaciones: parseInt(id),
            },
            data: {
                titulo: data.title,
                descripcion: data.description,
                idcategoria: parseInt(data.category),
                idusuario: parseInt(data.user)
            }
        });
        
        returnPost=result;
        return returnPost;
    }
}

module.exports = Post;