import { Router } from "express";
import * as authService from "./auth.service.js"
const router = Router()

router.post("/signup", authService.signup)
router.post("/login", authService.login)
router.get("/profile/:userId", authService.getProfile)

export default router