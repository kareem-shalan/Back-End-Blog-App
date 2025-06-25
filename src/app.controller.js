import express from 'express'
import authController from "./modules/auth/auth.controller.js"
import blogController from "./modules/blog/blog.controller.js"
import userController from "./modules/user/user.controller.js"
import postController from "./modules/posts/posts.controller.js"
import commentController from "./modules/comments/comment.controller.js"
import { checkDBconnection, syncDBconnection } from './DB/connection.bd.js'

// Import models to ensure they are registered
import './model/index.js'

const bootstrap = () => {
    const app = express()
    const port = 3000
    //DB CONNECTON

    checkDBconnection()
    syncDBconnection()
    
    //app router
    app.use(express.json())
    app.get('/', (req, res) => res.send('welcome app with sequelize!'))
    app.use("/auth", authController)
    app.use("/", blogController)
    app.use("/", userController)
    app.use("/", postController)
    app.use("/", commentController)
    

    app.all("{/*dummy}", (req, res, next) => {
        res.status(404).json({ message: "not found" })
    })
    return app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap
