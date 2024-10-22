import { check, validationResult } from 'express-validator';
import db, { errMsg } from '../models/index.js'
import post from '../models/post.js'
import vue from '../models/vue.js'
import like from '../models/like.js'
import comment from '../models/comment.js'
import file from '../models/file.js';
import FilesController from './FilesController.js';


export default class PostController{
    static async index(request, response){
        const {page = 1, limit = 5 } = request.query
        
        
        const startIndex = (page - 1) * limit
        const endIndex = (page  * limit )
        
        const sequelize = (await db).sequelize;
        const posts = (await post(sequelize).findAll()).reverse()
        
        const nextData = posts.slice(endIndex).length > 0 
        return response.json({
            posts: posts.slice(startIndex, endIndex),
            page,
            limit,
            nextDataExists: nextData
        })
    }


    
    static ContentValidation(){
        return [
            check("content")
            .exists()
            .isString()
            .withMessage("Invalid Content !")
        ]
        
    }


    static async create(request, response){
        
        // after validation
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }


        if (!request.user){
            return response.json({
                "error": "Please login"
            }).status(401)
        }
        
        try {
            const { content } = request.body;
            const sequelize = (await db).sequelize;

            const createdPost = await post(sequelize).create({
                "content": content,
                "posterId": request.user.id
            })

            return response.json({
                "message": `New Post Created Successfuly by  @${request.user.username}`,
                "post": createdPost
            })

        }catch(e) {
            return errMsg(response, e)
        }
    }


    
    static async edit(request, response){
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() });
            }
            const {id} = request.params
            const { content } = request.body
            const userid = request.user.id
            const sequelize = (await db).sequelize;
            const thePost = await post(sequelize).findOne({where: {id: id, posterId: userid}})
    
            if (!thePost){
                return response.json({
                    "error": "Invalid or unaccesable Post"
                }).status(409) 
                // 409 = cant edit 
            }

            // edit the post

            thePost.content = content
            thePost.save()

            return response.json({
                "message": `Post #${thePost.id} edited successfully by @${request.user.username}`
            }).status(200)

        }catch(e) {
            return errMsg(response, e)
        }
        
        
    }

        static async delete(request, response){
            try {

                const {id} = request.params
                const userid = request.user.id
                const sequelize = (await db).sequelize;
                const thePost = await post(sequelize).findOne({where: {id: id, posterId: userid}})
                
                if (!thePost){
                    return response.json({
                        "error": "Invalid or unaccesable Post"
                    }).status(409) 
                    // 409 = cant edit 
                }
                // remove vues

                const files = await file(sequelize).findAll({where: {postId: id}})
                if (files && files.length > 0){
                    files.forEach(async (f) => {
                        
                        await FilesController.deleteFileFunc(f.id, sequelize)
                    })
                }
                
                const likes = await like(sequelize).findAll({where: {posterId: id}});
                if (likes && likes.length > 0){
                    likes.forEach(l => l.destroy())
                }

                const vues = await vue(sequelize).findAll({where: {postId: id}});
                if (vues && vues.length > 0){
                    vues.forEach(v => v.destroy())
                }

                // remove comments
                const comments = await comment(sequelize).findAll({where: {postId: id}});
                if (comments && comments.length > 0){
                    comments.forEach(c => c.destroy())
                }
            

                thePost.destroy()
                return response.json({
                    "message":`Post #${thePost.id} deleted successfully.`
                })
                
                

            }catch(e){
                return errMsg(response, e)
            }
            
        }

}