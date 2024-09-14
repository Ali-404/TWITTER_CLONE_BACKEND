// BY ALi
// MVC STR BY ALi

import {Router} from "express";
import WebController from '../controller/webController.js'
import AuthRouter from './auth.js'
import PostsRouter from "./posts.js";


const web =  Router();


// MAIN ROUTER
// JSON MESSAGE TO WELCOME ENTRANCE
//CAN CHANGED BY A FULL LANDING PAGE FOR THE API
// # OR A SIMPLE WIKI FOR THE API
web.get("/", WebController.get)

// authentication routers
web.use("/auth", AuthRouter)

// posts router
web.use("/posts", PostsRouter)


export default web;

