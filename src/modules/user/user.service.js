import { UserModel, BlogModel } from "../../model/index.js";

// Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, includeBlogs = false } = req.query;
        const offset = (page - 1) * limit;

        const includeOptions = [];
        if (includeBlogs === 'true') {
            includeOptions.push({
                model: BlogModel,
                as: 'blogs',
                attributes: ['id', 'title', 'isPublished', 'createdAt']
            });
        }

        const users = await UserModel.findAndCountAll({
            attributes: { exclude: ['password'] },
            include: includeOptions,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Users retrieved successfully",
            users: users.rows,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(users.count / limit),
                totalUsers: users.count,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Get single user by ID
export const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { includeBlogs = false } = req.query;

        const includeOptions = [];
        if (includeBlogs === 'true') {
            includeOptions.push({
                model: BlogModel,
                as: 'blogs',
                attributes: ['id', 'title', 'content', 'isPublished', 'publishedAt', 'createdAt']
            });
        }

        const user = await UserModel.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: includeOptions
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User retrieved successfully",
            user
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Update user profile
export const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { firstName, middleName, lastName, email, gender, DOB, confirmEmail, password } = req.body;

        const user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email is being updated and if it already exists
        if (email && email !== user.email) {
            const existingUser = await UserModel.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: "Email already exists" });
            }
        }

        // Prepare update data
        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (middleName !== undefined) updateData.middleName = middleName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;
        if (gender !== undefined) updateData.gender = gender;
        if (DOB !== undefined) updateData.DOB = DOB;
        if (confirmEmail !== undefined) updateData.confirmEmail = confirmEmail;
        if (password !== undefined) updateData.password = password;

        // Update user
        await user.update(updateData);

        // Return updated user without password
        const updatedUser = await UserModel.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Delete user
export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user has blogs
        const userBlogs = await BlogModel.findAll({ where: { userId } });
        if (userBlogs.length > 0) {
            return res.status(400).json({ 
                message: "Cannot delete user with existing blogs. Delete blogs first or transfer ownership.",
                blogCount: userBlogs.length
            });
        }

        await user.destroy();

        return res.status(200).json({
            message: "User deleted successfully",
            deletedUserId: userId
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Get user statistics
export const getUserStats = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await UserModel.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get blog statistics
        const totalBlogs = await BlogModel.count({ where: { userId } });
        const publishedBlogs = await BlogModel.count({ 
            where: { userId, isPublished: true } 
        });
        const draftBlogs = totalBlogs - publishedBlogs;

        return res.status(200).json({
            message: "User statistics retrieved successfully",
            user,
            statistics: {
                totalBlogs,
                publishedBlogs,
                draftBlogs,
                memberSince: user.createdAt
            }
        });
    } catch (error) {
        console.error("Error retrieving user statistics:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Legacy user function (keeping for backward compatibility)
export const user = (req, res, next) => {
    return res.json({ message: "Done users - Use /users for full functionality" })
}

// 1. Create a new user (using build and save)
export const signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if email already exists
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ 
                message: "Email already exists",
                error: "Email is already registered"
            });
        }

        // Build user instance
        const user = UserModel.build({
            name,
            email,
            password,
            role: role || 'user'
        });

        // Save user
        await user.save();

        // Return user without password
        const userResponse = { ...user.toJSON() };
        delete userResponse.password;

        return res.status(201).json({
            message: "User created successfully",
            user: userResponse
        });
    } catch (error) {
        console.error("Error during signup:", error);
        
        // Handle validation errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors.map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// 3. Find user by email address
export const findUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ 
                message: "Email parameter is required" 
            });
        }

        const user = await UserModel.findOne({ 
            where: { email },
            attributes: { exclude: ['password' ,""]  }

        });

        if (!user) {
            return res.status(404).json({ 
                message: "User not found with this email" 
            });
        }

        return res.status(200).json({
            message: "User found successfully",
            user
        });
    } catch (error) {
        console.error("Error finding user by email:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};