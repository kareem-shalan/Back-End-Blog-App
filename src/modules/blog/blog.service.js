import { BlogModel, UserModel } from "../../model/index.js";

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, published } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        if (published !== undefined) {
            whereClause.isPublished = published === 'true';
        }

        const blogs = await BlogModel.findAndCountAll({
            where: whereClause,
            include: [{
                model: UserModel,
                as: 'author',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Blogs retrieved successfully",
            blogs: blogs.rows,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(blogs.count / limit),
                totalBlogs: blogs.count,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Get single blog by ID
export const getBlogById = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const blog = await BlogModel.findByPk(blogId, {
            include: [{
                model: UserModel,
                as: 'author',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }]
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({
            message: "Blog retrieved successfully",
            blog
        });
    } catch (error) {
        console.error("Error retrieving blog:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Create new blog
export const createBlog = async (req, res, next) => {
    try {
        const { title, content, isPublished = false, userId } = req.body;

        // Validate required fields
        if (!title || !content || !userId) {
            return res.status(400).json({
                message: "Title, content, and userId are required",
                required: ["title", "content", "userId"]
            });
        }

        // Verify user exists
        const user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create blog
        const blogData = {
            title,
            content,
            isPublished,
            userId,
            publishedAt: isPublished ? new Date() : null
        };

        const newBlog = await BlogModel.create(blogData);

        // Fetch the created blog with author info
        const createdBlog = await BlogModel.findByPk(newBlog.id, {
            include: [{
                model: UserModel,
                as: 'author',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }]
        });

        return res.status(201).json({
            message: "Blog created successfully",
            blog: createdBlog
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Update blog
export const updateBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const { title, content, isPublished } = req.body;

        const blog = await BlogModel.findByPk(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Prepare update data
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (isPublished !== undefined) {
            updateData.isPublished = isPublished;
            if (isPublished && !blog.publishedAt) {
                updateData.publishedAt = new Date();
            }
        }

        // Update blog
        await blog.update(updateData);

        // Fetch updated blog with author info
        const updatedBlog = await BlogModel.findByPk(blogId, {
            include: [{
                model: UserModel,
                as: 'author',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }]
        });

        return res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Delete blog
export const deleteBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const blog = await BlogModel.findByPk(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        await blog.destroy();

        return res.status(200).json({
            message: "Blog deleted successfully",
            deletedBlogId: blogId
        });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Get blogs by user
export const getBlogsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Verify user exists
        const user = await UserModel.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'email']
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const blogs = await BlogModel.findAndCountAll({
            where: { userId },
            include: [{
                model: UserModel,
                as: 'author',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "User blogs retrieved successfully",
            user,
            blogs: blogs.rows,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(blogs.count / limit),
                totalBlogs: blogs.count,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error("Error retrieving user blogs:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Legacy blog function (keeping for backward compatibility)
export const blog = (req, res, next) => {
    return res.json({ message: "Done blogs - Use /blogs for full functionality" })
}