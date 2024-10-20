import { Router } from "express";
import authenticateToken from '../middlewares/authenticateToken.js'
import LikesController from "../controller/LikesController.js";

const LikesRouter = Router()

LikesRouter.get("/", authenticateToken,LikesController.index)
LikesRouter.get("/:post_id", authenticateToken,LikesController.getLikesOfPost)
LikesRouter.post("/like/:post_id", authenticateToken,LikesController.addLike)

export default LikesRouter;