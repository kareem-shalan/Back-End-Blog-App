import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.bd.js";

export const PostModel = sequelize.define("post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "P_id"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "P_title",
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "P_content",
        validate: {
            notEmpty: true,
            len: [10, 5000]
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "P_userId",
        references: {
            model: "users",
            key: "id"
        }
    }
}, {
    timestamps: true,
    createdAt: 'P_createdAt',
    updatedAt: 'P_updatedAt'
});