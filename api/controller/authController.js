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
            
            const database = await db;
            const users = await user(database.sequelize).findAll();
            return res.json(users)
        }catch (e){
            return errMsg(res, e)
        }
    }


    static async getUserById(req, res){
        try {
            const {id} = req.params
            const database = await db;
            const theUser = await user(database.sequelize).findOne({
                where: {
                    id
                }
            });


            return res.json(theUser);
        }catch(e) {
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
            const { username, email, password, firstName, lastName } = req.body;
            const theUser = await user(database.sequelize).createUser(username, email, password, firstName, lastName)
            return res.json(theUser)

        }catch (e){
            return errMsg(res, e)
        }
    }


    static async updateUser(req, res) {
        try {

            const { firstName, lastName, description, profile_img } = req.body;
            const updatedFields = {};
            
            if (firstName) updatedFields.firstName = firstName;
            if (lastName) updatedFields.lastName = lastName;
            if (description) updatedFields.description = description;
            if (profile_img) updatedFields.profile_img = profile_img;
            
            if (Object.keys(updatedFields).length > 0) {
                const sequelize = (await db).sequelize;
                const client = await user(sequelize).findOne({where: {id: req.user.id}})
                await client.update(updatedFields);
                await client.save();  
            }
    
            return res.status(200).json({ message: 'User updated successfully' });
        } catch (e) {
            return errMsg(res, e);
        }
    }




    static async login(req, res){
        try {
            const {email, password} = req.body;
            const database = await db;
            const theUser = await user(database.sequelize).findOne({
                "where": {
                    "email": email,
                },
                "raw": true
            },)
            
            
            if (theUser){
                if (!bcrypt.compareSync(password, theUser.password)){
                    console.error("wrong password")
                    throw new Error("Wrong Password !")
                }
                console.log(process.env.ACCESS_TOKEN_SECRET)
                const accessToken = AuthController.generateAccessToken(theUser)
                return res.json({
                    "message": "Logged in successfully",
                    "token": accessToken,
                })
            }
            
            return errMsg(res, "Email incorrect !",400)



        }catch(e) {
            console.error(e)
            return errMsg(res, e)
        }
    }

    static generateAccessToken(theUser){
        return jwt.sign({userid: theUser.id}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        })
    }


    static getUser(req, res){
        return res.json(req.user)
    }
    
}