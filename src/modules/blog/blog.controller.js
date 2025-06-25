import { Router } from "express";
import * as blogService from "./blog.service.js"
const router = Router()

// Blog CRUD routes
router.get("/blogs", blogService.getAllBlogs)          
router.get("/blogs/:blogId", blogService.getBlogById)   
router.post("/blogs", blogService.createBlog)           
router.patch("/blogs/:blogId", blogService.updateBlog)    
router.delete("/blogs/:blogId", blogService.deleteBlog) 

// User-specific blog routes
router.get("/users/:userId/blogs", blogService.getBlogsByUser) 


router.get("/blog", blogService.blog)

export default router