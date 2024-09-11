import {Router} from "express";
import WebController from '../controller/webController.js'
import AuthRouter from './auth.js'


const web =  Router();

web.get("/", WebController.get)

// authentication routers
web.use("/auth", AuthRouter)


export default web;

