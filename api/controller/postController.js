import { check, validationResult } from 'express-validator';
import db, { errMsg } from '../models/index.js'
import post from '../models/post.js'

export default class PostController{
    static async index(request, response){
        const sequelize = (await db).sequelize;
        const posts = await post(sequelize).findAll()
        return response.json(posts)
    }


    static createValidation(){
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

}