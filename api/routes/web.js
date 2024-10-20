// BY ALi
// MVC STR BY ALi

import {Router} from "express";
import WebController from '../controller/webController.js'


// Routes
import AuthRouter from './auth.js'
import PostsRouter from "./posts.js";
import VuesRouter from "./vues.js";
import LikesRouter from "./likes.js";
import CommentsRouter from "./comments.js";

const Routes = [
    {
        path: "/auth",
        router: AuthRouter
    },
    {
        path: "/posts",
        router: PostsRouter
    },
    {
        path: "/vues",
        router: VuesRouter
    },
    {
        path: "/likes",
        router: LikesRouter
    },
    {
        path: "/comments",
        router: CommentsRouter
    }
]

const web =  Router();


// MAIN ROUTER
// JSON MESSAGE TO WELCOME ENTRANCE
//CAN CHANGED BY A FULL LANDING PAGE FOR THE API
// # OR A SIMPLE WIKI FOR THE API
web.get("/", WebController.get)



// GENERATE ROUTES
Routes.forEach(route => {
    web.use(route.path, route.router)
})


export default web;

