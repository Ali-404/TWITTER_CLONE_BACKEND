import { Router } from "express";
import AuthController from "../controller/authController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const AuthRouter = Router();


// DOC route
AuthRouter.get("/", AuthController.index)

AuthRouter.get("/users",authenticateToken,AuthController.getUsers)
AuthRouter.get("/users/:id",authenticateToken,AuthController.getUserById)
AuthRouter.get("/user",authenticateToken,AuthController.getUser)


// login
AuthRouter.post("/users/login", AuthController.login)

// creation
AuthRouter.post("/users/create",AuthController.validateUserCreation(), AuthController.createUser)



// UPDATE
AuthRouter.patch("/users/updateUser",authenticateToken, AuthController.updateUser)

export default AuthRouter;
