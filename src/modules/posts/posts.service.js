import { PostModel } from './../../model/Post.model.js';

export const createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    const post = await PostModel.create({ title, content, userId });
    res.status(201).json({ message: "Post created successfully", data: post });
  } catch (error) {
    next(error);
  }
}

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.findAll();
    res.status(200).json({ message: "Posts fetched successfully", data: posts });
  } catch (error) {
    next(error);
  }


}

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post fetched successfully", data: post });
  } catch (error) {
    next(error);
  }


}

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await PostModel.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.status(200).json({ message: "Post updated successfully", data: post });
  } catch (error) {
    next(error);
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);

  }
}
