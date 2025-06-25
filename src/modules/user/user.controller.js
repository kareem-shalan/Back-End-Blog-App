import { Router } from "express";
import * as userService from "./user.service.js"
const router = Router()

// User CRUD routes
router.get("/users", userService.getAllUsers)          
router.get("/users/:userId", userService.getUserById)  
router.patch("/users/:userId", userService.updateUser)   
router.delete("/users/:userId", userService.deleteUser) 

// User statistics
router.get("/users/:userId/stats", userService.getUserStats) 


router.get("/user", userService.user)

export default router