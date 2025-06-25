import { Router } from "express";
import * as postsService from "./posts.service.js"
const router = Router()

router.post("/posts/create", postsService.createPost)
router.get("/posts/all", postsService.getAllPosts)
router.get("/posts/:id", postsService.getPostById)
router.patch("/posts/update/:id", postsService.updatePost)
router.delete("/posts/:id", postsService.deletePost)

export default router