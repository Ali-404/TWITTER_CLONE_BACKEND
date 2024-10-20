import { Router } from "express";
import authenticateToken from '../middlewares/authenticateToken.js'
import CommentsController from "../controller/CommentsController.js";

const CommentsRouter = Router()

CommentsRouter.get("/", authenticateToken,CommentsController.index)
CommentsRouter.get("/:post_id", authenticateToken,CommentsController.getCommentsOfPost)
CommentsRouter.post("/comment/add", authenticateToken,CommentsController.addComment)
CommentsRouter.delete("/comment/delete/:id", authenticateToken,CommentsController.deleteComment)

export default CommentsRouter;