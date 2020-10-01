import express from "express";
import { UserController } from "../controler/UserController";

export const userRouter = express.Router();

userRouter.post("/signup", new UserController().signup);

userRouter.post("/login", new UserController().login);

userRouter.post("/add", new UserController().startNewFriendship);

userRouter.delete("/delete", new UserController().deleteFriendship);