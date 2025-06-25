import { CommentModel } from './../../model/Comment.model.js';

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;
        const comment = await CommentModel.create({ content, postId, userId });
        res.status(201).json({ message: "Comment created successfully", data: comment });
    } catch (error) {
        next(error);
    }
}

export const getAllComments = async (req, res, next) => {
    try {

        const comments = await CommentModel.findAll();
        res.status(200).json({ message: "Comments fetched successfully", data: comments });
    } catch (error) {
        next(error);
    }
}