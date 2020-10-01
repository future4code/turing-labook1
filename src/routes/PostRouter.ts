import express from "express";
import { PostController } from "../controler/PostController";

export const postRouter = express.Router();

const postController = new PostController()

postRouter.post("/createpost", postController.createPost)

postRouter.get("/feed", postController.feedType)

postRouter.get("/allPosts", postController.allPosts)

postRouter.post("/unlike", postController.unlike)

postRouter.post("/like", postController.likePost)