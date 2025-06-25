import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.bd.js";

export const CommentModel = sequelize.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "C_id"
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "C_content",
        validate: {
            notEmpty: true,
            len: [10, 5000]
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "C_postId",
        references: {
            model: "posts",
            key: "P_id"
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "C_userId",
        references: {
            model: "users",
            key: "id"
        }
    }
}, {
    timestamps: true,
    createdAt: 'C_createdAt',
    updatedAt: 'C_updatedAt'
});