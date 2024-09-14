import { Router } from "express";
import PostController from "../controller/postController.js";
import authenticateToken from '../middlewares/authenticateToken.js'

const PostsRouter = Router()

PostsRouter.get("/", PostController.index)
PostsRouter.post("/create",authenticateToken, PostController.createValidation(), PostController.create)



export default PostsRouter;