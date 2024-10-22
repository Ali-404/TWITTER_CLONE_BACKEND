import { Router } from "express";
import authenticateToken from '../middlewares/authenticateToken.js'
import FilesController from "../controller/FilesController.js";
import multer from "multer";
import { storage } from "../storage.js";


const FilesRouter = Router()

FilesRouter.get("/:post_id", authenticateToken,FilesController.index)
FilesRouter.post("/add",multer({ storage: storage }).single("file"),authenticateToken,FilesController.addFile)
FilesRouter.get("/file/:id",authenticateToken,FilesController.getFile)
FilesRouter.delete("/delete", authenticateToken,FilesController.deleteFile)

export default FilesRouter;