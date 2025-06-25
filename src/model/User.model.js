import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.bd.js";

export const UserModel = sequelize.define("user", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "U_firstName"
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "U_middleName",
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "U_lastName"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "U_email"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "U_password"
    },
    gender: {
        type: DataTypes.ENUM("male", "female"),
        defaultValue: "male",
        field: "U_gender",
        allowNull: true
    },
    DOB: {
        type: DataTypes.DATE,
        field: "U_DOB",
        allowNull: true
    },
    confirmEmail: {
        type: DataTypes.BOOLEAN,
        field: "U_confirmEmail",
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

// Custom validation method for password length
UserModel.prototype.checkPasswordLength = function(value) {
    if (value.length <= 6) {
        throw new Error('Password must be greater than 6 characters');
    }
};

// Before create hook to check name length
UserModel.beforeCreate((user, options) => {
    if (user.name.length <= 2) {
        throw new Error('Name must be greater than 2 characters');
    }
});