import express from "express";
import { registerUserController } from "../controller/userController";
const userRouter = express.Router()

userRouter.post('/register', registerUserController)



export { userRouter }