import jwt from 'jsonwebtoken'
import user from '../models/user.js'
import db from '../models/index.js'
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        return res.status(401).json({
            "error": "Please login first! you are not authorized to make this request."
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data)=>{
        if (err) {
            return res.status(403).send({ message: 'Failed to authenticate token' })
        }
        const database = await db;

        const theUser = await user(database.sequelize).findOne({raw: true,where:{
            id:data.userid,
        }})
        if (theUser){
            req.user = theUser
            next()
            
        }else {
            return res.status(404).send({ message: 'User not found' })
        }
        
    })
    
}


export default authenticateToken;