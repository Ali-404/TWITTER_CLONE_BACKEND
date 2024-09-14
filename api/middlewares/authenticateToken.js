import jwt from 'jsonwebtoken'
import user from '../models/user.js'
import db from '../models/index.js'
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userid)=>{
        if (err) {
            return res.status(403).send({ message: 'Failed to authenticate token' })
        }
        const database = await db;
        const theUser = user(database.sequelize).findOne({
            id:userid
        })
        if (theUser){
            req.user = (await theUser)
            next()
            
        }else {
            return res.status(404).send({ message: 'User not found' })
        }
        
    })
    
}


export default authenticateToken;