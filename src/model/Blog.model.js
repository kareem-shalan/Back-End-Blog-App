import { DataTypes } from "sequelize";
import { sequelize } from "../DB/connection.bd.js";

export const BlogModel = sequelize.define("blog", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "B_title",
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "B_content",
        validate: {
            notEmpty: true,
            len: [10, 5000]
        }
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "B_isPublished"
    },
    publishedAt: {
        type: DataTypes.DATE,
        field: "B_publishedAt",
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "B_userId",
        references: {
            model: 'users',
            key: 'id'
        }
    }
}); 