import { Router } from "express";
import * as commentService from "./comments.service.js"
const router = Router()

router.post("/comments", commentService.createComment)
router.get("/comments", commentService.getAllComments)

export default router