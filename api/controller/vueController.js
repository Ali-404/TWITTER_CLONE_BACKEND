import { check, validationResult } from 'express-validator';
import db, { errMsg } from '../models/index.js'
import vue from '../models/vue.js'
import user from '../models/user.js';
import post from '../models/post.js';

export default class VueController{

    static async index(request, response){
        const sequelize = (await db).sequelize;
        const vues = await vue(sequelize).findAll()
        return response.json([...vues])
    }

    static async getPostVues(request, response){
        const {postId} = request.params
        const sequelize = (await db).sequelize;
        const  vues = await vue(sequelize).findAll({
            where: {
                postId
            }
        })
        return response.json([...vues])
    }


    static addVueValidation(){
        return [
            check("postId")
            .exists()
            .isInt()
            .custom(async postID => {
                const sequelize = (await db).sequelize;

                const validPost = await post(sequelize).findOne({where: {
                    id: parseInt(postID)
                }})

                if (!validPost){
                    throw new Error("Post Not Exists !")
                }
            }),
            check("viewerId")
            .exists()
            .isInt()
            .custom(async viewerId => {
                const sequelize = (await db).sequelize;

                const validUser = await user(sequelize).findOne({where: {
                    id: parseInt(viewerId)
                }})

                if (!validUser){
                    throw new Error("Viewer Not Exists !")
                }
            }),
        ]
    }

    static async addVue(request, response){
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() })
        }
        try {
            

            const sequelize = (await db).sequelize;
            
            
            const { postId, viewerId } = request.body;
            const alreadyVueExists = await vue(sequelize).findOne({
                where: {
                    "postId": postId,
                    "viewerId": viewerId
                }
            })

            if (alreadyVueExists){
                return errMsg(response, "Already viewed !", 422)
            }
            const newVue = await vue(sequelize).create({ "postId":postId, "viewerId":viewerId });
            newVue.save()

            return response.json(newVue).status(201)

        }catch(e) {
            return errMsg(response, e)
        }

    }

}