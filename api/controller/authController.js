import user from "../models/user.js";
import db, { errMsg } from '../models/index.js'
import {check, validationResult} from "express-validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


export default class AuthController{
    static index(req,res){
        return res.json({
            "routes": {
                "[GET] /users": "Return all users in the database"
            }
        })
    }


    static async getUsers(req,res){
        try {
            console.log(req.user)
            const database = await db;
            const users = await user(database.sequelize).findAll();
            return res.json(users)
        }catch (e){
            return errMsg(res, e)
        }
    }


    // register

    static validateUserCreation(){
        return [
            check("username")
                .exists()
                .trim()
                .custom(async username => {
                    const database = await db;
                    const value = await  user(database.sequelize).findOne({ where: { username: username } });
                    if (value) {
                        throw new Error('username is already exists!!!');
                    }
                })
                .withMessage("Invalid Username"),
            check("email")
                .exists()
                .trim()
                .isEmail()
                .normalizeEmail()
                .custom(async email => {
                    const database = await db;
                    const value = await user(database.sequelize).findOne({ where: { email: email } });
                    if (value) {
                        throw new Error('Email is already exists!!!');
                    }
                })
                .withMessage("Invalid Email try another one.")
        ]
    }


    static async createUser(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const database = await db;
            const { username, email, password, first_name, last_name } = req.body;
            const theUser = await user(database.sequelize).createUser(username, email, password, first_name, last_name)
            return res.json(theUser)

        }catch (e){
            return errMsg(res, e)
        }
    }

    



    static async login(req, res){
        try {
            const {username, password} = req.body;
            const database = await db;
            const theUser = await user(database.sequelize).findOne({
                "where": {
                    "username": username,
                },
                "raw": true
            },)
            
            
            if (theUser){
                if (!bcrypt.compareSync(password, theUser.password)){
                    throw new Error("Wrong Password !")
                }
                console.log(process.env.ACCESS_TOKEN_SECRET)
                const accessToken = AuthController.generateAccessToken(theUser)
                return res.json({
                    "message": "Logged in successfully",
                    "token": accessToken,
                })
            }

            return errMsg(res, "Username incorrect !",401)



        }catch(e) {
            return errMsg(res, e)
        }
    }

    static generateAccessToken(theUser){
        return jwt.sign({userid: theUser.id}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        })
    }


    static user(req, res){
        return res.json(req.user)
    }
    
}