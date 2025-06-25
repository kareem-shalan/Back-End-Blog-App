// Import models
import { UserModel } from "./User.model.js";
import { BlogModel } from "./Blog.model.js";
import { PostModel } from "./Post.model.js";
import { CommentModel } from "./Comment.model.js";
// Define associations
UserModel.hasMany(BlogModel, { foreignKey: 'userId', as: 'blogs' });
BlogModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'author' });

UserModel.hasMany(PostModel, { foreignKey: 'userId', as: 'posts' });
PostModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'author' });

PostModel.hasMany(CommentModel, { foreignKey: 'postId', as: 'comments' });
CommentModel.belongsTo(PostModel, { foreignKey: 'postId', as: 'post' });

// Export models
export { UserModel, BlogModel, PostModel, CommentModel };