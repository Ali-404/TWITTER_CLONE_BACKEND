import { Router } from "express";
import VuesController from "../controller/vueController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const VuesRouter = Router()

VuesRouter.get("/", authenticateToken,VuesController.index)
VuesRouter.get("/:postId", authenticateToken,VuesController.getPostVues)

VuesRouter.post("/add",authenticateToken,VuesController.addVueValidation(),VuesController.addVue)


export default VuesRouter;