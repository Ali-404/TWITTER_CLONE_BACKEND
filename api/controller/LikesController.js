import db, { errMsg } from '../models/index.js'
import like from '../models/like.js'

export default class LikesController{
    
    static async index(request, response){

        
        const sequelize = (await db).sequelize;
        const likes = await like(sequelize).findAll()
        
        return response.json({
            likes
        })
    }


    static async getLikesOfPost(req, res){
        try {
            const {post_id} = req.params
            const sequelize = (await db).sequelize;
            const likes = await like(sequelize).findAll({where: {posterId: post_id}})
    
            return res.json(likes)

        }catch(e) {
            return errMsg(res, e)
        }

    }

    static async addLike(req, res){
        try {
            const {post_id} = req.params
            const sequelize = (await db).sequelize;
            // check if like already exists then remove it
            const alreadyLike = await like(sequelize).findOne({
                where: {posterId: post_id,
                likerId: req.user.id,}
            }) 
            if (alreadyLike){
                alreadyLike.destroy()
                return res.json({
                    message: "disliked",
                    like: false
                }) 
            }

            const newLike = await like(sequelize).create({
                posterId: post_id,
                likerId: req.user.id,
            })
            newLike.save()
            return res.json({
                message: "Liked ",
                like: newLike
            })

        }catch(e) {
            return errMsg(res, e)
        }

    }

    

}