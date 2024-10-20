import { Router } from "express";
import PostController from "../controller/postController.js";
import authenticateToken from '../middlewares/authenticateToken.js'

const PostsRouter = Router()

PostsRouter.get("/", authenticateToken,PostController.index)
PostsRouter.post("/create",authenticateToken, PostController.ContentValidation(), PostController.create)


PostsRouter.put("/edit/:id",authenticateToken, PostController.ContentValidation(), PostController.edit)

PostsRouter.delete("/delete/:id",authenticateToken, PostController.delete)



export default PostsRouter;