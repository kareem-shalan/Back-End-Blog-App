import { UserModel } from "../../model/index.js"
import bcrypt from 'bcrypt';

// Signup function
export const signup = async (req, res, next) => {
  try {
    const { firstName, middleName, lastName, email, password, gender, DOB } = req.body;
    
    // Validate required fields
    if (!firstName || !middleName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: "All required fields must be provided",
        required: ["firstName", "middleName", "lastName", "email", "password"]
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await UserModel.create({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
      gender: gender || 'male',
      DOB: DOB || null,
      confirmEmail: false
    });

    // Remove password from response
    const userResponse = { ...newUser.toJSON() };
    delete userResponse.password;

    return res.status(201).json({ 
      message: "User created successfully", 
      user: userResponse 
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
}

// Login function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Remove password from response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    return res.status(200).json({ 
      message: "Login successful", 
      user: userResponse 
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
}

// Get user profile
export const getProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ 
      message: "Profile retrieved successfully", 
      user 
    });
  } catch (error) {
    console.error("Error retrieving profile:", error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
}